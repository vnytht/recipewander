import { describe, expect, it } from 'vitest';
import { seededExamples } from '../data/examples';
import { buildJourneyFrames } from './journeyFrames';
import { extractJsonObject, validateDishCartography, ValidationError } from './validation';

describe('validateDishCartography', () => {
  it('accepts seeded cartography examples', () => {
    for (const example of Object.values(seededExamples)) {
      expect(validateDishCartography(example).dishName).toBeTruthy();
    }
  });

  it('rejects partial generated objects', () => {
    expect(() => validateDishCartography({
      dishName: 'Mystery stew',
      ingredients: []
    })).toThrow(ValidationError);
  });

  it('normalizes route and confidence values', () => {
    const example = structuredClone(seededExamples.margarita);
    example.ingredients[0].confidence = 'medium';
    example.ingredients[0].route[0].routeType = 'trade';
    const result = validateDishCartography(example);
    expect(result.ingredients[0].confidence).toBe('medium');
    expect(result.ingredients[0].route[0].routeType).toBe('trade');
  });
});

describe('buildJourneyFrames', () => {
  it('generates lineage frames first for dish evolution mode', () => {
    const frames = buildJourneyFrames(seededExamples['butter chicken'], 'lineage');
    expect(frames[0].kind).toBe('lineage');
    expect(frames[0].label).toBe('Clay-oven chicken tradition');
    expect(frames.every((frame) => frame.mode === 'lineage')).toBe(true);
  });

  it('generates ingredient frames only for ingredient mode', () => {
    const frames = buildJourneyFrames(seededExamples['butter chicken'], 'ingredients');
    expect(frames[0].kind).toBe('origin');
    expect(frames[0].label).toBe('Tomato');
    expect(frames.every((frame) => frame.mode === 'ingredients')).toBe(true);
  });
});

describe('extractJsonObject', () => {
  it('extracts JSON from fenced or prefixed model text', () => {
    const parsed = extractJsonObject('Here is the result:\n{"dishName":"Tea"}');
    expect(parsed).toEqual({ dishName: 'Tea' });
  });
});
