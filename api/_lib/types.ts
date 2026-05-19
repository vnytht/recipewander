export type RouteType = 'land' | 'sea' | 'trade' | 'migration' | 'colonial' | 'agricultural';

export type Confidence = 'high' | 'medium' | 'low';

export interface GeoPoint {
  name: string;
  countryCode: string;
  coordinates: [number, number];
}

export interface RouteStep {
  order: number;
  title: string;
  location: GeoPoint;
  period: string;
  routeType: RouteType;
  notes: string;
}

export interface IngredientPath {
  id: string;
  ingredient: string;
  role: string;
  origin: GeoPoint;
  originPeriod: string;
  route: RouteStep[];
  convergenceRole: string;
  confidence: Confidence;
  sourceNotes: string[];
}

export interface DishLineageStep {
  order: number;
  ancestorName: string;
  stageTitle: string;
  location: GeoPoint;
  period: string;
  transformation: string;
  routeType: RouteType;
  confidence: Confidence;
  notes: string;
}

export interface NameJourneyStep {
  order: number;
  name: string;
  languageOrCulture: string;
  location: GeoPoint;
  period: string;
  notes: string;
}

export interface SourceNote {
  id: string;
  title: string;
  note: string;
  url?: string;
}

export interface DishCartography {
  id?: string;
  dishName: string;
  canonicalDishName: string;
  dishType: string;
  plateLocation: GeoPoint;
  convergenceThesis: string;
  shareQuote: string;
  dishLineage: DishLineageStep[];
  ingredients: IngredientPath[];
  nameJourney: NameJourneyStep[];
  globalForces: string[];
  sources: SourceNote[];
  uncertainties: string[];
  generatedAt?: string;
  cached?: boolean;
}

export interface CartographyResponse {
  data: DishCartography;
}

export interface ApiError {
  error: string;
  code?: string;
  examples?: string[];
}
