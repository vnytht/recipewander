import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import type { JourneyFrame, PlaybackMode } from '@/lib/journeyFrames';
import type { DishCartography, GeoPoint, IngredientPath, RouteStep } from '@/lib/types';

interface WorldMapProps {
  data: DishCartography | null;
  playbackMode: PlaybackMode;
  activeFrame: JourneyFrame | null;
  isPanelOpen: boolean;
  onSelectIngredient: (index: number) => void;
}

type CountryFeature = GeoJSON.FeatureCollection<GeoJSON.Geometry>;

const colors = ['#b9472f', '#3d7188', '#d29b2f', '#4f7a55', '#8b5f42', '#7a5b88', '#6d7d47', '#b66a3c'];
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function useResize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 1000, height: 650 });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: Math.max(320, entry.contentRect.width),
        height: Math.max(420, entry.contentRect.height)
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

function pathForRoute(projection: d3.GeoProjection, points: GeoPoint[]) {
  const projected = points.map((point) => projection(point.coordinates)).filter(Boolean) as [number, number][];
  if (projected.length < 2) return '';
  return projected.reduce((path, point, index) => {
    if (index === 0) return `M ${point[0]} ${point[1]}`;
    const previous = projected[index - 1];
    const midX = (previous[0] + point[0]) / 2;
    const midY = (previous[1] + point[1]) / 2 - Math.min(80, Math.abs(previous[0] - point[0]) * 0.22);
    return `${path} Q ${midX} ${midY} ${point[0]} ${point[1]}`;
  }, '');
}

function routePoints(ingredient: IngredientPath, plate: GeoPoint) {
  return [ingredient.origin, ...ingredient.route.map((step: RouteStep) => step.location), plate];
}

function lineagePoints(data: DishCartography) {
  return data.dishLineage.map((step) => step.location);
}

function segmentPath(projection: d3.GeoProjection, start: GeoPoint, end: GeoPoint) {
  const pStart = projection(start.coordinates);
  const pEnd = projection(end.coordinates);
  if (!pStart || !pEnd) return '';
  const dist = Math.sqrt((pEnd[0] - pStart[0]) ** 2 + (pEnd[1] - pStart[1]) ** 2);
  const midX = (pStart[0] + pEnd[0]) / 2;
  const midY = (pStart[1] + pEnd[1]) / 2 - Math.min(100, dist * 0.28);
  return `M ${pStart[0]} ${pStart[1]} Q ${midX} ${midY} ${pEnd[0]} ${pEnd[1]}`;
}

function screenDistance(projection: d3.GeoProjection, a?: GeoPoint, b?: GeoPoint) {
  if (!a || !b) return null;
  const pA = projection(a.coordinates);
  const pB = projection(b.coordinates);
  if (!pA || !pB) return null;
  return Math.sqrt((pB[0] - pA[0]) ** 2 + (pB[1] - pA[1]) ** 2);
}

