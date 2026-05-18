import type { DishCartography, GeoPoint } from './types';

export type PlaybackMode = 'lineage' | 'ingredients';

export interface JourneyFrame {
  frameIndex: number;
  mode: PlaybackMode;
  ingredientIndex?: number;
  lineageIndex?: number;
  pointIndex: number;
  label: string;
  subtitle: string;
  location: GeoPoint;
  kind: 'lineage' | 'origin' | 'route' | 'plate';
}

export function buildJourneyFrames(data: DishCartography | null, mode: PlaybackMode): JourneyFrame[] {
  if (!data) return [];

  const frames: JourneyFrame[] = [];

  if (mode === 'lineage') {
    data.dishLineage.forEach((step, lineageIndex) => {
      frames.push({
        frameIndex: frames.length,
        mode,
        lineageIndex,
        pointIndex: lineageIndex,
        label: step.stageTitle,
        subtitle: `${step.ancestorName} · ${step.location.name} · ${step.period}`,
        location: step.location,
        kind: 'lineage'
      });
    });
    return frames;
  }

  data.ingredients.forEach((ingredient, ingredientIndex) => {
    frames.push({
      frameIndex: frames.length,
      mode,
      ingredientIndex,
      pointIndex: 0,
      label: ingredient.ingredient,
      subtitle: `${ingredient.origin.name} · ${ingredient.originPeriod}`,
      location: ingredient.origin,
      kind: 'origin'
    });

    ingredient.route.forEach((step, routeIndex) => {
      frames.push({
        frameIndex: frames.length,
        mode,
        ingredientIndex,
        pointIndex: routeIndex + 1,
        label: step.title,
        subtitle: `${step.location.name} · ${step.period}`,
        location: step.location,
        kind: 'route'
      });
    });

    frames.push({
      frameIndex: frames.length,
      mode,
      ingredientIndex,
      pointIndex: ingredient.route.length + 1,
      label: data.plateLocation.name,
      subtitle: ingredient.convergenceRole,
      location: data.plateLocation,
      kind: 'plate'
    });
  });

  return frames;
}

export function firstFrameForIngredient(frames: JourneyFrame[], ingredientIndex: number) {
  return frames.find((frame) => frame.ingredientIndex === ingredientIndex)?.frameIndex ?? 0;
}
