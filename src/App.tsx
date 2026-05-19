import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Compass, PanelRightOpen } from 'lucide-react';
import { InfoPanel } from '@/components/InfoPanel';
import { PlaybackControls } from '@/components/PlaybackControls';
import { SearchBar } from '@/components/SearchBar';
import { WorldMap } from '@/components/WorldMap';
import { fetchCartography, fetchSharedCartography } from '@/lib/api';
import { buildJourneyFrames, firstFrameForIngredient, type PlaybackMode } from '@/lib/journeyFrames';
import type { DishCartography } from '@/lib/types';

const loadingMessages = [
  'Opening the culinary atlas...',
  'Reading old route notes...',
  'Separating kitchen myth from history...',
  'Drawing the path to the plate...'
];

export default function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<DishCartography | null>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('lineage');
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [shareNotice, setShareNotice] = useState('');

  const journeyFrames = useMemo(() => buildJourneyFrames(data, playbackMode), [data, playbackMode]);
  const activeFrame = journeyFrames[activeFrameIndex] || journeyFrames[0] || null;
  const activeIngredientIndex = activeFrame?.ingredientIndex ?? 0;
  const activeLineageIndex = activeFrame?.lineageIndex ?? 0;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('map');
    if (!sharedId) return;
    setIsLoading(true);
    fetchSharedCartography(sharedId)
      .then((shared) => {
        setData(shared);
        setQuery(shared.dishName);
        setActiveFrameIndex(0);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const interval = window.setInterval(() => {
      setLoadingIndex((index) => (index + 1) % loadingMessages.length);
    }, 1200);
    return () => window.clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isPlaying || !data) return;
    const timeout = window.setTimeout(() => {
      setActiveFrameIndex((index) => {
        if (index >= journeyFrames.length - 1) {
          setIsPlaying(false);
          return index;
        }
        return index + 1;
      });
    }, 1450);
    return () => window.clearTimeout(timeout);
  }, [isPlaying, activeFrameIndex, data, journeyFrames.length]);

  useEffect(() => {
    setIsPlaying(false);
    setActiveFrameIndex(0);
  }, [playbackMode]);

  const runSearch = useCallback(async (dish: string) => {
    setQuery(dish);
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    setShareNotice('');
    try {
      const result = await fetchCartography(dish);
      setData(result);
      setActiveFrameIndex(0);
      setIsPanelOpen(true);
      if (result.id) {
        const url = new URL(window.location.href);
        url.searchParams.set('map', result.id);
        window.history.replaceState({}, '', url);
      }
    } catch (err: any) {
      setError(err.message || 'Flavor cartography failed. Try another dish.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const shareUrl = useMemo(() => {
    if (!data?.id) return window.location.href;
    const url = new URL(window.location.href);
    url.searchParams.set('map', data.id);
    return url.toString();
  }, [data]);

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareNotice('Share link copied');
    } catch {
      setShareNotice(shareUrl);
    }
    window.setTimeout(() => setShareNotice(''), 2400);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Compass size={25} />
          </div>
          <div>
            <span>Flavor Cartography</span>
            <small>Dish lineages, ingredient routes, and migrations behind the plate</small>
          </div>
        </div>
        <SearchBar value={query} isLoading={isLoading} onValueChange={setQuery} onSearch={runSearch} />
      </header>

      <main className={isPanelOpen && data ? 'workspace panel-open' : 'workspace'}>
        <WorldMap
          data={data}
          playbackMode={playbackMode}
          activeFrame={activeFrame}
          isPanelOpen={isPanelOpen && Boolean(data)}
          onSelectIngredient={(index) => {
            setIsPlaying(false);
            const ingredientFrames = buildJourneyFrames(data, 'ingredients');
            setPlaybackMode('ingredients');
            setActiveFrameIndex(firstFrameForIngredient(ingredientFrames, index));
            setIsPanelOpen(true);
          }}
        />

        {isLoading && (
          <div className="loading-overlay">
          <div className="loading-card">
              <Compass size={34} />
              <strong>{loadingMessages[loadingIndex]}</strong>
              <span>Gemini is assembling a food-history field note.</span>
            </div>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {data && !isLoading && (
          <>
            <div className="mode-switch" aria-label="Playback mode">
              <button
                className={playbackMode === 'lineage' ? 'selected' : ''}
                type="button"
                onClick={() => setPlaybackMode('lineage')}
              >
                Dish Evolution
              </button>
              <button
                className={playbackMode === 'ingredients' ? 'selected' : ''}
                type="button"
                onClick={() => setPlaybackMode('ingredients')}
              >
                Ingredient Routes
              </button>
            </div>
            <PlaybackControls
              isPlaying={isPlaying}
              canStep={journeyFrames.length > 0}
              activeIndex={activeFrameIndex}
              total={journeyFrames.length}
              onToggle={() => setIsPlaying((playing) => !playing)}
              onPrev={() => setActiveFrameIndex((index) => Math.max(0, index - 1))}
              onNext={() => setActiveFrameIndex((index) => Math.min(journeyFrames.length - 1, index + 1))}
              onReset={() => {
                setIsPlaying(false);
                setActiveFrameIndex(0);
              }}
            />
            {!isPanelOpen && (
              <button className="open-panel" onClick={() => setIsPanelOpen(true)} aria-label="Open story panel">
                <PanelRightOpen size={20} />
              </button>
            )}
          </>
        )}

        {shareNotice && <div className="toast">{shareNotice}</div>}

        {!data && !isLoading && (
          <div className="empty-legend">
            <div>
              <p>Atlas key: trace how a dish evolved, then reveal the routes that carried its ingredients.</p>
            </div>
            <div className="legend-row">
              <span><i className="land-dot" />Dish Lineage</span>
              <span><i className="sea-dot" />Ingredient Route</span>
              <span><i className="plate-dot" />Plate</span>
            </div>
          </div>
        )}

        <div className="lat-labels" aria-hidden="true">
          <span>40N</span>
          <span>20N</span>
          <span>00</span>
        </div>
        <div className="lon-labels" aria-hidden="true">
          <span>120W</span>
          <span>000</span>
          <span>120E</span>
        </div>

        {data && isPanelOpen && (
          <InfoPanel
            data={data}
            playbackMode={playbackMode}
            activeIndex={activeIngredientIndex}
            activeLineageIndex={activeLineageIndex}
            activePointIndex={activeFrame?.pointIndex ?? 0}
            onClose={() => setIsPanelOpen(false)}
            onShare={copyShare}
            onSelectIngredient={(index) => {
              setIsPlaying(false);
              const ingredientFrames = buildJourneyFrames(data, 'ingredients');
              setPlaybackMode('ingredients');
              setActiveFrameIndex(firstFrameForIngredient(ingredientFrames, index));
            }}
            onSelectLineage={(index) => {
              setIsPlaying(false);
              setPlaybackMode('lineage');
              setActiveFrameIndex(index);
            }}
          />
        )}
      </main>
    </div>
  );
}
