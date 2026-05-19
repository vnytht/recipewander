import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { maxDuration: 30 };

const EXAMPLE_DISHES = ['butter chicken', 'ramen', 'tiramisu', 'margarita', 'chocolate'];

const normalizeDish = (dish: string) =>
  dish.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9 &'-]/g, '');

const SEEDED: Record<string, unknown> = {
  'butter chicken': {
    dishName: 'Butter Chicken', canonicalDishName: 'Murgh Makhani', dishType: 'North Indian curry',
    plateLocation: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] },
    convergenceThesis: 'Butter chicken is a Delhi restaurant invention built from older routes: Central Asian tandoor technique, New World tomatoes and chilies, South Asian spice networks, and dairy-rich Punjabi cooking.',
    shareQuote: 'Butter chicken tastes local because five global routes learned to sit in the same Delhi sauce.',
    dishLineage: [
      { order: 1, ancestorName: 'Tandoori chicken', stageTitle: 'Clay-oven chicken tradition', location: { name: 'Punjab', countryCode: 'IN', coordinates: [75.3412, 31.1471] }, period: 'Early 20th century', transformation: 'Marinated chicken cooked in a hot clay tandoor became the protein base later folded into sauce.', routeType: 'migration', confidence: 'medium', notes: 'The tandoor has deeper Central and South Asian roots.' },
      { order: 2, ancestorName: 'Punjabi restaurant cooking', stageTitle: 'Post-partition Delhi adaptation', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: 'Mid-20th century', transformation: 'Punjabi restaurateurs adapted tandoori chicken for an urban Delhi restaurant setting.', routeType: 'migration', confidence: 'medium', notes: "Specific founder stories vary, but Delhi's post-partition restaurant culture is central." },
      { order: 3, ancestorName: 'Makhani gravy', stageTitle: 'Tomato-butter-cream sauce', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: 'Mid-20th century', transformation: 'Chicken was reimagined inside a mild, rich tomato gravy finished with butter and cream.', routeType: 'trade', confidence: 'medium', notes: 'This is the defining transformation from roasted chicken to murgh makhani.' },
      { order: 4, ancestorName: 'Murgh makhani', stageTitle: 'Global butter chicken', location: { name: 'London', countryCode: 'GB', coordinates: [-0.1276, 51.5072] }, period: 'Late 20th century', transformation: 'The Delhi restaurant dish became a global Indian restaurant staple under the English name butter chicken.', routeType: 'migration', confidence: 'medium', notes: 'Diaspora restaurants helped standardize and popularize the dish internationally.' }
    ],
    ingredients: [
      { id: 'tomato', ingredient: 'Tomato', role: 'Acidic body of the sauce', origin: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, originPeriod: 'Pre-Columbian', route: [{ order: 1, title: 'Iberian transfer', location: { name: 'Seville', countryCode: 'ES', coordinates: [-5.9845, 37.3891] }, period: '16th century', routeType: 'colonial', notes: 'Spanish imperial exchange moved tomato seeds from the Americas into Europe.' }, { order: 2, title: 'Indian adoption', location: { name: 'Goa', countryCode: 'IN', coordinates: [73.8567, 15.2993] }, period: '16th-17th century', routeType: 'sea', notes: 'Portuguese trade helped introduce New World crops into coastal India.' }, { order: 3, title: 'Delhi sauce', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: '20th century', routeType: 'trade', notes: 'Tomato puree became the base of makhani gravy.' }], convergenceRole: 'Makes the curry bright, red, and saucy.', confidence: 'high', sourceNotes: ['New World crop history is well established.'] },
      { id: 'chili', ingredient: 'Chili', role: 'Heat and color', origin: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, originPeriod: 'Pre-Columbian', route: [{ order: 1, title: 'Portuguese ocean networks', location: { name: 'Lisbon', countryCode: 'PT', coordinates: [-9.1393, 38.7223] }, period: '16th century', routeType: 'sea', notes: 'Portuguese traders carried American chilies through Indian Ocean routes.' }, { order: 2, title: 'South Asian spice adoption', location: { name: 'Goa', countryCode: 'IN', coordinates: [73.8567, 15.2993] }, period: '16th century', routeType: 'sea', notes: 'Chilies adapted quickly into South Asian cuisines.' }], convergenceRole: 'Adds warmth without overwhelming cream and butter.', confidence: 'high', sourceNotes: ["The chili's American origin and Portuguese-mediated spread are well documented."] },
      { id: 'dairy', ingredient: 'Butter and cream', role: 'Richness', origin: { name: 'Punjab', countryCode: 'IN', coordinates: [75.3412, 31.1471] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Punjabi dairy cooking', location: { name: 'Punjab', countryCode: 'IN', coordinates: [75.3412, 31.1471] }, period: 'Longstanding', routeType: 'agricultural', notes: 'Dairy-rich cooking traditions made butter and cream natural finishing agents.' }], convergenceRole: 'Turns tomato and spice into a velvet sauce.', confidence: 'medium', sourceNotes: ['Cultural origin is broad.'] }
    ],
    nameJourney: [{ order: 1, name: 'Murgh Makhani', languageOrCulture: 'Hindi/Punjabi', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: '20th century', notes: 'The Hindi-Urdu/Punjabi name means buttery chicken, later exported globally as butter chicken.' }],
    globalForces: ['Columbian exchange', 'Mughal and Central Asian foodways', 'Punjabi dairy culture', 'urban restaurant invention'],
    sources: [{ id: 'tomato', title: 'Tomato dispersal', note: 'Tomatoes originated in the Americas and spread globally after Iberian colonial exchange.' }],
    uncertainties: ['The exact first restaurant version is debated, but Delhi and the post-partition restaurant scene are central.']
  },
  'margarita': {
    dishName: 'Margarita', canonicalDishName: 'Margarita', dishType: 'Cocktail',
    plateLocation: { name: 'Northern Mexico', countryCode: 'MX', coordinates: [-117.0382, 32.5149] },
    convergenceThesis: 'The margarita is a borderlands convergence: Indigenous agave, Mediterranean citrus, mineral salt, and European distillation technology meeting in Mexican drinking culture.',
    shareQuote: 'The margarita is what happened when agave, empire, citrus, and salt met at the border.',
    dishLineage: [
      { order: 1, ancestorName: 'Agave drinks', stageTitle: 'Fermented agave tradition', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian', transformation: 'Agave drinks established the plant as a ritual and everyday beverage base.', routeType: 'agricultural', confidence: 'high', notes: 'This is a cultural ancestor rather than the direct cocktail form.' },
      { order: 2, ancestorName: 'Tequila', stageTitle: 'Distilled agave spirit', location: { name: 'Jalisco', countryCode: 'MX', coordinates: [-103.3496, 20.6597] }, period: 'Colonial and early modern period', transformation: 'Distillation turned agave fermentation into the spirit that anchors the margarita.', routeType: 'colonial', confidence: 'medium', notes: 'Distillation influences are complex, but colonial-era agave spirits are the key bridge.' },
      { order: 3, ancestorName: 'Daisy cocktail family', stageTitle: 'Citrus-sweetened sour template', location: { name: 'United States-Mexico borderlands', countryCode: 'MX', coordinates: [-117.0382, 32.5149] }, period: 'Early 20th century', transformation: 'Tequila met citrus and orange liqueur in a sour-style drink family.', routeType: 'trade', confidence: 'low', notes: 'Several origin stories compete.' },
      { order: 4, ancestorName: 'Margarita', stageTitle: 'Borderlands cocktail icon', location: { name: 'Northern Mexico', countryCode: 'MX', coordinates: [-117.0382, 32.5149] }, period: 'Mid-20th century', transformation: 'The tequila sour became standardized as the salt-rimmed margarita.', routeType: 'migration', confidence: 'medium', notes: 'The exact inventor is disputed, but the border tourism context is central.' }
    ],
    ingredients: [
      { id: 'agave', ingredient: 'Agave tequila', role: 'Base spirit', origin: { name: 'Jalisco', countryCode: 'MX', coordinates: [-103.3496, 20.6597] }, originPeriod: 'Pre-Columbian agave use; colonial distillation', route: [{ order: 1, title: 'Agave fermentation', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian', routeType: 'agricultural', notes: 'Maguey and agave drinks were part of Indigenous foodways.' }, { order: 2, title: 'Distillation arrives', location: { name: 'Jalisco', countryCode: 'MX', coordinates: [-103.3496, 20.6597] }, period: '16th-17th century', routeType: 'colonial', notes: 'European distillation practices shaped agave spirits.' }, { order: 3, title: 'Cocktail base', location: { name: 'Northern Mexico', countryCode: 'MX', coordinates: [-117.0382, 32.5149] }, period: '20th century', routeType: 'trade', notes: 'Tequila became the center of the modern margarita.' }], convergenceRole: 'Provides the unmistakable agave backbone.', confidence: 'high', sourceNotes: ['Agave origin is firm.'] },
      { id: 'lime', ingredient: 'Lime', role: 'Acid', origin: { name: 'Southeast Asia', countryCode: 'MY', coordinates: [101.9758, 4.2105] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Indian Ocean citrus route', location: { name: 'Persian Gulf', countryCode: 'IR', coordinates: [51.389, 35.6892] }, period: 'Medieval', routeType: 'sea', notes: 'Citrus moved west through trade and cultivation.' }, { order: 2, title: 'New Spain citrus', location: { name: 'Mexico', countryCode: 'MX', coordinates: [-102.5528, 23.6345] }, period: '16th century', routeType: 'colonial', notes: 'Spanish colonial agriculture brought citrus to the Americas.' }], convergenceRole: 'Cuts tequila with brightness.', confidence: 'medium', sourceNotes: ['This summarizes the broad citrus movement.'] }
    ],
    nameJourney: [{ order: 1, name: 'Margarita', languageOrCulture: 'Spanish', location: { name: 'Mexico', countryCode: 'MX', coordinates: [-102.5528, 23.6345] }, period: '20th century', notes: 'The name is Spanish for daisy, also a cocktail-family term in English drinking culture.' }],
    globalForces: ['Spanish empire', 'distillation technology', 'border tourism', 'citrus trade'],
    sources: [{ id: 'agave', title: 'Agave and tequila', note: 'Agave fermentation predates Europeans; distilled tequila emerged after distillation technology arrived.' }],
    uncertainties: ['Several origin stories compete for the named cocktail.']
  },
  'ramen': {
    dishName: 'Ramen', canonicalDishName: 'Ramen', dishType: 'Noodle soup',
    plateLocation: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] },
    convergenceThesis: 'Ramen is a Japanese bowl shaped by Chinese wheat noodles, modern urban labor, regional broth styles, and postwar food systems.',
    shareQuote: 'Ramen is not one route. It is a bowl where Chinese noodles became Japanese city life.',
    dishLineage: [
      { order: 1, ancestorName: 'Chinese wheat noodle soups', stageTitle: 'Noodle soup ancestor', location: { name: 'North China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, period: 'Longstanding', transformation: 'Wheat noodle techniques and soup service created the culinary ancestor.', routeType: 'agricultural', confidence: 'high', notes: "Ramen's exact lineage is debated, but Chinese noodle influence is clear." },
      { order: 2, ancestorName: 'Shina soba', stageTitle: 'Port-city Chinese noodles in Japan', location: { name: 'Yokohama', countryCode: 'JP', coordinates: [139.638, 35.4437] }, period: 'Late 19th to early 20th century', transformation: 'Chinese-style noodle soups entered Japanese port-city restaurant culture.', routeType: 'migration', confidence: 'medium', notes: 'Chinese communities and trade ports were important transmission points.' },
      { order: 3, ancestorName: 'Ramen shops', stageTitle: 'Urban Japanese comfort bowl', location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: '20th century', transformation: 'Japanese shops localized broth, tare, toppings, and regional styles.', routeType: 'trade', confidence: 'high', notes: 'The dish became recognizably Japanese through local shop culture.' },
      { order: 4, ancestorName: 'Instant and global ramen', stageTitle: 'Global ramen culture', location: { name: 'Osaka', countryCode: 'JP', coordinates: [135.5023, 34.6937] }, period: 'Mid-late 20th century', transformation: 'Instant noodles and specialty shops helped ramen become a global category.', routeType: 'trade', confidence: 'high', notes: 'Industrial and restaurant ramen spread through different but linked channels.' }
    ],
    ingredients: [
      { id: 'wheat-noodles', ingredient: 'Wheat noodles', role: 'Main structure', origin: { name: 'North China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, originPeriod: 'Ancient-medieval', route: [{ order: 1, title: 'Chinese noodle craft', location: { name: 'North China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, period: 'Longstanding', routeType: 'agricultural', notes: 'Wheat-based noodle traditions developed in northern China.' }, { order: 2, title: 'Port-city restaurants', location: { name: 'Yokohama', countryCode: 'JP', coordinates: [139.638, 35.4437] }, period: '19th century', routeType: 'migration', notes: 'Chinese communities and port trade introduced noodle soup styles.' }, { order: 3, title: 'Japanese ramen boom', location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: '20th century', routeType: 'trade', notes: 'Urban shops standardized ramen as a Japanese comfort food.' }], convergenceRole: "Carries the bowl's texture and identity.", confidence: 'high', sourceNotes: ['Chinese influence is well established.'] },
      { id: 'soy', ingredient: 'Soy sauce', role: 'Umami seasoning', origin: { name: 'China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Fermentation knowledge', location: { name: 'China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, period: 'Ancient', routeType: 'agricultural', notes: 'Soy fermentation developed across East Asian food systems.' }, { order: 2, title: 'Shoyu ramen', location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: '20th century', routeType: 'trade', notes: "Soy sauce became one of ramen's defining tare bases." }], convergenceRole: 'Turns broth into a recognizable shoyu profile.', confidence: 'high', sourceNotes: ['The shoyu role is clear.'] }
    ],
    nameJourney: [{ order: 1, name: 'Lamian / Ramen', languageOrCulture: 'Chinese/Japanese', location: { name: 'Yokohama', countryCode: 'JP', coordinates: [139.638, 35.4437] }, period: '19th-20th century', notes: 'Chinese noodle terminology and restaurant culture fed into the Japanese word ramen.' }],
    globalForces: ['Chinese migration', 'urbanization', 'postwar wheat supply', 'regional adaptation'],
    sources: [{ id: 'ramen', title: 'Ramen history', note: 'Chinese-style wheat noodles became localized in Japan during the modern period.' }],
    uncertainties: ['Ramen has multiple regional origin claims and evolved gradually rather than from one invention.']
  },
  'tiramisu': {
    dishName: 'Tiramisu', canonicalDishName: 'Tiramisu', dishType: 'Dessert',
    plateLocation: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] },
    convergenceThesis: "Tiramisu is a modern Italian dessert made from older global luxuries: coffee from African-Arabian trade, cacao from the Americas, sugar from plantation economies, and Italian dairy craft.",
    shareQuote: "Tiramisu is Italy's soft landing pad for coffee, cacao, sugar, and empire.",
    dishLineage: [
      { order: 1, ancestorName: 'Layered spoon desserts', stageTitle: 'Italian cream dessert grammar', location: { name: 'Northern Italy', countryCode: 'IT', coordinates: [10.328, 44.8015] }, period: '19th-20th century', transformation: 'Custard, cream, biscuits, and soaked layers formed the dessert family tiramisu would join.', routeType: 'trade', confidence: 'medium', notes: 'This is a dessert-family ancestor, not a single direct parent.' },
      { order: 2, ancestorName: 'Coffee-soaked sweets', stageTitle: 'Espresso enters dessert', location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '20th century', transformation: 'Coffee became the bitter soak balancing dairy and sugar.', routeType: 'trade', confidence: 'medium', notes: 'Coffee culture is essential to the modern identity.' },
      { order: 3, ancestorName: 'Tirami su', stageTitle: 'Modern tiramisu', location: { name: 'Treviso', countryCode: 'IT', coordinates: [12.243, 45.6669] }, period: 'Late 20th century', transformation: 'Mascarpone, ladyfingers, espresso, sugar, and cocoa consolidated into the modern dessert.', routeType: 'trade', confidence: 'medium', notes: 'Northern Italian origin claims vary, but Veneto is central to the usual story.' }
    ],
    ingredients: [
      { id: 'coffee', ingredient: 'Coffee', role: 'Bitter soak', origin: { name: 'Ethiopian Highlands', countryCode: 'ET', coordinates: [38.7578, 9.145] }, originPeriod: 'Medieval use; early modern trade', route: [{ order: 1, title: 'Red Sea coffee trade', location: { name: 'Mokha', countryCode: 'YE', coordinates: [43.25, 13.32] }, period: '15th century', routeType: 'sea', notes: 'Yemeni ports helped carry coffee into wider commerce.' }, { order: 2, title: 'Venetian coffee culture', location: { name: 'Venice', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '17th century', routeType: 'sea', notes: "Venice was among Europe's early coffee gateways." }, { order: 3, title: 'Dessert soak', location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '20th century', routeType: 'trade', notes: 'Espresso became the bitter counterweight to mascarpone and sugar.' }], convergenceRole: 'Gives tiramisu its lift and bite.', confidence: 'high', sourceNotes: ['Coffee trade through Yemen and Venice is broadly documented.'] },
      { id: 'cacao', ingredient: 'Cacao', role: 'Dusting and aroma', origin: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-90.2308, 15.7835] }, originPeriod: 'Pre-Columbian', route: [{ order: 1, title: 'Spanish colonial transfer', location: { name: 'Madrid', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: '16th century', routeType: 'colonial', notes: 'Cacao entered Europe through Spanish imperial networks.' }, { order: 2, title: 'Tiramisu finish', location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '20th century', routeType: 'trade', notes: 'Cocoa powder became the final bitter aromatic layer.' }], convergenceRole: 'Adds the dry, dark top note.', confidence: 'high', sourceNotes: ["Cacao's American origin and European spread are well documented."] }
    ],
    nameJourney: [{ order: 1, name: 'Tirami su', languageOrCulture: 'Italian', location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '20th century', notes: 'The name roughly means pick me up, pointing to the coffee and sugar lift.' }],
    globalForces: ['coffee trade', 'Columbian exchange', 'plantation sugar', 'Italian regional cuisine'],
    sources: [{ id: 'tiramisu', title: 'Modern tiramisu', note: 'The dessert is generally associated with northeastern Italy in the late 20th century.' }],
    uncertainties: ['Several northern Italian origin claims exist for the modern recipe.']
  },
  'chocolate': {
    dishName: 'Chocolate', canonicalDishName: 'Chocolate', dishType: 'Food and drink family',
    plateLocation: { name: 'Mexico City', countryCode: 'MX', coordinates: [-99.1332, 19.4326] },
    convergenceThesis: 'Chocolate began as Indigenous cacao culture before sugar, milk, machinery, and colonial trade transformed it into a global sweet.',
    shareQuote: 'Chocolate is an American seed that became a global luxury through sugar, empire, and machines.',
    dishLineage: [
      { order: 1, ancestorName: 'Mesoamerican cacao drink', stageTitle: 'Cacao as drink and ritual food', location: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-90.2308, 15.7835] }, period: 'Pre-Columbian', transformation: 'Cacao was prepared as a valued bitter drink and cultural commodity.', routeType: 'agricultural', confidence: 'high', notes: 'This is the deep ancestor of chocolate as a food category.' },
      { order: 2, ancestorName: 'Spanish chocolate', stageTitle: 'Sweetened European adaptation', location: { name: 'Madrid', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: '16th-17th century', transformation: 'Cacao was sweetened and adapted to European elite tastes.', routeType: 'colonial', confidence: 'high', notes: "Sugar transformed cacao's social role and flavor profile." },
      { order: 3, ancestorName: 'Eating chocolate', stageTitle: 'Industrial solid chocolate', location: { name: 'London', countryCode: 'GB', coordinates: [-0.1276, 51.5072] }, period: '19th century', transformation: 'Industrial processing turned drinking chocolate into bars and confections.', routeType: 'trade', confidence: 'high', notes: 'Machinery and sugar supply changed chocolate from drink to mass-market sweet.' }
    ],
    ingredients: [
      { id: 'cacao', ingredient: 'Cacao', role: 'Core seed', origin: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-90.2308, 15.7835] }, originPeriod: 'Pre-Columbian', route: [{ order: 1, title: 'Mesoamerican drink culture', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian', routeType: 'agricultural', notes: 'Cacao was prepared as a valued drink and ritual commodity.' }, { order: 2, title: 'Spanish adoption', location: { name: 'Madrid', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: '16th century', routeType: 'colonial', notes: 'Spanish elites adapted cacao with sugar and European tastes.' }, { order: 3, title: 'Industrial chocolate', location: { name: 'London', countryCode: 'GB', coordinates: [-0.1276, 51.5072] }, period: '19th century', routeType: 'trade', notes: 'Industrial processing transformed cacao into mass-market chocolate.' }], convergenceRole: 'Supplies the flavor everything else orbits around.', confidence: 'high', sourceNotes: ["Cacao's Mesoamerican importance is well supported."] },
      { id: 'sugar', ingredient: 'Sugar', role: 'Sweetener', origin: { name: 'South Asia', countryCode: 'IN', coordinates: [78.9629, 20.5937] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Sugar refining spreads', location: { name: 'Persia', countryCode: 'IR', coordinates: [53.688, 32.4279] }, period: 'Early medieval', routeType: 'land', notes: 'Sugarcane cultivation and refining moved west through Asia.' }, { order: 2, title: 'Atlantic plantations', location: { name: 'Caribbean', countryCode: 'CU', coordinates: [-77.7812, 21.5218] }, period: '16th-18th century', routeType: 'colonial', notes: 'Plantation sugar made European chocolate much sweeter and more available.' }], convergenceRole: 'Turns cacao from bitter drink into global confection.', confidence: 'high', sourceNotes: ["Sugar's spread and plantation role are well documented."] }
    ],
    nameJourney: [{ order: 1, name: 'xocolatl / chocolatl', languageOrCulture: 'Nahuatl-associated', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian/colonial', notes: 'European chocolate terminology is tied to Mesoamerican language contact.' }],
    globalForces: ['Indigenous foodways', 'Spanish colonial exchange', 'plantation sugar', 'industrial processing'],
    sources: [{ id: 'cacao', title: 'Cacao history', note: 'Cacao was cultivated and consumed in Mesoamerica before European contact.' }],
    uncertainties: ['The word chocolate has contested linguistic roots across Nahuatl and related languages.']
  }
};

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
  const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 12);
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > maxRequests;
}

function buildPrompt(dish: string): string {
  return `You are a culinary historian. For the dish or drink "${dish}", return ONLY valid JSON (no markdown) with this shape:
{
  "dishName": "string",
  "canonicalDishName": "string",
  "dishType": "string",
  "plateLocation": { "name": "string", "countryCode": "ISO-2", "coordinates": [longitude, latitude] },
  "convergenceThesis": "2-3 sentence thesis",
  "shareQuote": "one punchy sentence under 150 chars",
  "dishLineage": [
    { "order": 1, "ancestorName": "string", "stageTitle": "string", "location": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "period": "string", "transformation": "string", "routeType": "land|sea|trade|migration|colonial|agricultural", "confidence": "high|medium|low", "notes": "string" }
  ],
  "ingredients": [
    { "id": "kebab-id", "ingredient": "string", "role": "string", "origin": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "originPeriod": "string", "route": [ { "order": 1, "title": "string", "location": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "period": "string", "routeType": "land|sea|trade|migration|colonial|agricultural", "notes": "string" } ], "convergenceRole": "string", "confidence": "high|medium|low", "sourceNotes": ["string"] }
  ],
  "nameJourney": [ { "order": 1, "name": "string", "languageOrCulture": "string", "location": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "period": "string", "notes": "string" } ],
  "globalForces": ["trade", "migration"],
  "sources": [{ "id": "string", "title": "string", "note": "string" }],
  "uncertainties": ["string"]
}
Include 3-7 dishLineage stages and 3-6 ingredients. Coordinates are [longitude, latitude].`;
}

async function callGemini(dish: string): Promise<unknown> {
  const apiKey = process.env.GEMINI_API_KEY || '';
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  if (!apiKey) throw { code: 'NO_API_KEY' };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: buildPrompt(dish) }] }],
      generationConfig: { temperature: 0.35, responseMimeType: 'application/json' }
    })
  });

  const raw = await res.text();
  if (!res.ok) {
    const code = res.status === 429 || raw.includes('RESOURCE_EXHAUSTED') ? 'GEMINI_QUOTA' : 'GEMINI_ERROR';
    throw { code, status: res.status, message: raw };
  }

  const payload = JSON.parse(raw);
  const text: string = (payload?.candidates?.[0]?.content?.parts ?? [])
    .map((p: { text?: string }) => p.text || '')
    .join('\n');
  if (!text) throw { code: 'EMPTY_RESPONSE' };

  try { return JSON.parse(text); } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw { code: 'INVALID_JSON' };
    return JSON.parse(match[0]);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = (String(req.headers['x-forwarded-for'] || '').split(',')[0] || 'unknown').trim();
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many requests. Try again in a minute.', examples: EXAMPLE_DISHES });
    }

    const dish = typeof req.body?.dish === 'string' ? req.body.dish.trim() : '';
    if (dish.length < 2 || dish.length > 80) {
      return res.status(400).json({ error: 'Enter a dish between 2 and 80 characters.', examples: EXAMPLE_DISHES });
    }

    const normalized = normalizeDish(dish);
    const seeded = SEEDED[normalized];
    if (seeded) {
      return res.status(200).json({ data: { ...seeded, cached: true } });
    }

    const data = await callGemini(dish);
    return res.status(200).json({ data });
  } catch (err: any) {
    console.error('cartography error', err?.code, err?.message);
    if (err?.code === 'NO_API_KEY') {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.', examples: EXAMPLE_DISHES });
    }
    if (err?.code === 'GEMINI_QUOTA') {
      return res.status(429).json({ error: 'Gemini quota exceeded. Try again soon.', examples: EXAMPLE_DISHES });
    }
    return res.status(500).json({ error: 'Failed to generate cartography. Try an example dish.', examples: EXAMPLE_DISHES });
  }
}
