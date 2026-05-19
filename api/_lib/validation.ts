import type {
  Confidence,
  DishCartography,
  DishLineageStep,
  GeoPoint,
  IngredientPath,
  NameJourneyStep,
  RouteStep,
  RouteType,
  SourceNote
} from './types';

const ROUTE_TYPES = new Set<RouteType>(['land', 'sea', 'trade', 'migration', 'colonial', 'agricultural']);
const CONFIDENCE = new Set<Confidence>(['high', 'medium', 'low']);

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value.trim() : fallback;

const nonEmptyString = (value: unknown, path: string): string => {
  const result = asString(value);
  if (!result) throw new ValidationError(`${path} must be a non-empty string`);
  return result;
};

const stringArray = (value: unknown, path: string): string[] => {
  if (!Array.isArray(value)) throw new ValidationError(`${path} must be an array`);
  return value.map((item, index) => nonEmptyString(item, `${path}[${index}]`)).slice(0, 10);
};

const geoPoint = (value: unknown, path: string): GeoPoint => {
  if (!isRecord(value)) throw new ValidationError(`${path} must be an object`);
  const coordinates = value.coordinates;
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    throw new ValidationError(`${path}.coordinates must be [longitude, latitude]`);
  }
  const lon = Number(coordinates[0]);
  const lat = Number(coordinates[1]);
  if (!Number.isFinite(lon) || !Number.isFinite(lat) || lon < -180 || lon > 180 || lat < -90 || lat > 90) {
    throw new ValidationError(`${path}.coordinates must be valid longitude and latitude`);
  }
  return {
    name: nonEmptyString(value.name, `${path}.name`),
    countryCode: asString(value.countryCode, 'XX').slice(0, 2).toUpperCase(),
    coordinates: [lon, lat]
  };
};

const routeStep = (value: unknown, path: string, index: number): RouteStep => {
  if (!isRecord(value)) throw new ValidationError(`${path} must be an object`);
  const routeType = asString(value.routeType, 'trade') as RouteType;
  return {
    order: Number.isFinite(Number(value.order)) ? Number(value.order) : index + 1,
    title: nonEmptyString(value.title, `${path}.title`),
    location: geoPoint(value.location, `${path}.location`),
    period: nonEmptyString(value.period, `${path}.period`),
    routeType: ROUTE_TYPES.has(routeType) ? routeType : 'trade',
    notes: nonEmptyString(value.notes, `${path}.notes`)
  };
};

const ingredientPath = (value: unknown, path: string, index: number): IngredientPath => {
  if (!isRecord(value)) throw new ValidationError(`${path} must be an object`);
  const route = Array.isArray(value.route) ? value.route : [];
  if (route.length === 0) throw new ValidationError(`${path}.route must contain at least one step`);
  const confidence = asString(value.confidence, 'medium') as Confidence;
  const ingredient = nonEmptyString(value.ingredient, `${path}.ingredient`);
  return {
    id: asString(value.id, ingredient.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/^-|-$/g, ''),
    ingredient,
    role: nonEmptyString(value.role, `${path}.role`),
    origin: geoPoint(value.origin, `${path}.origin`),
    originPeriod: nonEmptyString(value.originPeriod, `${path}.originPeriod`),
    route: route.slice(0, 8).map((step, stepIndex) => routeStep(step, `${path}.route[${stepIndex}]`, stepIndex)),
    convergenceRole: nonEmptyString(value.convergenceRole, `${path}.convergenceRole`),
    confidence: CONFIDENCE.has(confidence) ? confidence : 'medium',
    sourceNotes: stringArray(value.sourceNotes ?? [], `${path}.sourceNotes`).slice(0, 5)
  };
};

const lineageStep = (value: unknown, path: string, index: number): DishLineageStep => {
  if (!isRecord(value)) throw new ValidationError(`${path} must be an object`);
  const routeType = asString(value.routeType, 'migration') as RouteType;
  const confidence = asString(value.confidence, 'medium') as Confidence;
  return {
    order: Number.isFinite(Number(value.order)) ? Number(value.order) : index + 1,
    ancestorName: nonEmptyString(value.ancestorName, `${path}.ancestorName`),
    stageTitle: nonEmptyString(value.stageTitle, `${path}.stageTitle`),
    location: geoPoint(value.location, `${path}.location`),
    period: nonEmptyString(value.period, `${path}.period`),
    transformation: nonEmptyString(value.transformation, `${path}.transformation`),
    routeType: ROUTE_TYPES.has(routeType) ? routeType : 'migration',
    confidence: CONFIDENCE.has(confidence) ? confidence : 'medium',
    notes: nonEmptyString(value.notes, `${path}.notes`)
  };
};

const nameStep = (value: unknown, path: string, index: number): NameJourneyStep => {
  if (!isRecord(value)) throw new ValidationError(`${path} must be an object`);
  return {
    order: Number.isFinite(Number(value.order)) ? Number(value.order) : index + 1,
    name: nonEmptyString(value.name, `${path}.name`),
    languageOrCulture: nonEmptyString(value.languageOrCulture, `${path}.languageOrCulture`),
    location: geoPoint(value.location, `${path}.location`),
    period: nonEmptyString(value.period, `${path}.period`),
    notes: nonEmptyString(value.notes, `${path}.notes`)
  };
};

const sourceNote = (value: unknown, path: string, index: number): SourceNote => {
  if (!isRecord(value)) throw new ValidationError(`${path} must be an object`);
  return {
    id: asString(value.id, `source-${index + 1}`),
    title: nonEmptyString(value.title, `${path}.title`),
    note: nonEmptyString(value.note, `${path}.note`),
    url: asString(value.url) || undefined
  };
};

export const validateDishCartography = (value: unknown): DishCartography => {
  if (!isRecord(value)) throw new ValidationError('response must be a JSON object');
  const dishLineage = Array.isArray(value.dishLineage) ? value.dishLineage : [];
  if (dishLineage.length < 2) throw new ValidationError('dishLineage must include at least two stages');
  const ingredients = Array.isArray(value.ingredients) ? value.ingredients : [];
  if (ingredients.length < 2) throw new ValidationError('ingredients must include at least two paths');

  return {
    dishName: nonEmptyString(value.dishName, 'dishName'),
    canonicalDishName: nonEmptyString(value.canonicalDishName, 'canonicalDishName'),
    dishType: nonEmptyString(value.dishType, 'dishType'),
    plateLocation: geoPoint(value.plateLocation, 'plateLocation'),
    convergenceThesis: nonEmptyString(value.convergenceThesis, 'convergenceThesis'),
    shareQuote: nonEmptyString(value.shareQuote, 'shareQuote'),
    dishLineage: dishLineage.slice(0, 7).map((step, index) => lineageStep(step, `dishLineage[${index}]`, index)),
    ingredients: ingredients.slice(0, 8).map((ingredient, index) => ingredientPath(ingredient, `ingredients[${index}]`, index)),
    nameJourney: (Array.isArray(value.nameJourney) ? value.nameJourney : [])
      .slice(0, 6)
      .map((step, index) => nameStep(step, `nameJourney[${index}]`, index)),
    globalForces: stringArray(value.globalForces ?? [], 'globalForces').slice(0, 8),
    sources: (Array.isArray(value.sources) ? value.sources : [])
      .slice(0, 8)
      .map((source, index) => sourceNote(source, `sources[${index}]`, index)),
    uncertainties: stringArray(value.uncertainties ?? [], 'uncertainties').slice(0, 8)
  };
};

export const extractJsonObject = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new ValidationError('Gemini response did not contain JSON');
    return JSON.parse(match[0]);
  }
};