export function WorldMap({ data, playbackMode, activeFrame, isPanelOpen, onSelectIngredient }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomGRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const { width, height } = useResize(containerRef);
  const [countries, setCountries] = useState<CountryFeature | null>(null);
  const [currentZoomScale, setCurrentZoomScale] = useState(1);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((response) => response.json())
      .then((topology) => {
        const feature = topojson.feature(topology, topology.objects.countries) as unknown as CountryFeature;
        setCountries(feature);
      })
      .catch(() => setCountries(null));
  }, []);

  const projection = useMemo(() => (
    d3.geoNaturalEarth1()
      .scale(Math.min(width / 5.8, height / 3.2))
      .translate([width / 2, height / 2.05])
  ), [width, height]);

  const pathGenerator = useMemo(() => d3.geoPath(projection), [projection]);
  const activeIngredient = data && activeFrame?.ingredientIndex !== undefined ? data.ingredients[activeFrame.ingredientIndex] : null;
  const activeLineage = data && activeFrame?.lineageIndex !== undefined ? data.dishLineage[activeFrame.lineageIndex] : null;
  const panelWidth = 440;
  const captionWidth = Math.min(isPanelOpen ? 480 : 580, width - 56);
  const captionY = Math.max(92, height - 178);
  const showPlateMarker = Boolean(
    data &&
    (
      playbackMode === 'ingredients' ||
      (playbackMode === 'lineage' && activeFrame?.lineageIndex === data.dishLineage.length - 1)
    )
  );

  useEffect(() => {
    if (!svgRef.current || !zoomGRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoomG = d3.select(zoomGRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 9])
      .on('zoom', (event) => {
        zoomG.attr('transform', event.transform.toString());
      });

    svg.call(zoom);
    zoomRef.current = zoom;
    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !zoomRef.current) return;
    if (!activeFrame || !data) {
      d3.select(svgRef.current)
        .transition()
        .duration(900)
        .call(zoomRef.current.transform, d3.zoomIdentity);
      return;
    }

    const projected = projection(activeFrame.location.coordinates);
    if (!projected) return;
    let previousLocation: GeoPoint | undefined;
    if (playbackMode === 'lineage' && activeFrame.lineageIndex !== undefined && activeFrame.lineageIndex > 0) {
      previousLocation = data.dishLineage[activeFrame.lineageIndex - 1]?.location;
    }
    if (playbackMode === 'ingredients' && activeFrame.ingredientIndex !== undefined && activeFrame.pointIndex > 0) {
      const ingredient = data.ingredients[activeFrame.ingredientIndex];
      previousLocation = routePoints(ingredient, data.plateLocation)[activeFrame.pointIndex - 1];
    }
    const hopDistance = screenDistance(projection, previousLocation, activeFrame.location);
    const closeHopBoost = hopDistance ? clamp(120 / Math.max(hopDistance, 18), 0, 3.2) : 0;
    const baseScale = activeFrame.kind === 'plate' ? 2.4 : 3.2;
    const scale = clamp(baseScale + closeHopBoost, 2.4, 6.4);
    setCurrentZoomScale(scale);
    const centerX = isPanelOpen ? Math.max(220, (width - panelWidth) / 2) : width / 2;
    const centerY = height / 2;
    const target = d3.zoomIdentity
      .translate(centerX, centerY)
      .scale(scale)
      .translate(-projected[0], -projected[1]);

    d3.select(svgRef.current)
      .transition()
      .duration(1350)
      .ease(d3.easeCubicInOut)
      .call(zoomRef.current.transform, target);
  }, [activeFrame, data, height, isPanelOpen, playbackMode, projection, width]);

  const markerScale = 1 / Math.sqrt(currentZoomScale);
  return (
    <div className="map-stage" ref={containerRef}>
      <svg ref={svgRef} width={width} height={height} role="img" aria-label="Animated world map of ingredient routes">
        <defs>
          <filter id="plateGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="zoom-layer" ref={zoomGRef}>
          <path
            d={pathGenerator(d3.geoGraticule10()) || ''}
            fill="none"
            stroke="rgba(45, 36, 28, 0.12)"
            strokeWidth={0.7}
          />

          {countries?.features.map((country, index) => (
            <path
              key={index}
              d={pathGenerator(country) || ''}
              fill="#d9ddc8"
              stroke="#5e5a44"
              strokeOpacity={0.24}
              strokeWidth={0.42}
            />
          ))}

        {!data && (
          <g className="empty-map-copy">
            <text x={width / 2} y={height / 2 - 18} textAnchor="middle">Choose a dish to begin</text>
            <text x={width / 2} y={height / 2 + 16} textAnchor="middle">Map its ancestry first, then the ingredients that crossed paths.</text>
          </g>
        )}

          {data && playbackMode === 'lineage' && (() => {
            const points = lineagePoints(data);
            const visibleSegments = Math.max(0, activeFrame?.pointIndex ?? 0);
            return (
              <g className="lineage-route">
                {points.slice(0, -1).map((point, index) => {
                  if (index >= visibleSegments) return null;
                  const d = segmentPath(projection, point, points[index + 1]);
                  const isCurrentSegment = index === visibleSegments - 1;
                  return (
                    <path
                      key={`lineage-${index}-${isCurrentSegment ? activeFrame?.frameIndex : 'past'}`}
                      className={isCurrentSegment ? 'route-segment drawing' : 'route-segment'}
                      d={d}
                      fill="none"
                      stroke="#b9472f"
                      strokeWidth={(isCurrentSegment ? 4 : 2.4) * markerScale}
                      strokeOpacity={isCurrentSegment ? 0.96 : 0.42}
                      strokeLinecap="round"
                      pathLength={1}
                    />
                  );
                })}
                {points.map((point, index) => {
                  const pos = projection(point.coordinates);
                  const isVisiblePoint = index <= (activeFrame?.pointIndex ?? 0);
                  const isCurrentPoint = index === activeFrame?.pointIndex;
                  if (!pos || !isVisiblePoint) return null;
                  const step = data.dishLineage[index];
                  return (
                    <g key={`lineage-point-${index}`} transform={`translate(${pos[0]} ${pos[1]}) scale(${markerScale})`} className="lineage-point">
                      {isCurrentPoint ? (
                        <path d="M 0 -6 L 5.6 0 L 0 6 L -5.6 0 Z" fill="#b9472f" stroke="#fff8ea" strokeWidth={1.5} />
                      ) : (
                        <circle r={3.3} fill="#b9472f" stroke="#2d241c" strokeWidth={1} />
                      )}
                      {isCurrentPoint && <text x={8} y={3.5} fill="#2d241c">{step.stageTitle}</text>}
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {data && playbackMode === 'ingredients' && data.ingredients.map((ingredient, index) => {
          const points = routePoints(ingredient, data.plateLocation);
          const isActive = index === activeFrame?.ingredientIndex;
          const isPastIngredient = activeFrame?.ingredientIndex !== undefined ? index < activeFrame.ingredientIndex : false;
          const color = colors[index % colors.length];
          const visibleSegments = isPastIngredient
            ? points.length - 1
            : isActive
              ? Math.max(0, activeFrame?.pointIndex ?? 0)
              : 0;

          return (
            <g
              key={ingredient.id}
              className={isActive ? 'route active' : 'route'}
              onClick={() => onSelectIngredient(index)}
              role="button"
              aria-label={`Focus ${ingredient.ingredient} route`}
            >
              {points.slice(0, -1).map((point, segmentIndex) => {
                if (segmentIndex >= visibleSegments) return null;
                const d = segmentPath(projection, point, points[segmentIndex + 1]);
                const isCurrentSegment = isActive && segmentIndex === visibleSegments - 1;
                return (
                  <path
                    key={`${ingredient.id}-${segmentIndex}-${isCurrentSegment ? activeFrame?.frameIndex : 'past'}`}
                    className={isCurrentSegment ? 'route-segment drawing' : 'route-segment'}
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={(isCurrentSegment ? 3.5 : 2.1) * markerScale}
                    strokeOpacity={isCurrentSegment ? 0.96 : 0.34}
                    strokeLinecap="round"
                    pathLength={1}
                  />
                );
              })}
              {points.map((point, pointIndex) => {
                const pos = projection(point.coordinates);
                const isVisiblePoint = isPastIngredient || (isActive && pointIndex <= (activeFrame?.pointIndex ?? 0));
                const isCurrentPoint = isActive && pointIndex === activeFrame?.pointIndex;
                if (!pos || !isVisiblePoint) return null;
                return (
                  <g key={`${ingredient.id}-point-${pointIndex}`} transform={`translate(${pos[0]} ${pos[1]}) scale(${markerScale})`}>
                    {isCurrentPoint ? (
                      <path d="M 0 -5.8 L 5.4 0 L 0 5.8 L -5.4 0 Z" fill="#2d241c" stroke="#fff8ea" strokeWidth={1.4} />
                    ) : (
                      <circle r={3.2} fill={color} stroke="#2d241c" strokeWidth={1} />
                    )}
                    {isCurrentPoint && <text x={8} y={3.5} fill="#2d241c">{pointIndex === 0 ? ingredient.ingredient : point.name}</text>}
                  </g>
                );
              })}
            </g>
          );
          })}

          {showPlateMarker && data && projection(data.plateLocation.coordinates) && (
          <g transform={`translate(${projection(data.plateLocation.coordinates)![0]} ${projection(data.plateLocation.coordinates)![1]}) scale(${markerScale})`} className="plate-marker">
            <circle r={13} fill="#fff8ea" stroke="#2d241c" strokeWidth={1.2} filter="url(#plateGlow)" />
            <circle r={8} fill="none" stroke="#d29b2f" strokeWidth={1.2} />
            <circle r={2.4} fill="#2d241c" />
            <text y={27} textAnchor="middle">{data.plateLocation.name}</text>
          </g>
          )}
        </g>

        {activeIngredient && (
          <g className="map-caption" transform={`translate(28 ${captionY})`}>
            <rect width={captionWidth} height={64} />
            <text x={18} y={24}>{activeFrame?.label || activeIngredient.ingredient}</text>
            <text x={18} y={45}>{activeFrame?.subtitle || `${activeIngredient.origin.name} → ${data?.plateLocation.name}`}</text>
          </g>
        )}
        {activeLineage && (
          <g className="map-caption" transform={`translate(28 ${captionY})`}>
            <rect width={captionWidth} height={64} />
            <text x={18} y={24}>{activeLineage.stageTitle}</text>
            <text x={18} y={45}>{activeLineage.ancestorName} · {activeLineage.period}</text>
          </g>
        )}
      </svg>
    </div>
  );
}
