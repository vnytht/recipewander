import type { DishCartography } from '../lib/types';

export const EXAMPLE_DISHES = ['butter chicken', 'ramen', 'tiramisu', 'margarita', 'chocolate', 'pizza', 'sushi', 'tacos', 'pad thai', 'biryani'];

export const normalizeDish = (dish: string) =>
  dish.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9 &'-]/g, '');

export const seededExamples: Record<string, DishCartography> = {
  'butter chicken': {
    dishName: 'Butter Chicken',
    canonicalDishName: 'Murgh Makhani',
    dishType: 'North Indian curry',
    plateLocation: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] },
    convergenceThesis: 'Butter chicken is a Delhi restaurant invention built from older routes: Central Asian tandoor technique, New World tomatoes and chilies, South Asian spice networks, and dairy-rich Punjabi cooking.',
    shareQuote: 'Butter chicken tastes local because five global routes learned to sit in the same Delhi sauce.',
    dishLineage: [
      {
        order: 1,
        ancestorName: 'Tandoori chicken',
        stageTitle: 'Clay-oven chicken tradition',
        location: { name: 'Punjab', countryCode: 'IN', coordinates: [75.3412, 31.1471] },
        period: 'Early 20th century and older technique roots',
        transformation: 'Marinated chicken cooked in a hot clay tandoor became the protein base later folded into sauce.',
        routeType: 'migration',
        confidence: 'medium',
        notes: 'The tandoor has deeper Central and South Asian roots, but restaurant-style tandoori chicken is the practical ancestor here.'
      },
      {
        order: 2,
        ancestorName: 'Punjabi restaurant cooking',
        stageTitle: 'Post-partition Delhi adaptation',
        location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] },
        period: 'Mid-20th century',
        transformation: 'Punjabi restaurateurs adapted tandoori chicken for an urban Delhi restaurant setting.',
        routeType: 'migration',
        confidence: 'medium',
        notes: 'Specific founder stories vary, but Delhi\'s post-partition restaurant culture is central to the modern dish.'
      },
      {
        order: 3,
        ancestorName: 'Makhani gravy',
        stageTitle: 'Tomato-butter-cream sauce',
        location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] },
        period: 'Mid-20th century',
        transformation: 'Chicken was reimagined inside a mild, rich tomato gravy finished with butter and cream.',
        routeType: 'trade',
        confidence: 'medium',
        notes: 'This is the defining transformation from roasted chicken to murgh makhani.'
      },
      {
        order: 4,
        ancestorName: 'Murgh makhani',
        stageTitle: 'Global butter chicken',
        location: { name: 'London', countryCode: 'GB', coordinates: [-0.1276, 51.5072] },
        period: 'Late 20th century',
        transformation: 'The Delhi restaurant dish became a global Indian restaurant staple under the English name butter chicken.',
        routeType: 'migration',
        confidence: 'medium',
        notes: 'Diaspora restaurants helped standardize and popularize the dish internationally.'
      }
    ],
    globalForces: ['Columbian exchange', 'Mughal and Central Asian foodways', 'Punjabi dairy culture', 'urban restaurant invention'],
    uncertainties: ['The exact first restaurant version is debated, but Delhi and the post-partition restaurant scene are central to the modern dish.'],
    sources: [
      { id: 'tomato', title: 'Tomato dispersal', note: 'Tomatoes originated in the Americas and spread globally after Iberian colonial exchange.' },
      { id: 'tandoor', title: 'Tandoor technique', note: 'Clay-oven cooking connects South Asia with Central and West Asian foodways.' }
    ],
    nameJourney: [
      {
        order: 1,
        name: 'Murgh Makhani',
        languageOrCulture: 'Hindi/Punjabi',
        location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] },
        period: '20th century',
        notes: 'The Hindi-Urdu/Punjabi name means buttery chicken, later exported globally as butter chicken.'
      }
    ],
    ingredients: [
      {
        id: 'tomato',
        ingredient: 'Tomato',
        role: 'Acidic body of the sauce',
        origin: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-99.1332, 19.4326] },
        originPeriod: 'Pre-Columbian',
        route: [
          { order: 1, title: 'Iberian transfer', location: { name: 'Seville', countryCode: 'ES', coordinates: [-5.9845, 37.3891] }, period: '16th century', routeType: 'colonial', notes: 'Spanish imperial exchange moved tomato seeds from the Americas into Europe.' },
          { order: 2, title: 'Indian adoption', location: { name: 'Goa', countryCode: 'IN', coordinates: [73.8567, 15.2993] }, period: '16th-17th century', routeType: 'sea', notes: 'Portuguese trade helped introduce New World crops into coastal India.' },
          { order: 3, title: 'Delhi sauce', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: '20th century', routeType: 'trade', notes: 'Tomato puree became the sweet-acidic base of the modern makhani gravy.' }
        ],
        convergenceRole: 'Makes the curry bright, red, and saucy.',
        confidence: 'high',
        sourceNotes: ['New World crop history is well established; exact Indian adoption timing varies regionally.']
      },
      {
        id: 'chili',
        ingredient: 'Chili',
        role: 'Heat and color',
        origin: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] },
        originPeriod: 'Pre-Columbian',
        route: [
          { order: 1, title: 'Portuguese ocean networks', location: { name: 'Lisbon', countryCode: 'PT', coordinates: [-9.1393, 38.7223] }, period: '16th century', routeType: 'sea', notes: 'Portuguese traders carried American chilies through Atlantic and Indian Ocean routes.' },
          { order: 2, title: 'South Asian spice adoption', location: { name: 'Goa', countryCode: 'IN', coordinates: [73.8567, 15.2993] }, period: '16th century', routeType: 'sea', notes: 'Chilies adapted quickly into South Asian cuisines.' },
          { order: 3, title: 'Makhani seasoning', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: '20th century', routeType: 'trade', notes: 'Mild red chili supports the dish\'s color and warmth.' }
        ],
        convergenceRole: 'Adds warmth without overwhelming cream and butter.',
        confidence: 'high',
        sourceNotes: ['The chili\'s American origin and Portuguese-mediated spread are well documented.']
      },
      {
        id: 'dairy',
        ingredient: 'Butter and cream',
        role: 'Richness',
        origin: { name: 'Punjab', countryCode: 'IN', coordinates: [75.3412, 31.1471] },
        originPeriod: 'Ancient',
        route: [
          { order: 1, title: 'Punjabi dairy cooking', location: { name: 'Punjab', countryCode: 'IN', coordinates: [75.3412, 31.1471] }, period: 'Longstanding', routeType: 'agricultural', notes: 'Dairy-rich cooking traditions made butter and cream natural finishing agents.' },
          { order: 2, title: 'Urban restaurant polish', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: '20th century', routeType: 'migration', notes: 'Punjabi restaurateurs helped shape the luxurious Delhi restaurant version.' }
        ],
        convergenceRole: 'Turns tomato and spice into a velvet sauce.',
        confidence: 'medium',
        sourceNotes: ['Cultural origin is broad; the restaurant-specific history is less precisely documented.']
      },
      {
        id: 'garam-masala',
        ingredient: 'Garam masala',
        role: 'Aromatic structure',
        origin: { name: 'Indian Ocean spice ports', countryCode: 'IN', coordinates: [72.8777, 19.076] },
        originPeriod: 'Ancient-medieval',
        route: [
          { order: 1, title: 'Spice route blending', location: { name: 'Malabar Coast', countryCode: 'IN', coordinates: [76.2711, 9.9312] }, period: 'Medieval', routeType: 'sea', notes: 'Pepper, cloves, cinnamon, cardamom, and related aromatics moved through Indian Ocean trade.' },
          { order: 2, title: 'North Indian masala practice', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.209, 28.6139] }, period: 'Early modern-modern', routeType: 'land', notes: 'Regional spice mixtures became a flexible grammar for curries.' }
        ],
        convergenceRole: 'Gives the dish its layered perfume.',
        confidence: 'medium',
        sourceNotes: ['Masala blends are regional and household-specific, so this route summarizes a wider spice network.']
      }
    ]
  },
  margarita: {
    dishName: 'Margarita',
    canonicalDishName: 'Margarita',
    dishType: 'Cocktail',
    plateLocation: { name: 'Northern Mexico', countryCode: 'MX', coordinates: [-117.0382, 32.5149] },
    convergenceThesis: 'The margarita is a borderlands convergence: Indigenous agave, Mediterranean citrus, mineral salt, and European distillation technology meeting in Mexican drinking culture.',
    shareQuote: 'The margarita is what happened when agave, empire, citrus, and salt met at the border.',
    dishLineage: [
      {
        order: 1,
        ancestorName: 'Agave drinks',
        stageTitle: 'Fermented agave tradition',
        location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] },
        period: 'Pre-Columbian',
        transformation: 'Agave drinks established the plant as a ritual and everyday beverage base.',
        routeType: 'agricultural',
        confidence: 'high',
        notes: 'This is a cultural ancestor rather than the direct cocktail form.'
      },
      {
        order: 2,
        ancestorName: 'Tequila',
        stageTitle: 'Distilled agave spirit',
        location: { name: 'Jalisco', countryCode: 'MX', coordinates: [-103.3496, 20.6597] },
        period: 'Colonial and early modern period',
        transformation: 'Distillation turned agave fermentation into the spirit that anchors the margarita.',
        routeType: 'colonial',
        confidence: 'medium',
        notes: 'Distillation influences are complex, but colonial-era agave spirits are the key bridge.'
      },
      {
        order: 3,
        ancestorName: 'Daisy cocktail family',
        stageTitle: 'Citrus-sweetened sour template',
        location: { name: 'United States-Mexico borderlands', countryCode: 'MX', coordinates: [-117.0382, 32.5149] },
        period: 'Early 20th century',
        transformation: 'Tequila met citrus and orange liqueur in a sour-style drink family.',
        routeType: 'trade',
        confidence: 'low',
        notes: 'Several origin stories compete, so this stage is best treated as a family resemblance.'
      },
      {
        order: 4,
        ancestorName: 'Margarita',
        stageTitle: 'Borderlands cocktail icon',
        location: { name: 'Northern Mexico', countryCode: 'MX', coordinates: [-117.0382, 32.5149] },
        period: 'Mid-20th century',
        transformation: 'The tequila sour became standardized as the salt-rimmed margarita.',
        routeType: 'migration',
        confidence: 'medium',
        notes: 'The exact inventor is disputed, but the border tourism context is central.'
      }
    ],
    globalForces: ['Spanish empire', 'distillation technology', 'border tourism', 'citrus trade'],
    uncertainties: ['Several origin stories compete for the named cocktail; the ingredient histories are clearer than the exact inventor.'],
    sources: [
      { id: 'agave', title: 'Agave and tequila', note: 'Agave fermentation predates Europeans; distilled tequila emerged after distillation technology arrived.' },
      { id: 'citrus', title: 'Citrus movement', note: 'Limes and oranges traveled from Asia through Mediterranean and colonial routes.' }
    ],
    nameJourney: [
      {
        order: 1,
        name: 'Margarita',
        languageOrCulture: 'Spanish',
        location: { name: 'Mexico', countryCode: 'MX', coordinates: [-102.5528, 23.6345] },
        period: '20th century',
        notes: 'The name is Spanish for daisy, also a cocktail-family term in English drinking culture.'
      }
    ],
    ingredients: [
      {
        id: 'agave',
        ingredient: 'Agave tequila',
        role: 'Base spirit',
        origin: { name: 'Jalisco', countryCode: 'MX', coordinates: [-103.3496, 20.6597] },
        originPeriod: 'Pre-Columbian agave use; colonial distillation',
        route: [
          { order: 1, title: 'Agave fermentation', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian', routeType: 'agricultural', notes: 'Maguey and agave drinks were part of Indigenous foodways.' },
          { order: 2, title: 'Distillation arrives', location: { name: 'Jalisco', countryCode: 'MX', coordinates: [-103.3496, 20.6597] }, period: '16th-17th century', routeType: 'colonial', notes: 'European and possibly Asian distillation practices shaped agave spirits.' },
          { order: 3, title: 'Cocktail base', location: { name: 'Northern Mexico', countryCode: 'MX', coordinates: [-117.0382, 32.5149] }, period: '20th century', routeType: 'trade', notes: 'Tequila became the center of the modern margarita.' }
        ],
        convergenceRole: 'Provides the unmistakable agave backbone.',
        confidence: 'high',
        sourceNotes: ['Agave origin is firm; distillation influences are more complex.']
      },
      {
        id: 'lime',
        ingredient: 'Lime',
        role: 'Acid',
        origin: { name: 'Southeast Asia', countryCode: 'MY', coordinates: [101.9758, 4.2105] },
        originPeriod: 'Ancient',
        route: [
          { order: 1, title: 'Indian Ocean citrus route', location: { name: 'Persian Gulf', countryCode: 'IR', coordinates: [51.389, 35.6892] }, period: 'Medieval', routeType: 'sea', notes: 'Citrus moved west through trade and cultivation.' },
          { order: 2, title: 'Iberian cultivation', location: { name: 'Seville', countryCode: 'ES', coordinates: [-5.9845, 37.3891] }, period: 'Medieval-early modern', routeType: 'land', notes: 'Mediterranean agriculture absorbed citrus before Atlantic colonization.' },
          { order: 3, title: 'New Spain citrus', location: { name: 'Mexico', countryCode: 'MX', coordinates: [-102.5528, 23.6345] }, period: '16th century', routeType: 'colonial', notes: 'Spanish colonial agriculture brought citrus to the Americas.' }
        ],
        convergenceRole: 'Cuts tequila with brightness.',
        confidence: 'medium',
        sourceNotes: ['Specific lime varieties have tangled routes; this summarizes the broad citrus movement.']
      }
    ]
  },
  ramen: {
    dishName: 'Ramen',
    canonicalDishName: 'Ramen',
    dishType: 'Noodle soup',
    plateLocation: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] },
    convergenceThesis: 'Ramen is a Japanese bowl shaped by Chinese wheat noodles, modern urban labor, regional broth styles, and postwar food systems.',
    shareQuote: 'Ramen is not one route. It is a bowl where Chinese noodles became Japanese city life.',
    dishLineage: [
      {
        order: 1,
        ancestorName: 'Chinese wheat noodle soups',
        stageTitle: 'Noodle soup ancestor',
        location: { name: 'North China', countryCode: 'CN', coordinates: [116.4074, 39.9042] },
        period: 'Longstanding',
        transformation: 'Wheat noodle techniques and soup service created the culinary ancestor.',
        routeType: 'agricultural',
        confidence: 'high',
        notes: 'Ramen\'s exact lineage is debated, but Chinese noodle influence is clear.'
      },
      {
        order: 2,
        ancestorName: 'Shina soba',
        stageTitle: 'Port-city Chinese noodles in Japan',
        location: { name: 'Yokohama', countryCode: 'JP', coordinates: [139.638, 35.4437] },
        period: 'Late 19th to early 20th century',
        transformation: 'Chinese-style noodle soups entered Japanese port-city restaurant culture.',
        routeType: 'migration',
        confidence: 'medium',
        notes: 'Chinese communities and trade ports were important transmission points.'
      },
      {
        order: 3,
        ancestorName: 'Ramen shops',
        stageTitle: 'Urban Japanese comfort bowl',
        location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] },
        period: '20th century',
        transformation: 'Japanese shops localized broth, tare, toppings, and regional styles.',
        routeType: 'trade',
        confidence: 'high',
        notes: 'The dish became recognizably Japanese through local shop culture.'
      },
      {
        order: 4,
        ancestorName: 'Instant and global ramen',
        stageTitle: 'Global ramen culture',
        location: { name: 'Osaka', countryCode: 'JP', coordinates: [135.5023, 34.6937] },
        period: 'Mid-late 20th century',
        transformation: 'Instant noodles and specialty shops helped ramen become a global category.',
        routeType: 'trade',
        confidence: 'high',
        notes: 'Industrial and restaurant ramen spread through different but linked channels.'
      }
    ],
    globalForces: ['Chinese migration', 'urbanization', 'postwar wheat supply', 'regional adaptation'],
    uncertainties: ['Ramen has multiple regional origin claims and evolved gradually rather than from one invention.'],
    sources: [{ id: 'ramen', title: 'Ramen history', note: 'Chinese-style wheat noodles became localized in Japan during the modern period.' }],
    nameJourney: [
      {
        order: 1,
        name: 'Lamian / Ramen',
        languageOrCulture: 'Chinese/Japanese',
        location: { name: 'Yokohama', countryCode: 'JP', coordinates: [139.638, 35.4437] },
        period: '19th-20th century',
        notes: 'Chinese noodle terminology and restaurant culture fed into the Japanese word ramen.'
      }
    ],
    ingredients: [
      {
        id: 'wheat-noodles',
        ingredient: 'Wheat noodles',
        role: 'Main structure',
        origin: { name: 'North China', countryCode: 'CN', coordinates: [116.4074, 39.9042] },
        originPeriod: 'Ancient-medieval',
        route: [
          { order: 1, title: 'Chinese noodle craft', location: { name: 'North China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, period: 'Longstanding', routeType: 'agricultural', notes: 'Wheat-based noodle traditions developed in northern China.' },
          { order: 2, title: 'Port-city restaurants', location: { name: 'Yokohama', countryCode: 'JP', coordinates: [139.638, 35.4437] }, period: '19th century', routeType: 'migration', notes: 'Chinese communities and port trade introduced noodle soup styles.' },
          { order: 3, title: 'Japanese ramen boom', location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: '20th century', routeType: 'trade', notes: 'Urban shops standardized ramen as a Japanese comfort food.' }
        ],
        convergenceRole: 'Carries the bowl\'s texture and identity.',
        confidence: 'high',
        sourceNotes: ['Chinese influence is well established; exact lineage is debated.']
      },
      {
        id: 'soy',
        ingredient: 'Soy sauce',
        role: 'Umami seasoning',
        origin: { name: 'China', countryCode: 'CN', coordinates: [116.4074, 39.9042] },
        originPeriod: 'Ancient',
        route: [
          { order: 1, title: 'Fermentation knowledge', location: { name: 'China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, period: 'Ancient', routeType: 'agricultural', notes: 'Soy fermentation developed across East Asian food systems.' },
          { order: 2, title: 'Japanese shoyu', location: { name: 'Kansai', countryCode: 'JP', coordinates: [135.7681, 35.0116] }, period: 'Medieval-early modern', routeType: 'trade', notes: 'Japanese soy sauce traditions became distinct regional seasonings.' },
          { order: 3, title: 'Shoyu ramen', location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: '20th century', routeType: 'trade', notes: 'Soy sauce became one of ramen\'s defining tare bases.' }
        ],
        convergenceRole: 'Turns broth into a recognizable shoyu profile.',
        confidence: 'high',
        sourceNotes: ['Fermentation histories are broad but the shoyu role is clear.']
      }
    ]
  },
  tiramisu: {
    dishName: 'Tiramisu',
    canonicalDishName: 'Tiramisu',
    dishType: 'Dessert',
    plateLocation: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] },
    convergenceThesis: 'Tiramisu is a modern Italian dessert made from older global luxuries: coffee from African-Arabian trade, cacao from the Americas, sugar from plantation economies, and Italian dairy craft.',
    shareQuote: 'Tiramisu is Italy\'s soft landing pad for coffee, cacao, sugar, and empire.',
    dishLineage: [
      {
        order: 1,
        ancestorName: 'Layered spoon desserts',
        stageTitle: 'Italian cream dessert grammar',
        location: { name: 'Northern Italy', countryCode: 'IT', coordinates: [10.328, 44.8015] },
        period: '19th-20th century',
        transformation: 'Custard, cream, biscuits, and soaked layers formed the dessert family tiramisu would join.',
        routeType: 'trade',
        confidence: 'medium',
        notes: 'This is a dessert-family ancestor, not a single direct parent.'
      },
      {
        order: 2,
        ancestorName: 'Coffee-soaked sweets',
        stageTitle: 'Espresso enters dessert',
        location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] },
        period: '20th century',
        transformation: 'Coffee became the bitter soak balancing dairy and sugar.',
        routeType: 'trade',
        confidence: 'medium',
        notes: 'Coffee culture is essential to the modern identity.'
      },
      {
        order: 3,
        ancestorName: 'Tirami su',
        stageTitle: 'Modern tiramisu',
        location: { name: 'Treviso', countryCode: 'IT', coordinates: [12.243, 45.6669] },
        period: 'Late 20th century',
        transformation: 'Mascarpone, ladyfingers, espresso, sugar, and cocoa consolidated into the modern dessert.',
        routeType: 'trade',
        confidence: 'medium',
        notes: 'Northern Italian origin claims vary, but Veneto is central to the usual story.'
      }
    ],
    globalForces: ['coffee trade', 'Columbian exchange', 'plantation sugar', 'Italian regional cuisine'],
    uncertainties: ['Several northern Italian origin claims exist for the modern recipe.'],
    sources: [{ id: 'tiramisu', title: 'Modern tiramisu', note: 'The dessert is generally associated with northeastern Italy in the late 20th century.' }],
    nameJourney: [
      {
        order: 1,
        name: 'Tirami su',
        languageOrCulture: 'Italian',
        location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] },
        period: '20th century',
        notes: 'The name roughly means pick me up, pointing to the coffee and sugar lift.'
      }
    ],
    ingredients: [
      {
        id: 'coffee',
        ingredient: 'Coffee',
        role: 'Bitter soak',
        origin: { name: 'Ethiopian Highlands', countryCode: 'ET', coordinates: [38.7578, 9.145] },
        originPeriod: 'Medieval use; early modern trade',
        route: [
          { order: 1, title: 'Red Sea coffee trade', location: { name: 'Mokha', countryCode: 'YE', coordinates: [43.25, 13.32] }, period: '15th century', routeType: 'sea', notes: 'Yemeni ports helped carry coffee into wider commerce.' },
          { order: 2, title: 'Venetian coffee culture', location: { name: 'Venice', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '17th century', routeType: 'sea', notes: 'Venice was among Europe\'s early coffee gateways.' },
          { order: 3, title: 'Dessert soak', location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '20th century', routeType: 'trade', notes: 'Espresso became the bitter counterweight to mascarpone and sugar.' }
        ],
        convergenceRole: 'Gives tiramisu its lift and bite.',
        confidence: 'high',
        sourceNotes: ['Coffee trade through Yemen and Venice is broadly documented.']
      },
      {
        id: 'cacao',
        ingredient: 'Cacao',
        role: 'Dusting and aroma',
        origin: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-90.2308, 15.7835] },
        originPeriod: 'Pre-Columbian',
        route: [
          { order: 1, title: 'Spanish colonial transfer', location: { name: 'Madrid', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: '16th century', routeType: 'colonial', notes: 'Cacao entered Europe through Spanish imperial networks.' },
          { order: 2, title: 'European chocolate culture', location: { name: 'Turin', countryCode: 'IT', coordinates: [7.6869, 45.0703] }, period: '17th-19th century', routeType: 'trade', notes: 'Italian confectioners absorbed cacao into regional dessert cultures.' },
          { order: 3, title: 'Tiramisu finish', location: { name: 'Veneto', countryCode: 'IT', coordinates: [12.3155, 45.4408] }, period: '20th century', routeType: 'trade', notes: 'Cocoa powder became the final bitter aromatic layer.' }
        ],
        convergenceRole: 'Adds the dry, dark top note.',
        confidence: 'high',
        sourceNotes: ['Cacao\'s American origin and European spread are well documented.']
      }
    ]
  },
  chocolate: {
    dishName: 'Chocolate',
    canonicalDishName: 'Chocolate',
    dishType: 'Food and drink family',
    plateLocation: { name: 'Mexico City', countryCode: 'MX', coordinates: [-99.1332, 19.4326] },
    convergenceThesis: 'Chocolate began as Indigenous cacao culture before sugar, milk, machinery, and colonial trade transformed it into a global sweet.',
    shareQuote: 'Chocolate is an American seed that became a global luxury through sugar, empire, and machines.',
    dishLineage: [
      {
        order: 1,
        ancestorName: 'Mesoamerican cacao drink',
        stageTitle: 'Cacao as drink and ritual food',
        location: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-90.2308, 15.7835] },
        period: 'Pre-Columbian',
        transformation: 'Cacao was prepared as a valued bitter drink and cultural commodity.',
        routeType: 'agricultural',
        confidence: 'high',
        notes: 'This is the deep ancestor of chocolate as a food category.'
      },
      {
        order: 2,
        ancestorName: 'Spanish chocolate',
        stageTitle: 'Sweetened European adaptation',
        location: { name: 'Madrid', countryCode: 'ES', coordinates: [-3.7038, 40.4168] },
        period: '16th-17th century',
        transformation: 'Cacao was sweetened and adapted to European elite tastes.',
        routeType: 'colonial',
        confidence: 'high',
        notes: 'Sugar transformed cacao\'s social role and flavor profile.'
      },
      {
        order: 3,
        ancestorName: 'Eating chocolate',
        stageTitle: 'Industrial solid chocolate',
        location: { name: 'London', countryCode: 'GB', coordinates: [-0.1276, 51.5072] },
        period: '19th century',
        transformation: 'Industrial processing turned drinking chocolate into bars and confections.',
        routeType: 'trade',
        confidence: 'high',
        notes: 'Machinery and sugar supply changed chocolate from drink to mass-market sweet.'
      }
    ],
    globalForces: ['Indigenous foodways', 'Spanish colonial exchange', 'plantation sugar', 'industrial processing'],
    uncertainties: ['The word chocolate has contested linguistic roots across Nahuatl and related languages.'],
    sources: [{ id: 'cacao', title: 'Cacao history', note: 'Cacao was cultivated and consumed in Mesoamerica before European contact.' }],
    nameJourney: [
      {
        order: 1,
        name: 'xocolatl / chocolatl',
        languageOrCulture: 'Nahuatl-associated',
        location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] },
        period: 'Pre-Columbian/colonial',
        notes: 'The exact form is debated, but European chocolate terminology is tied to Mesoamerican language contact.'
      }
    ],
    ingredients: [
      {
        id: 'cacao',
        ingredient: 'Cacao',
        role: 'Core seed',
        origin: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-90.2308, 15.7835] },
        originPeriod: 'Pre-Columbian',
        route: [
          { order: 1, title: 'Mesoamerican drink culture', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian', routeType: 'agricultural', notes: 'Cacao was prepared as a valued drink and ritual commodity.' },
          { order: 2, title: 'Spanish adoption', location: { name: 'Madrid', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: '16th century', routeType: 'colonial', notes: 'Spanish elites adapted cacao with sugar and European tastes.' },
          { order: 3, title: 'Industrial chocolate', location: { name: 'London', countryCode: 'GB', coordinates: [-0.1276, 51.5072] }, period: '19th century', routeType: 'trade', notes: 'Industrial processing transformed cacao into mass-market chocolate.' }
        ],
        convergenceRole: 'Supplies the flavor everything else orbits around.',
        confidence: 'high',
        sourceNotes: ['Cacao\'s Mesoamerican importance is well supported.']
      },
      {
        id: 'sugar',
        ingredient: 'Sugar',
        role: 'Sweetener',
        origin: { name: 'South Asia', countryCode: 'IN', coordinates: [78.9629, 20.5937] },
        originPeriod: 'Ancient',
        route: [
          { order: 1, title: 'Sugar refining spreads', location: { name: 'Persia', countryCode: 'IR', coordinates: [53.688, 32.4279] }, period: 'Early medieval', routeType: 'land', notes: 'Sugarcane cultivation and refining moved west through Asia.' },
          { order: 2, title: 'Atlantic plantations', location: { name: 'Caribbean', countryCode: 'CU', coordinates: [-77.7812, 21.5218] }, period: '16th-18th century', routeType: 'colonial', notes: 'Plantation sugar made European chocolate much sweeter and more available.' },
          { order: 3, title: 'Sweet chocolate', location: { name: 'Europe', countryCode: 'GB', coordinates: [-0.1276, 51.5072] }, period: '17th-19th century', routeType: 'trade', notes: 'Sugar reshaped bitter cacao into a dessert flavor.' }
        ],
        convergenceRole: 'Turns cacao from bitter drink into global confection.',
        confidence: 'high',
        sourceNotes: ['Sugar\'s spread and plantation role are well documented.']
      }
    ]
  },

  'pizza': {
    dishName: 'Pizza',
    canonicalDishName: 'Pizza Napoletana',
    dishType: 'Flatbread with toppings',
    plateLocation: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] },
    convergenceThesis: 'Pizza fuses ancient flatbread traditions with New World tomatoes and Middle Eastern cheese-making. The modern pizza was shaped in Naples, then transformed again by Italian immigrants in America who introduced toppings and the slice culture the world now recognizes.',
    shareQuote: 'Pizza is a Neapolitan street food built from an American vegetable that Italians once feared.',
    dishLineage: [
      { order: 1, ancestorName: 'Ancient flatbreads', stageTitle: 'Levened grain discs', location: { name: 'Ancient Mediterranean', countryCode: 'GR', coordinates: [21.8243, 39.0742] }, period: 'Antiquity', transformation: 'Greeks, Romans, and Egyptians baked flatbreads topped with oils, herbs, and cheese.', routeType: 'agricultural', confidence: 'high', notes: 'Flatbread with toppings is documented across multiple ancient Mediterranean cultures.' },
      { order: 2, ancestorName: 'Neapolitan focaccia', stageTitle: 'Street bread of Naples', location: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] }, period: '16th–17th century', transformation: 'Naples developed a baked flatbread sold cheaply to the urban poor.', routeType: 'migration', confidence: 'high', notes: 'Pizza as cheap street food for lazzaroni (Naples poor) is well documented.' },
      { order: 3, ancestorName: 'Pizza al pomodoro', stageTitle: 'Tomato arrives', location: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] }, period: 'Late 18th century', transformation: 'Tomatoes—long feared as poisonous—were adopted by the Neapolitan poor and became the defining topping.', routeType: 'colonial', confidence: 'high', notes: 'Tomato adoption in Naples was initially a working-class phenomenon before spreading upward.' },
      { order: 4, ancestorName: 'Pizza Margherita', stageTitle: 'National codification', location: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] }, period: '1889', transformation: 'The tricolor Margherita (tomato, mozzarella, basil) became a symbol of unified Italy.', routeType: 'migration', confidence: 'medium', notes: 'The Raffaele Esposito/Queen Margherita story may be partly apocryphal.' },
      { order: 5, ancestorName: 'Italian-American pizza', stageTitle: 'Immigrant reinvention', location: { name: 'New York', countryCode: 'US', coordinates: [-74.006, 40.7128] }, period: 'Early 20th century', transformation: 'Italian immigrants introduced pizza to the US, where it evolved into thicker, cheesier, slice-format pies.', routeType: 'migration', confidence: 'high', notes: 'The first documented US pizzeria opened in New York in 1905.' }
    ],
    ingredients: [
      { id: 'tomato', ingredient: 'Tomato', role: 'Sauce base', origin: { name: 'Andes', countryCode: 'PE', coordinates: [-75.0152, -9.189] }, originPeriod: 'Pre-Columbian', route: [{ order: 1, title: 'Inca cultivation', location: { name: 'Peru', countryCode: 'PE', coordinates: [-75.0152, -9.189] }, period: 'Pre-Columbian', routeType: 'agricultural', notes: 'Tomatoes were domesticated in Mesoamerica/Andes.' }, { order: 2, title: 'Spanish introduction', location: { name: 'Seville', countryCode: 'ES', coordinates: [-5.9845, 37.3891] }, period: '16th century', routeType: 'colonial', notes: 'Spanish colonizers brought tomatoes to Europe.' }, { order: 3, title: 'Italian adoption', location: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] }, period: 'Late 18th century', routeType: 'trade', notes: 'The Neapolitan poor were early adopters despite widespread European fear of the plant.' }], convergenceRole: 'The defining ingredient that separates pizza from all earlier flatbreads.', confidence: 'high', sourceNotes: ['Tomato adoption in Naples is well documented.'] },
      { id: 'mozzarella', ingredient: 'Mozzarella', role: 'Primary cheese', origin: { name: 'Campania', countryCode: 'IT', coordinates: [14.7681, 40.6218] }, originPeriod: '14th century', route: [{ order: 1, title: 'Water buffalo cheese tradition', location: { name: 'Campania', countryCode: 'IT', coordinates: [14.7681, 40.6218] }, period: 'Medieval', routeType: 'agricultural', notes: 'Mozzarella made from water buffalo milk is native to southern Italy.' }], convergenceRole: 'Provides the melted, stretchy texture the world associates with pizza.', confidence: 'high', sourceNotes: ['Campanian mozzarella tradition is well attested.'] },
      { id: 'wheat', ingredient: 'Wheat', role: 'Dough base', origin: { name: 'Fertile Crescent', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, originPeriod: '10,000 BCE', route: [{ order: 1, title: 'Neolithic wheat cultivation', location: { name: 'Mesopotamia', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, period: '10,000–8,000 BCE', routeType: 'agricultural', notes: 'Emmer and einkorn wheat were first domesticated in the Fertile Crescent.' }, { order: 2, title: 'Mediterranean spread', location: { name: 'Rome', countryCode: 'IT', coordinates: [12.4964, 41.9028] }, period: 'Antiquity', routeType: 'trade', notes: 'Wheat became the dietary staple of the Roman empire and Mediterranean civilizations.' }], convergenceRole: 'The structural foundation without which pizza cannot exist.', confidence: 'high', sourceNotes: ['Wheat domestication is among the best-documented events in agricultural history.'] }
    ],
    nameJourney: [
      { order: 1, name: 'picea / pinsa', languageOrCulture: 'Latin', location: { name: 'Rome', countryCode: 'IT', coordinates: [12.4964, 41.9028] }, period: 'Antiquity', notes: 'Latin terms for flatbreads may be etymological ancestors, though the direct link is disputed.' },
      { order: 2, name: 'pizza', languageOrCulture: 'Neapolitan/Italian', location: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] }, period: '10th century onward', notes: 'The word pizza appears in a Latin document from Gaeta in 997 CE.' }
    ],
    globalForces: ['Columbian Exchange', 'Italian immigration', 'mass food culture'],
    sources: [{ id: 'pizza-history', title: 'Pizza origins', note: 'Naples as the birthplace of the modern tomato pizza is well established; earlier flatbread antecedents are documented across the Mediterranean.' }],
    uncertainties: ['The precise etymology of the word pizza is not fully settled.', 'The Margherita origin story may be a later invention.']
  },

  'sushi': {
    dishName: 'Sushi',
    canonicalDishName: 'Nigiri Sushi',
    dishType: 'Vinegared rice with fish',
    plateLocation: { name: 'Tokyo (Edo)', countryCode: 'JP', coordinates: [139.6917, 35.6895] },
    convergenceThesis: 'Sushi evolved from a Southeast Asian fish-preservation technique using fermented rice, traveled north through China into Japan, and was radically transformed in 19th-century Edo into fresh nigiri—a fast food sold from street stalls. A second transformation happened in 20th-century California, where the inside-out roll and avocado substitution introduced it to the West.',
    shareQuote: 'Sushi started as a way to preserve fish; the rice was discarded. Today the rice is the point.',
    dishLineage: [
      { order: 1, ancestorName: 'Narezushi', stageTitle: 'Fermented fish preservation', location: { name: 'Southeast Asia / Yunnan', countryCode: 'CN', coordinates: [101.4871, 23.7136] }, period: 'Before 7th century CE', transformation: 'Fish was layered with salt and rice to ferment for months; the rice was discarded and only the fish eaten.', routeType: 'migration', confidence: 'medium', notes: 'This technique is documented across Southeast Asia and southern China before entering Japan.' },
      { order: 2, ancestorName: 'Narezushi in Japan', stageTitle: 'Japanese fermented rice-fish', location: { name: 'Lake Biwa', countryCode: 'JP', coordinates: [136.0709, 35.3084] }, period: '8th–15th century', transformation: 'Japan adapted narezushi; Funazushi around Lake Biwa is the best-surviving example.', routeType: 'agricultural', confidence: 'high', notes: 'Funazushi is still made today and represents the oldest form of Japanese sushi.' },
      { order: 3, ancestorName: 'Hayazushi', stageTitle: 'Quick-press sushi', location: { name: 'Osaka', countryCode: 'JP', coordinates: [135.5023, 34.6937] }, period: 'Muromachi period (14th–16th c.)', transformation: 'Fermentation time was shortened dramatically; the rice became part of the dish.', routeType: 'trade', confidence: 'high', notes: 'Oshi-zushi (pressed sushi) from the Osaka region reflects this transition.' },
      { order: 4, ancestorName: 'Edo-mae nigiri', stageTitle: 'Fast food street sushi', location: { name: 'Edo (Tokyo)', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: 'Early 19th century', transformation: 'Hanaya Yohei\'s innovation: hand-pressed fresh fish on vinegared rice served instantly at yatai stalls.', routeType: 'migration', confidence: 'high', notes: 'This is the birth of modern nigiri sushi. Vinegar replaced fermentation entirely.' },
      { order: 5, ancestorName: 'California Roll era', stageTitle: 'Western adaptation', location: { name: 'Los Angeles', countryCode: 'US', coordinates: [-118.2437, 34.0522] }, period: '1970s', transformation: 'Avocado substituted for toro; inside-out rolls concealed nori for unfamiliar diners.', routeType: 'migration', confidence: 'high', notes: 'The California Roll made sushi accessible and launched its global expansion.' }
    ],
    ingredients: [
      { id: 'rice', ingredient: 'Short-grain rice', role: 'Vinegared base', origin: { name: 'Yangtze River basin', countryCode: 'CN', coordinates: [117.0, 31.0] }, originPeriod: '7000 BCE', route: [{ order: 1, title: 'Rice domestication in China', location: { name: 'Yangtze Delta', countryCode: 'CN', coordinates: [121.0, 31.0] }, period: '7000–5000 BCE', routeType: 'agricultural', notes: 'Rice was domesticated in the Yangtze River basin.' }, { order: 2, title: 'Rice enters Japan', location: { name: 'Kyushu', countryCode: 'JP', coordinates: [130.8583, 32.7448] }, period: '300 BCE', routeType: 'migration', notes: 'Wet-rice agriculture arrived in Japan from the Korean peninsula and China.' }], convergenceRole: 'The transformed center of sushi—once discarded, now the defining element.', confidence: 'high', sourceNotes: ['Rice domestication in China is archaeologically established.'] },
      { id: 'rice-vinegar', ingredient: 'Rice vinegar', role: 'Seasoning and preservative', origin: { name: 'China', countryCode: 'CN', coordinates: [104.1954, 35.8617] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Chinese vinegar traditions', location: { name: 'China', countryCode: 'CN', coordinates: [104.1954, 35.8617] }, period: 'Antiquity', routeType: 'trade', notes: 'Vinegar production from rice is an ancient Chinese practice.' }, { order: 2, title: 'Edo innovation', location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: 'Early 19th century', routeType: 'agricultural', notes: 'Vinegar replaced fermentation time entirely, enabling same-day service.' }], convergenceRole: 'The substitution for fermentation that created modern sushi.', confidence: 'high', sourceNotes: ['The shift to vinegared rice in Edo-period sushi is well documented.'] },
      { id: 'nori', ingredient: 'Nori (dried seaweed)', role: 'Wrapper', origin: { name: 'Japan', countryCode: 'JP', coordinates: [135.5023, 34.6937] }, originPeriod: '8th century CE', route: [{ order: 1, title: 'Nori cultivation in Edo Bay', location: { name: 'Tokyo Bay', countryCode: 'JP', coordinates: [139.77, 35.54] }, period: 'Edo period', routeType: 'agricultural', notes: 'Nori cultivation developed in Tokyo Bay and became integral to Edo cuisine.' }], convergenceRole: 'Structural wrapper that enabled maki rolls and shaped global sushi presentation.', confidence: 'high', sourceNotes: ['Nori use in Japanese cuisine is historically well attested.'] }
    ],
    nameJourney: [
      { order: 1, name: 'narezushi', languageOrCulture: 'Japanese', location: { name: 'Japan', countryCode: 'JP', coordinates: [138.2529, 36.2048] }, period: '8th century', notes: 'The older fermented form; sushi referred to the sour/fermented quality (酸し, sui = sour).' },
      { order: 2, name: 'sushi (寿司)', languageOrCulture: 'Japanese (Edo period)', location: { name: 'Tokyo', countryCode: 'JP', coordinates: [139.6917, 35.6895] }, period: '19th century', notes: 'The auspicious characters used in the modern written form (寿司) were adopted in the Edo period for good luck.' }
    ],
    globalForces: ['rice agriculture spread', 'Edo urbanization', 'Japanese diaspora', 'California food culture'],
    sources: [{ id: 'sushi-history', title: 'Sushi origins', note: 'The fermented fish preservation origin and Edo-period nigiri innovation are well documented in Japanese food history.' }],
    uncertainties: ['The exact migration path of narezushi from Southeast Asia to Japan is not fully mapped.']
  },

  'tacos': {
    dishName: 'Tacos',
    canonicalDishName: 'Taco',
    dishType: 'Corn tortilla filled dish',
    plateLocation: { name: 'Mexico City', countryCode: 'MX', coordinates: [-99.1332, 19.4326] },
    convergenceThesis: 'Tacos are built on a Mesoamerican corn tradition thousands of years old, but the modern taco was shaped by 19th-century Mexican silver miners and 20th-century migration to US border cities. The hard-shell "taco" familiar to most Americans is largely a US commercial invention; authentic Mexican tacos use soft corn tortillas.',
    shareQuote: 'The taco is a 3,000-year-old corn tradition and a 20th-century border invention at the same time.',
    dishLineage: [
      { order: 1, ancestorName: 'Mesoamerican nixtamal', stageTitle: 'Lime-treated corn dough', location: { name: 'Oaxaca/Valley of Mexico', countryCode: 'MX', coordinates: [-96.7266, 17.0732] }, period: '1500 BCE and earlier', transformation: 'Mesoamerican peoples developed nixtamalization—treating maize with alkaline lime—creating masa for tortillas.', routeType: 'agricultural', confidence: 'high', notes: 'Nixtamal is foundational to Mesoamerican cuisine and significantly boosts corn\'s nutritional value.' },
      { order: 2, ancestorName: 'Tortilla as staple wrap', stageTitle: 'Corn flatbread carrier', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian', transformation: 'Tortillas served as edible plates and utensils, filled with beans, insects, or meat.', routeType: 'agricultural', confidence: 'high', notes: 'Spanish accounts from the 1500s describe tortillas used as edible spoons.' },
      { order: 3, ancestorName: 'Taco de minero', stageTitle: 'Miners\' taco', location: { name: 'Guanajuato/Hidalgo mines', countryCode: 'MX', coordinates: [-101.2574, 21.019] }, period: '19th century', transformation: 'The word taco first appears in Mexican silver mines—referring to gunpowder charges wrapped in paper—then applied to food.', routeType: 'migration', confidence: 'medium', notes: 'The etymological link between mining and food tacos is documented but debated.' },
      { order: 4, ancestorName: 'Taco de guisado', stageTitle: 'Urban street food', location: { name: 'Mexico City', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Early 20th century', transformation: 'Tacos became standardized street food sold by women at market stalls.', routeType: 'migration', confidence: 'high', notes: 'The taqueria model emerged in Mexico City and spread with internal migration.' },
      { order: 5, ancestorName: 'US border taco', stageTitle: 'Tex-Mex and fast food', location: { name: 'San Antonio / Los Angeles', countryCode: 'US', coordinates: [-98.4936, 29.4241] }, period: 'Mid-20th century', transformation: 'Taco Bell (1962) and the hard-shell format codified a simplified American version for mass consumption.', routeType: 'migration', confidence: 'high', notes: 'The crunchy hard shell is primarily a US invention and rare in Mexico.' }
    ],
    ingredients: [
      { id: 'corn-masa', ingredient: 'Nixtamalized corn (masa)', role: 'Tortilla base', origin: { name: 'Valley of Mexico / Oaxaca', countryCode: 'MX', coordinates: [-96.7266, 17.0732] }, originPeriod: '1500 BCE', route: [{ order: 1, title: 'Maize domestication', location: { name: 'Balsas River Valley', countryCode: 'MX', coordinates: [-100.5, 18.0] }, period: '9000 BCE', routeType: 'agricultural', notes: 'Maize was domesticated from teosinte in southwestern Mexico.' }, { order: 2, title: 'Nixtamal spreads across Mesoamerica', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: '1500 BCE onward', routeType: 'agricultural', notes: 'Lime-treated corn spread as the dietary staple of Mesoamerican civilizations.' }], convergenceRole: 'The structural and cultural foundation of every taco.', confidence: 'high', sourceNotes: ['Maize domestication is one of the most studied events in agricultural history.'] },
      { id: 'chili', ingredient: 'Chili peppers', role: 'Heat and flavor', origin: { name: 'Bolivia/Andean foothills', countryCode: 'BO', coordinates: [-64.9631, -16.2902] }, originPeriod: '7500 BCE', route: [{ order: 1, title: 'Chili domestication', location: { name: 'Mesoamerica', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: '5000 BCE', routeType: 'agricultural', notes: 'Multiple chili species were domesticated in the Americas; they were essential to Aztec cooking.' }], convergenceRole: 'Defines the heat profile and flavor identity of taco salsas and marinades.', confidence: 'high', sourceNotes: ['Chili use in Mesoamerican cuisine is well documented.'] },
      { id: 'cilantro', ingredient: 'Cilantro', role: 'Fresh herb garnish', origin: { name: 'Central Asia / Mediterranean', countryCode: 'IR', coordinates: [53.688, 32.4279] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Old World herb', location: { name: 'Persia/Mediterranean', countryCode: 'IR', coordinates: [53.688, 32.4279] }, period: 'Antiquity', routeType: 'trade', notes: 'Coriander is one of the oldest documented herbs in Old World cooking.' }, { order: 2, title: 'Spanish introduction to Americas', location: { name: 'New Spain', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: '16th century', routeType: 'colonial', notes: 'Cilantro arrived with the Spanish and was rapidly adopted into Mexican cooking.' }], convergenceRole: 'The post-colonial addition that now feels inseparable from the taco.', confidence: 'high', sourceNotes: ['Cilantro arrival via Spanish is well documented.'] }
    ],
    nameJourney: [
      { order: 1, name: 'tlaxcalli', languageOrCulture: 'Nahuatl', location: { name: 'Central Mexico', countryCode: 'MX', coordinates: [-99.1332, 19.4326] }, period: 'Pre-Columbian', notes: 'The Nahuatl word for the corn tortilla; the tortilla was the proto-taco.' },
      { order: 2, name: 'taco', languageOrCulture: 'Mexican Spanish', location: { name: 'Guanajuato/Mexico City', countryCode: 'MX', coordinates: [-101.2574, 21.019] }, period: '19th century', notes: 'The word taco applied to food appears in Mexican documents from the 19th century; earlier uses referred to plugs or charges.' }
    ],
    globalForces: ['Mesoamerican agriculture', 'Spanish colonization', 'US-Mexico migration', 'fast food industrialization'],
    sources: [{ id: 'taco-history', title: 'Taco history', note: 'Jeffrey Pilcher\'s "Planet Taco" is a key scholarly reference on the taco\'s origins and Americanization.' }],
    uncertainties: ['The exact etymological origin of "taco" as a food word is still debated.', 'Pre-colonial wrapped food practices vary widely across Mesoamerican cultures.']
  },

  'pasta': {
    dishName: 'Pasta',
    canonicalDishName: 'Pasta',
    dishType: 'Wheat dough noodle',
    plateLocation: { name: 'Naples / Sicily', countryCode: 'IT', coordinates: [14.2681, 40.8518] },
    convergenceThesis: 'Pasta\'s origins are genuinely multicultural: dried noodle traditions existed independently in China, the Arab world, and possibly ancient Rome. Arab traders brought dried pasta to Sicily in the 9th–12th centuries, where durum wheat cultivation made it practical to dry and ship. Italy industrialized pasta in the 19th century, and Italian immigrants made it a global staple in the 20th.',
    shareQuote: 'Italy didn\'t invent the noodle, but it did invent the world\'s relationship with one.',
    dishLineage: [
      { order: 1, ancestorName: 'Ancient grain pastes', stageTitle: 'Earliest dough-and-water foods', location: { name: 'Mediterranean / China', countryCode: 'IT', coordinates: [12.4964, 41.9028] }, period: 'Antiquity', transformation: 'Multiple ancient cultures created food from wetted grain dough pressed or dried into shapes.', routeType: 'agricultural', confidence: 'low', notes: 'Whether any direct lineage connects ancient Rome to modern pasta is debated.' },
      { order: 2, ancestorName: 'Arab itriyya', stageTitle: 'Dried noodle via Arab trade', location: { name: 'Sicily', countryCode: 'IT', coordinates: [14.0154, 37.5999] }, period: '9th–12th century', transformation: 'Arab traders and settlers in Sicily introduced dried noodles (itriyya) that could be stored and exported.', routeType: 'trade', confidence: 'high', notes: 'A 12th-century Arab geographer al-Idrisi describes pasta production near Palermo.' },
      { order: 3, ancestorName: 'Sicilian and southern Italian pasta', stageTitle: 'Durum wheat cultivation', location: { name: 'Gragnano', countryCode: 'IT', coordinates: [14.5231, 40.6942] }, period: '13th–15th century', transformation: 'Durum wheat—ideal for dried pasta due to its high gluten—was grown extensively in southern Italy, enabling commercial production.', routeType: 'agricultural', confidence: 'high', notes: 'Gragnano near Naples became a major pasta production center.' },
      { order: 4, ancestorName: 'Neapolitan pasta culture', stageTitle: 'Pasta as street food', location: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] }, period: '17th–18th century', transformation: 'Neapolitans became known as "mangiamaccheroni" (macaroni eaters); pasta was cheap, filling city food.', routeType: 'migration', confidence: 'high', notes: 'Pasta\'s association with Naples is well documented and fed the later Italian nationalist food identity.' },
      { order: 5, ancestorName: 'Industrial pasta', stageTitle: 'Global staple', location: { name: 'Milan / New York', countryCode: 'IT', coordinates: [9.19, 45.4654] }, period: '19th–20th century', transformation: 'Industrial extrusion and Italian emigration to the Americas spread pasta worldwide.', routeType: 'migration', confidence: 'high', notes: 'Italian-American immigrants popularized pasta in the US, where spaghetti and meatballs became a cultural icon.' }
    ],
    ingredients: [
      { id: 'durum-wheat', ingredient: 'Durum wheat (semolina)', role: 'Pasta dough', origin: { name: 'Fertile Crescent', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, originPeriod: '7000 BCE', route: [{ order: 1, title: 'Wheat domestication', location: { name: 'Levant', countryCode: 'IL', coordinates: [34.8516, 31.0461] }, period: '10,000 BCE', routeType: 'agricultural', notes: 'Emmer wheat was domesticated in the Fertile Crescent.' }, { order: 2, title: 'Durum develops in North Africa', location: { name: 'North Africa', countryCode: 'TN', coordinates: [9.5375, 33.8869] }, period: 'Ancient–medieval', routeType: 'agricultural', notes: 'Hard durum wheat was selectively developed and cultivated across North Africa and the Mediterranean.' }, { order: 3, title: 'Arab introduction to Sicily', location: { name: 'Sicily', countryCode: 'IT', coordinates: [14.0154, 37.5999] }, period: '9th century', routeType: 'trade', notes: 'Arab farmers expanded durum wheat cultivation in Sicily, enabling dried pasta.' }], convergenceRole: 'The specific wheat variety that makes dried pasta possible—its high protein content prevents the noodle from dissolving.', confidence: 'high', sourceNotes: ['Durum wheat cultivation in Sicily under Arab rule is historically established.'] },
      { id: 'eggs', ingredient: 'Eggs (for fresh pasta)', role: 'Binding and richness', origin: { name: 'Southeast Asia', countryCode: 'CN', coordinates: [104.1954, 35.8617] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Domestic chicken spreads west', location: { name: 'Mediterranean', countryCode: 'GR', coordinates: [21.8243, 39.0742] }, period: 'Antiquity', routeType: 'trade', notes: 'Domestic chickens reached Europe from Southeast Asia via trade routes.' }], convergenceRole: 'Egg-enriched pasta (like tagliatelle and pappardelle) defines northern Italian fresh pasta traditions.', confidence: 'high', sourceNotes: ['Fresh vs dried pasta regional differences are well documented.'] }
    ],
    nameJourney: [
      { order: 1, name: 'itriyya', languageOrCulture: 'Arabic', location: { name: 'Sicily', countryCode: 'IT', coordinates: [14.0154, 37.5999] }, period: '9th–12th century', notes: 'Arab term for dried noodle threads, documented in Sicily by al-Idrisi around 1154.' },
      { order: 2, name: 'laganum / lasagna', languageOrCulture: 'Latin / Italian', location: { name: 'Rome', countryCode: 'IT', coordinates: [12.4964, 41.9028] }, period: 'Antiquity–medieval', notes: 'Latin laganum referred to a flat dough; it is the probable ancestor of lasagna.' },
      { order: 3, name: 'pasta', languageOrCulture: 'Italian', location: { name: 'Naples', countryCode: 'IT', coordinates: [14.2681, 40.8518] }, period: 'Medieval onward', notes: 'Pasta derives from Late Latin pasta (dough, pastry), from Greek pastē.' }
    ],
    globalForces: ['Arab trade networks', 'durum wheat agriculture', 'Italian diaspora', 'industrial food production'],
    sources: [{ id: 'pasta-history', title: 'Pasta origins', note: 'The Arab introduction of dried pasta to Sicily is documented in al-Idrisi\'s 12th-century geographic text.' }],
    uncertainties: ['Whether Marco Polo brought pasta from China to Italy is a myth—pasta was already in Italy before his return.', 'Roman laganum\'s relationship to modern pasta is debated.']
  },

  'burger': {
    dishName: 'Hamburger',
    canonicalDishName: 'Hamburger',
    dishType: 'Ground beef sandwich',
    plateLocation: { name: 'New York / New Haven', countryCode: 'US', coordinates: [-74.006, 40.7128] },
    convergenceThesis: 'The hamburger assembled itself from a German minced beef tradition, American industrial meat processing, and the invention of the sandwich bun. It was industrialized by White Castle in the 1920s and globalized by McDonald\'s after WWII, becoming the most consumed food format on earth.',
    shareQuote: 'The hamburger is a German immigrant shaped by American industry and sold back to the world.',
    dishLineage: [
      { order: 1, ancestorName: 'Hamburg steak', stageTitle: 'German minced beef', location: { name: 'Hamburg', countryCode: 'DE', coordinates: [9.9937, 53.5511] }, period: '19th century', transformation: 'Hamburg was known for cheap minced beef patties sold in port areas; German emigrants carried the preparation to the US.', routeType: 'migration', confidence: 'high', notes: 'Hamburg steak appears on American menus by the 1830s–1850s.' },
      { order: 2, ancestorName: 'American steak tartare tradition', stageTitle: 'Raw to cooked transition', location: { name: 'New York', countryCode: 'US', coordinates: [-74.006, 40.7128] }, period: 'Mid-19th century', transformation: 'Minced beef was cooked into patties for restaurant menus and cheaper eating houses.', routeType: 'migration', confidence: 'medium', notes: 'The transition from raw Hamburg steak to cooked patty happened in American restaurants.' },
      { order: 3, ancestorName: 'The burger in a bun', stageTitle: 'Fair food invention', location: { name: 'St. Louis / New Haven', countryCode: 'US', coordinates: [-90.1994, 38.627] }, period: '1880s–1900s', transformation: 'Multiple claimants placed the beef patty inside bread rolls at fairs and lunch counters.', routeType: 'migration', confidence: 'medium', notes: 'Charlie Nagreen (1885), the Menches brothers (1885), and Louis Lassen (1900) all claim invention.' },
      { order: 4, ancestorName: 'White Castle', stageTitle: 'Industrial fast food', location: { name: 'Wichita', countryCode: 'US', coordinates: [-97.3308, 37.6922] }, period: '1921', transformation: 'White Castle standardized the small, cheap burger with a griddle process and chain replication.', routeType: 'trade', confidence: 'high', notes: 'White Castle was the first hamburger chain and established the fast food model.' },
      { order: 5, ancestorName: 'McDonald\'s', stageTitle: 'Global export', location: { name: 'San Bernardino', countryCode: 'US', coordinates: [-117.2948, 34.1083] }, period: '1940s–1970s', transformation: 'McDonald\'s Speedee Service System industrialized burger production and exported the format worldwide.', routeType: 'trade', confidence: 'high', notes: 'McDonald\'s global expansion from the 1970s onward made the burger the world\'s most recognized food.' }
    ],
    ingredients: [
      { id: 'beef', ingredient: 'Beef (ground)', role: 'Patty', origin: { name: 'Fertile Crescent', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, originPeriod: '8000 BCE', route: [{ order: 1, title: 'Cattle domestication', location: { name: 'Anatolia', countryCode: 'TR', coordinates: [35.2433, 38.9637] }, period: '8000 BCE', routeType: 'agricultural', notes: 'Cattle were domesticated in the Near East and spread across the Old World.' }, { order: 2, title: 'Hamburg beef preparation', location: { name: 'Hamburg', countryCode: 'DE', coordinates: [9.9937, 53.5511] }, period: '18th–19th century', routeType: 'trade', notes: 'Hamburg developed a tradition of minced/chopped beef, partly influenced by Baltic trade.' }, { order: 3, title: 'American cattle industry', location: { name: 'Chicago', countryCode: 'US', coordinates: [-87.6298, 41.8781] }, period: 'Late 19th century', routeType: 'trade', notes: 'Chicago\'s Union Stock Yards industrialized beef processing and made cheap ground beef widely available.' }], convergenceRole: 'The central protein without which the hamburger cannot exist.', confidence: 'high', sourceNotes: ['US beef industrialization in Chicago is well documented.'] },
      { id: 'bun', ingredient: 'Soft wheat bun', role: 'Bread carrier', origin: { name: 'Europe', countryCode: 'DE', coordinates: [10.4515, 51.1657] }, originPeriod: 'Medieval', route: [{ order: 1, title: 'European bread rolls', location: { name: 'Germany', countryCode: 'DE', coordinates: [10.4515, 51.1657] }, period: 'Medieval onward', routeType: 'agricultural', notes: 'Soft bread rolls were common in German bakery tradition.' }, { order: 2, title: 'American industrialized baking', location: { name: 'Midwest US', countryCode: 'US', coordinates: [-93.0977, 44.9537] }, period: 'Late 19th century', routeType: 'trade', notes: 'Industrial baking made uniform soft buns cheap enough for mass fast food use.' }], convergenceRole: 'The bun transforms the patty from a plate dish into a portable handheld food.', confidence: 'high', sourceNotes: ['The bun\'s role in the hamburger\'s portability is straightforward.'] }
    ],
    nameJourney: [
      { order: 1, name: 'Hamburger Steak', languageOrCulture: 'German-American', location: { name: 'New York', countryCode: 'US', coordinates: [-74.006, 40.7128] }, period: '1830s–1880s', notes: 'Referred to a cooked or raw minced beef patty, served with onions; no bread involved.' },
      { order: 2, name: 'Hamburger (sandwich)', languageOrCulture: 'American English', location: { name: 'United States', countryCode: 'US', coordinates: [-95.7129, 37.0902] }, period: '1890s–1900s', notes: 'The word hamburger transferred from the steak preparation to the bun-enclosed sandwich.' }
    ],
    globalForces: ['German emigration', 'American industrialization', 'post-WWII US cultural export', 'fast food globalization'],
    sources: [{ id: 'burger-history', title: 'Hamburger origins', note: 'Multiple towns claim hamburger invention; the German Hamburg steak origin is well established.' }],
    uncertainties: ['The exact first American hamburger-in-a-bun is genuinely contested among multiple claimants.']
  },

  'pad thai': {
    dishName: 'Pad Thai',
    canonicalDishName: 'Phat Thai',
    dishType: 'Stir-fried rice noodles',
    plateLocation: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] },
    convergenceThesis: 'Pad Thai is a deliberate nationalist invention. In the 1930s–40s, the Thai government promoted stir-fried rice noodles to replace rice consumption during wartime shortage, build a national dish identity, and support Chinese-Thai noodle vendors. Its ingredients—rice noodles, tamarind, fish sauce—draw from Chinese, Indian, and Southeast Asian trade networks.',
    shareQuote: 'Pad Thai is Thailand\'s national dish because a 1940s government decided it should be.',
    dishLineage: [
      { order: 1, ancestorName: 'Chinese stir-fry technique', stageTitle: 'Wok cooking enters Thailand', location: { name: 'Southern China', countryCode: 'CN', coordinates: [113.2644, 23.1291] }, period: '13th–19th century', transformation: 'Chinese immigrants to Thailand (especially Teochew) brought wok-based stir-frying technique and noodle traditions.', routeType: 'migration', confidence: 'high', notes: 'Stir-frying is a Chinese technique; the wok itself arrived with Chinese immigrants.' },
      { order: 2, ancestorName: 'Sen chan noodle dishes', stageTitle: 'Thai-Chinese noodle food', location: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] }, period: 'Early 20th century', transformation: 'Chinese-Thai vendors sold various noodle dishes in Bangkok\'s market culture.', routeType: 'trade', confidence: 'high', notes: 'Bangkok\'s Chinatown (Yaowarat) was already a noodle-cooking hub before Pad Thai\'s promotion.' },
      { order: 3, ancestorName: 'Wartime nationalism', stageTitle: 'Government-mandated dish', location: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] }, period: '1938–1944', transformation: 'Field Marshal Plaek Phibunsongkhram\'s government promoted phat thai to reduce rice consumption and forge national identity.', routeType: 'migration', confidence: 'high', notes: 'The promotion included recipes distributed through government campaigns and subsidized noodle carts.' },
      { order: 4, ancestorName: 'Phat thai as street food', stageTitle: 'Bangkok street staple', location: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] }, period: '1950s–1990s', transformation: 'Having been promoted, phat thai became genuinely embedded in Thai street food culture.', routeType: 'trade', confidence: 'high', notes: 'From government policy to authentic street food tradition in one generation.' },
      { order: 5, ancestorName: 'Thai restaurant export', stageTitle: 'Global Thai cuisine', location: { name: 'Los Angeles / London', countryCode: 'US', coordinates: [-118.2437, 34.0522] }, period: '1980s–2000s', transformation: 'Thai diaspora restaurants made pad thai the flagship dish of global Thai cuisine.', routeType: 'migration', confidence: 'high', notes: 'Thailand actively promoted its cuisine internationally from the 1990s ("Global Thai" program).' }
    ],
    ingredients: [
      { id: 'rice-noodles', ingredient: 'Rice noodles (sen chan)', role: 'Noodle base', origin: { name: 'Southern China', countryCode: 'CN', coordinates: [113.2644, 23.1291] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Chinese rice noodle tradition', location: { name: 'Guangdong', countryCode: 'CN', coordinates: [113.2644, 23.1291] }, period: 'Ancient–medieval', routeType: 'agricultural', notes: 'Rice noodles are a southern Chinese tradition that spread through Southeast Asia with migration.' }, { order: 2, title: 'Teochew vendors in Bangkok', location: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] }, period: '19th–20th century', routeType: 'migration', notes: 'Chinese-Thai Teochew communities ran noodle shops in Bangkok.' }], convergenceRole: 'The dietary base of the dish; chosen over rice as part of the nationalist policy.', confidence: 'high', sourceNotes: ['Rice noodle use in Thai-Chinese cooking is well established.'] },
      { id: 'tamarind', ingredient: 'Tamarind', role: 'Sour-sweet flavoring', origin: { name: 'East Africa / South Asia', countryCode: 'IN', coordinates: [78.9629, 20.5937] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Tamarind in South Asia', location: { name: 'India', countryCode: 'IN', coordinates: [78.9629, 20.5937] }, period: 'Ancient', routeType: 'agricultural', notes: 'Tamarind is native to tropical Africa but was cultivated early in the Indian subcontinent.' }, { order: 2, title: 'Indian Ocean trade to Southeast Asia', location: { name: 'Thailand', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: 'Medieval', routeType: 'sea', notes: 'Tamarind traveled to Southeast Asia via Indian Ocean trade.' }], convergenceRole: 'Provides pad thai\'s distinctive sour-sweet undertone that differentiates it from Chinese stir-fries.', confidence: 'high', sourceNotes: ['Tamarind use in Thai cooking via Indian Ocean trade is well established.'] },
      { id: 'fish-sauce', ingredient: 'Fish sauce (nam pla)', role: 'Salty umami seasoning', origin: { name: 'Southeast Asia / ancient Mediterranean', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Fermented fish liquid tradition', location: { name: 'Southeast Asia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: 'Ancient', routeType: 'agricultural', notes: 'Fermented fish liquids were independently developed across Southeast Asia and ancient Rome (garum).' }], convergenceRole: 'Provides the deeply savory Southeast Asian flavor profile that grounds pad thai as a Thai—not Chinese—dish.', confidence: 'high', sourceNotes: ['Fish sauce is central to Southeast Asian cooking.'] }
    ],
    nameJourney: [
      { order: 1, name: 'phat thai (ผัดไทย)', languageOrCulture: 'Thai', location: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] }, period: '1940s', notes: 'Literally "Thai stir-fry"—the name itself was part of the nationalist project; the "Thai" in the name was new and deliberate.' }
    ],
    globalForces: ['Chinese migration to Southeast Asia', 'Thai nationalism', 'Indian Ocean spice trade', 'Thai diaspora'],
    sources: [{ id: 'pad-thai-history', title: 'Pad Thai nationalism', note: 'The nationalist origins of pad thai are documented by food historian Penny Van Esterik and others.' }],
    uncertainties: ['Pre-1940s antecedent dishes are not precisely identified; the government promotion built on an existing noodle culture.']
  },

  'biryani': {
    dishName: 'Biryani',
    canonicalDishName: 'Biryani',
    dishType: 'Layered rice and meat dish',
    plateLocation: { name: 'Hyderabad / Lucknow', countryCode: 'IN', coordinates: [78.4867, 17.385] },
    convergenceThesis: 'Biryani synthesizes Persian pilaf technique, Central Asian spice knowledge, and South Asian aromatics under Mughal imperial kitchens. Two distinct schools emerged: Hyderabadi (raw meat layered with rice, slow-cooked) and Lucknawi (pre-cooked meat layered, dum-sealed). Both represent the full expression of Mughal court cuisine meeting South Asian ingredients.',
    shareQuote: 'Biryani is the Mughal empire on a plate—Persian technique, Central Asian spice, Indian soil.',
    dishLineage: [
      { order: 1, ancestorName: 'Persian pilaf (polow)', stageTitle: 'Rice pilaf technique', location: { name: 'Persia', countryCode: 'IR', coordinates: [53.688, 32.4279] }, period: 'Medieval', transformation: 'Persians developed layered rice cooking—parboiling, then steaming with fat and aromatics.', routeType: 'trade', confidence: 'high', notes: 'The layered rice technique that defines biryani has clear Persian origins.' },
      { order: 2, ancestorName: 'Central Asian qabili', stageTitle: 'Mughal court rice', location: { name: 'Samarkand / Kabul', countryCode: 'UZ', coordinates: [66.9597, 39.6270] }, period: '14th–16th century', transformation: 'Timurid and early Mughal courts combined Persian pilaf with Central Asian spiced meat preparations.', routeType: 'migration', confidence: 'high', notes: 'Mughal emperors Babur and Humayun brought Central Asian food culture to India.' },
      { order: 3, ancestorName: 'Mughal court biryani', stageTitle: 'Imperial kitchens', location: { name: 'Delhi / Agra', countryCode: 'IN', coordinates: [77.1025, 28.7041] }, period: '16th–17th century', transformation: 'Mughal imperial cooks fused Persian layering with Indian basmati, saffron, and local aromatics.', routeType: 'migration', confidence: 'high', notes: 'The Ain-i-Akbari (1590s) documents elaborate rice-and-meat dishes in Akbar\'s court.' },
      { order: 4, ancestorName: 'Hyderabadi biryani', stageTitle: 'Deccan refinement', location: { name: 'Hyderabad', countryCode: 'IN', coordinates: [78.4867, 17.385] }, period: '17th–18th century', transformation: 'The Nizams of Hyderabad developed the kacchi (raw) biryani style with distinctive Deccan spicing.', routeType: 'migration', confidence: 'high', notes: 'Hyderabadi biryani is one of the most distinctive regional styles with documented court origins.' },
      { order: 5, ancestorName: 'Lucknawi (Awadhi) biryani', stageTitle: 'Dum cooking refinement', location: { name: 'Lucknow', countryCode: 'IN', coordinates: [80.9462, 26.8467] }, period: '18th–19th century', transformation: 'Awadhi cooks perfected dum pukht (slow-sealed cooking), using pre-cooked meat layered with aromatic rice.', routeType: 'migration', confidence: 'high', notes: 'Lucknow\'s nawabi culinary tradition emphasized subtlety and fragrance over intensity.' }
    ],
    ingredients: [
      { id: 'basmati', ingredient: 'Basmati rice', role: 'Aromatic long-grain base', origin: { name: 'Himalayan foothills', countryCode: 'IN', coordinates: [77.5, 30.0] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Himalayan rice cultivation', location: { name: 'Punjab/Uttarakhand', countryCode: 'IN', coordinates: [76.7794, 30.9010] }, period: 'Ancient', routeType: 'agricultural', notes: 'Basmati rice grew in the Himalayan foothills; the name means "fragrant" in Sanskrit.' }], convergenceRole: 'The long-grain aromatics and non-stickiness make basmati essential to the layered biryani structure.', confidence: 'high', sourceNotes: ['Basmati cultivation in the Himalayan foothills is well established.'] },
      { id: 'saffron', ingredient: 'Saffron', role: 'Color and aroma', origin: { name: 'Persia / Greece', countryCode: 'IR', coordinates: [53.688, 32.4279] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Saffron cultivation in Persia', location: { name: 'Khorasan', countryCode: 'IR', coordinates: [59.5626, 35.8997] }, period: 'Ancient–medieval', routeType: 'agricultural', notes: 'Persia was the dominant saffron producer and exporter in the medieval world.' }, { order: 2, title: 'Mughal court luxury', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.1025, 28.7041] }, period: '16th century', routeType: 'trade', notes: 'Saffron was a court luxury used to color and perfume Mughal rice dishes.' }], convergenceRole: 'Gives biryani its golden color and floral fragrance; marks the dish as court-level cooking.', confidence: 'high', sourceNotes: ['Saffron in Mughal cooking is documented in historical sources.'] },
      { id: 'whole-spices', ingredient: 'Whole spices (cardamom, cloves, cinnamon)', role: 'Aromatic foundation', origin: { name: 'South and Southeast Asia', countryCode: 'IN', coordinates: [78.9629, 20.5937] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Malabar spice coast', location: { name: 'Kerala', countryCode: 'IN', coordinates: [76.2711, 10.8505] }, period: 'Ancient', routeType: 'sea', notes: 'Cardamom and black pepper were native to the Malabar coast.' }, { order: 2, title: 'Spice Islands cloves', location: { name: 'Maluku Islands', countryCode: 'ID', coordinates: [128.1832, -3.2385] }, period: 'Ancient', routeType: 'sea', notes: 'Cloves are native to the Maluku Islands and traveled via ancient maritime trade.' }, { order: 3, title: 'Arab and Persian spice trade', location: { name: 'Baghdad', countryCode: 'IQ', coordinates: [44.3661, 33.3152] }, period: 'Medieval', routeType: 'trade', notes: 'Arab traders controlled the Indian Ocean spice trade and brought these aromatics to Mughal-era kitchens.' }], convergenceRole: 'The whole-spice layering is what separates biryani from plain rice pilaf.', confidence: 'high', sourceNotes: ['Spice trade routes are among the best-documented in world history.'] }
    ],
    nameJourney: [
      { order: 1, name: 'beriani / birian', languageOrCulture: 'Persian', location: { name: 'Persia', countryCode: 'IR', coordinates: [53.688, 32.4279] }, period: 'Medieval', notes: 'Possibly from Persian "biriyan" (fried/roasted before cooking) or "birinj" (rice); exact etymology is debated.' },
      { order: 2, name: 'biryani', languageOrCulture: 'Urdu/Hindi', location: { name: 'Delhi', countryCode: 'IN', coordinates: [77.1025, 28.7041] }, period: 'Mughal period', notes: 'The Urdu form that standardized across South Asian courtly and then popular use.' }
    ],
    globalForces: ['Mughal empire', 'Persian influence', 'Indian Ocean spice trade', 'South Asian diaspora'],
    sources: [{ id: 'biryani-history', title: 'Biryani and Mughal cuisine', note: 'The Ain-i-Akbari and other Mughal-era documents describe elaborate rice and meat preparations.' }],
    uncertainties: ['The exact etymology of biryani is debated among scholars.', 'The precise moment biryani was codified as distinct from pilaf is not documented.']
  },

  'hummus': {
    dishName: 'Hummus',
    canonicalDishName: 'Hummus bi Tahini',
    dishType: 'Chickpea and sesame dip',
    plateLocation: { name: 'Levant (Lebanon/Israel/Syria)', countryCode: 'LB', coordinates: [35.5018, 33.8938] },
    convergenceThesis: 'Hummus bi tahini—the creamy chickpea-and-sesame dip—synthesizes two ancient ingredients: chickpeas from the Fertile Crescent (cultivated for over 9,000 years) and sesame from East Africa and South Asia. The dish appears in medieval Arab cookbooks, traveled with Arab and Ottoman food culture across the Levant, and became globally familiar through Lebanese diaspora restaurants.',
    shareQuote: 'Hummus is what happens when the world\'s oldest farmed legume meets a 5,000-year-old sesame paste.',
    dishLineage: [
      { order: 1, ancestorName: 'Neolithic chickpea farming', stageTitle: 'Levantine legume cultivation', location: { name: 'Fertile Crescent', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, period: '7500 BCE', transformation: 'Chickpeas were among the earliest farmed plants in the Fertile Crescent and became a dietary staple.', routeType: 'agricultural', confidence: 'high', notes: 'Chickpea cultivation is archaeologically documented in the Levant from 7500 BCE.' },
      { order: 2, ancestorName: 'Medieval Arab pureed legumes', stageTitle: 'Mashed chickpea preparations', location: { name: 'Baghdad / Syria', countryCode: 'IQ', coordinates: [44.3661, 33.3152] }, period: '13th century', transformation: 'Medieval Arab cookbooks describe pureed chickpeas with vinegar and spices, related to but distinct from modern hummus.', routeType: 'trade', confidence: 'medium', notes: 'A 13th-century Cairo cookbook contains a chickpea-and-vinegar preparation; the tahini form is documented later.' },
      { order: 3, ancestorName: 'Ottoman Levantine cuisine', stageTitle: 'Hummus bi tahini emerges', location: { name: 'Damascus / Beirut', countryCode: 'SY', coordinates: [36.2765, 33.5138] }, period: '18th–19th century', transformation: 'The combination of chickpeas, tahini, lemon, and garlic became codified as a standard Levantine meze.', routeType: 'migration', confidence: 'medium', notes: 'The exact date hummus bi tahini was standardized is not well documented; it appears in 19th-century sources.' },
      { order: 4, ancestorName: 'Lebanese restaurant hummus', stageTitle: 'Diaspora globalization', location: { name: 'Beirut / New York', countryCode: 'LB', coordinates: [35.5018, 33.8938] }, period: '20th century', transformation: 'Lebanese emigrants carried hummus to the Americas and Europe; industrial production followed.', routeType: 'migration', confidence: 'high', notes: 'Hummus became a mainstream supermarket product in the US by the 1990s–2000s.' }
    ],
    ingredients: [
      { id: 'chickpeas', ingredient: 'Chickpeas', role: 'Base', origin: { name: 'Fertile Crescent', countryCode: 'TR', coordinates: [35.2433, 38.9637] }, originPeriod: '7500 BCE', route: [{ order: 1, title: 'Neolithic domestication', location: { name: 'Southern Turkey/Syria', countryCode: 'TR', coordinates: [36.1, 37.1] }, period: '7500 BCE', routeType: 'agricultural', notes: 'Chickpeas are among the earliest domesticated legumes.' }, { order: 2, title: 'Mediterranean spread', location: { name: 'Mediterranean basin', countryCode: 'GR', coordinates: [21.8243, 39.0742] }, period: 'Antiquity', routeType: 'trade', notes: 'Chickpeas spread through the Mediterranean and became central to Middle Eastern and Mediterranean diets.' }], convergenceRole: 'The protein-rich base that defines hummus\'s texture and nutrition.', confidence: 'high', sourceNotes: ['Chickpea domestication is archaeologically established.'] },
      { id: 'tahini', ingredient: 'Tahini (sesame paste)', role: 'Creamy fat element', origin: { name: 'East Africa / South Asia', countryCode: 'ET', coordinates: [40.4897, 9.145] }, originPeriod: '3500 BCE', route: [{ order: 1, title: 'Sesame domestication', location: { name: 'Africa / India', countryCode: 'ET', coordinates: [40.4897, 9.145] }, period: '3500 BCE', routeType: 'agricultural', notes: 'Sesame was domesticated in Africa and/or the Indian subcontinent; it is one of the oldest known oil seeds.' }, { order: 2, title: 'Sesame in Mesopotamia', location: { name: 'Mesopotamia', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, period: '2500 BCE onward', routeType: 'trade', notes: 'Sesame oil and paste appear in Mesopotamian records from 2500 BCE.' }, { order: 3, title: 'Tahini in Levantine cuisine', location: { name: 'Levant', countryCode: 'LB', coordinates: [35.5018, 33.8938] }, period: 'Medieval onward', routeType: 'trade', notes: 'Tahini became a staple condiment and paste across the eastern Mediterranean.' }], convergenceRole: 'The ingredient that transforms mashed chickpeas into the smooth, rich dip.', confidence: 'high', sourceNotes: ['Sesame\'s ancient cultivation is well documented.'] },
      { id: 'lemon', ingredient: 'Lemon', role: 'Acid and brightness', origin: { name: 'South Asia (Assam/Burma)', countryCode: 'IN', coordinates: [92.9376, 26.2006] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Citrus in South Asia', location: { name: 'Assam/Burma', countryCode: 'IN', coordinates: [92.9376, 26.2006] }, period: 'Ancient', routeType: 'agricultural', notes: 'Lemons likely originated as a hybrid in South/Southeast Asia.' }, { order: 2, title: 'Arab trade westward', location: { name: 'Persia / Middle East', countryCode: 'IR', coordinates: [53.688, 32.4279] }, period: '10th century', routeType: 'trade', notes: 'Arab traders spread lemon cultivation across the Middle East and Mediterranean.' }], convergenceRole: 'Provides the acidity that lifts hummus from heavy paste to bright dip.', confidence: 'high', sourceNotes: ['Lemon introduction to the Middle East via Arab trade is established.'] }
    ],
    nameJourney: [
      { order: 1, name: 'hummus (حُمُّص)', languageOrCulture: 'Arabic', location: { name: 'Levant', countryCode: 'LB', coordinates: [35.5018, 33.8938] }, period: 'Medieval', notes: 'Hummus simply means "chickpea" in Arabic. The full name hummus bi tahini (chickpeas with sesame paste) is typically shortened.' }
    ],
    globalForces: ['Neolithic agriculture', 'Arab trade networks', 'Ottoman empire', 'Lebanese diaspora'],
    sources: [{ id: 'hummus-history', title: 'Hummus origins', note: 'Medieval Arab cookbooks and Ottoman records are the primary documentary sources for hummus history.' }],
    uncertainties: ['The exact date hummus bi tahini was first combined in its current form is unknown.', 'Ownership claims between Lebanon and Israel are politically charged and not historically resolvable.']
  },

  'croissant': {
    dishName: 'Croissant',
    canonicalDishName: 'Croissant',
    dishType: 'Laminated butter pastry',
    plateLocation: { name: 'Paris', countryCode: 'FR', coordinates: [2.3522, 48.8566] },
    convergenceThesis: 'The croissant is a French pastry built on an Austrian kifli/kipferl tradition that Viennese bakers brought to Paris in the 19th century. French pastry chefs transformed it through laminated dough technique—folding butter into the dough repeatedly—creating the flaky, rich croissant. It became the symbol of French baking through industrialization and café culture.',
    shareQuote: 'The croissant is Austrian by shape, French by butter, and now the world\'s most recognized breakfast pastry.',
    dishLineage: [
      { order: 1, ancestorName: 'Ottoman siege of Vienna (kipferl mythology)', stageTitle: 'The crescent origin legend', location: { name: 'Vienna', countryCode: 'AT', coordinates: [16.3738, 48.2082] }, period: '1683 (legend)', transformation: 'A popular but largely mythological story claims Viennese bakers celebrated the defeat of the Ottoman siege by making crescent-shaped bread mocking the Ottoman flag.', routeType: 'migration', confidence: 'low', notes: 'The 1683 origin story is repeated widely but lacks contemporary documentation.' },
      { order: 2, ancestorName: 'Austrian kipferl', stageTitle: 'Crescent-shaped bread roll', location: { name: 'Vienna', countryCode: 'AT', coordinates: [16.3738, 48.2082] }, period: '17th–18th century', transformation: 'The kipferl—a crescent-shaped bread or pastry—was established in Austrian baking traditions.', routeType: 'agricultural', confidence: 'high', notes: 'Kipferl are documented in Austrian baking before the French croissant.' },
      { order: 3, ancestorName: 'Viennoiserie in Paris', stageTitle: 'Viennese bakery opens in Paris', location: { name: 'Paris', countryCode: 'FR', coordinates: [2.3522, 48.8566] }, period: '1838–1840', transformation: 'August Zang, an Austrian entrepreneur, opened a Viennese bakery in Paris, introducing kipferl and other Austrian pastries.', routeType: 'migration', confidence: 'high', notes: 'Zang\'s bakery is documented in Parisian sources from the late 1830s.' },
      { order: 4, ancestorName: 'French laminated croissant', stageTitle: 'Butter-laminated pastry', location: { name: 'Paris', countryCode: 'FR', coordinates: [2.3522, 48.8566] }, period: '1850s–1900s', transformation: 'French bakers transformed the doughy kipferl into a flaky, layered pastry by applying pâte feuilletée (laminated dough) technique.', routeType: 'trade', confidence: 'high', notes: 'The buttery, flaky croissant we know today is a French modification of the Austrian shape.' },
      { order: 5, ancestorName: 'Industrial croissant', stageTitle: 'Mass production and global export', location: { name: 'Paris / Global', countryCode: 'FR', coordinates: [2.3522, 48.8566] }, period: '20th century', transformation: 'Industrial production and French café culture made the croissant a global breakfast symbol.', routeType: 'trade', confidence: 'high', notes: 'Frozen croissant dough industrialized in France in the 1970s enabled global distribution.' }
    ],
    ingredients: [
      { id: 'butter', ingredient: 'High-fat butter', role: 'Lamination fat', origin: { name: 'Normandy / Northern Europe', countryCode: 'FR', coordinates: [0.1313, 49.1829] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'European dairy farming', location: { name: 'Northern Europe', countryCode: 'FR', coordinates: [2.3522, 48.8566] }, period: 'Neolithic onward', routeType: 'agricultural', notes: 'Butter-making is native to European dairy farming traditions.' }, { order: 2, title: 'Normandy butter excellence', location: { name: 'Normandy', countryCode: 'FR', coordinates: [0.1313, 49.1829] }, period: '18th–19th century', routeType: 'agricultural', notes: 'Normandy developed a reputation for high-butterfat churned butter essential to French pastry.' }], convergenceRole: 'The defining ingredient of the French croissant; the lamination process builds the flaky layers.', confidence: 'high', sourceNotes: ['French butter\'s role in croissant lamination is well established.'] },
      { id: 'wheat-flour', ingredient: 'Soft wheat flour', role: 'Dough base', origin: { name: 'Fertile Crescent', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, originPeriod: '10,000 BCE', route: [{ order: 1, title: 'Wheat across Europe', location: { name: 'Central Europe', countryCode: 'AT', coordinates: [14.5501, 47.5162] }, period: 'Neolithic', routeType: 'agricultural', notes: 'Wheat cultivation spread across Europe with Neolithic farmers.' }], convergenceRole: 'The structural base that holds the laminated butter layers.', confidence: 'high', sourceNotes: ['Wheat\'s central role in European bread is well established.'] }
    ],
    nameJourney: [
      { order: 1, name: 'kipferl', languageOrCulture: 'Austrian German', location: { name: 'Vienna', countryCode: 'AT', coordinates: [16.3738, 48.2082] }, period: '17th–18th century', notes: 'The Austrian crescent-shaped ancestor; still made today in Austria.' },
      { order: 2, name: 'croissant', languageOrCulture: 'French', location: { name: 'Paris', countryCode: 'FR', coordinates: [2.3522, 48.8566] }, period: '19th century', notes: 'From French croissant (crescent), describing the shape of the pastry.' }
    ],
    globalForces: ['Austrian-French cultural exchange', 'French culinary prestige', 'industrial food production'],
    sources: [{ id: 'croissant-history', title: 'Croissant origins', note: 'August Zang\'s Viennese bakery in Paris (c.1838) is the documented origin point of the French croissant.' }],
    uncertainties: ['The 1683 Ottoman siege origin story lacks contemporary documentation and is likely a later myth.', 'The exact French baker who first laminated the dough is unknown.']
  },

  'fish and chips': {
    dishName: 'Fish and Chips',
    canonicalDishName: 'Fish and Chips',
    dishType: 'Battered fried fish with fried potato',
    plateLocation: { name: 'London / Yorkshire', countryCode: 'GB', coordinates: [-0.1276, 51.5072] },
    convergenceThesis: 'Fish and chips assembled from two immigrant food traditions: Sephardic Jewish fried fish (brought to England in the 17th century) and Belgian/French fried potatoes. They merged in 1860s Britain as a cheap working-class meal and industrial chips technology scaled production. The dish became Britain\'s most iconic street food and wartime morale food.',
    shareQuote: 'Fish and chips is Britain\'s national dish, invented by Jewish and Belgian immigrants.',
    dishLineage: [
      { order: 1, ancestorName: 'Sephardic fried fish (pescado frito)', stageTitle: 'Jewish cold-battered fish', location: { name: 'London (East End)', countryCode: 'GB', coordinates: [-0.0577, 51.5155] }, period: '17th century', transformation: 'Sephardic Jews expelled from Iberia brought the tradition of cold-fried fish in batter to Britain; it was sold from street barrows.', routeType: 'migration', confidence: 'high', notes: 'Dickens references fried fish warehouses in London; the Sephardic Jewish connection is documented.' },
      { order: 2, ancestorName: 'Continental fried potato', stageTitle: 'Belgian/French frites', location: { name: 'Belgium / Northern France', countryCode: 'BE', coordinates: [4.4699, 50.5039] }, period: '18th century', transformation: 'Fried potato strips became street food in Belgium and northern France; Belgian immigrants brought them to Britain.', routeType: 'migration', confidence: 'medium', notes: 'The Belgian claim to inventing frites before France is documented but disputed.' },
      { order: 3, ancestorName: 'First fish and chip shop', stageTitle: 'Combination emerges', location: { name: 'London or Mossley (Lancashire)', countryCode: 'GB', coordinates: [-2.0391, 53.5137] }, period: '1860s', transformation: 'The pairing of fried fish with fried potato chips in a single shop established the format.', routeType: 'migration', confidence: 'medium', notes: 'Joseph Malin (London, 1860) and John Lees (Mossley, 1863) both claim first fish-and-chip shop.' },
      { order: 4, ancestorName: 'Industrial fish and chips', stageTitle: 'Working-class staple', location: { name: 'Northern England', countryCode: 'GB', coordinates: [-1.5491, 53.8008] }, period: 'Late 19th century', transformation: 'Steam trawlers increased fish supply; railway networks distributed potatoes; chip shops spread across industrial cities.', routeType: 'trade', confidence: 'high', notes: 'By 1910, there were 25,000 fish and chip shops in Britain.' }
    ],
    ingredients: [
      { id: 'cod-or-haddock', ingredient: 'Cod or Haddock', role: 'Fish fillet', origin: { name: 'North Atlantic', countryCode: 'GB', coordinates: [-20.0, 65.0] }, originPeriod: 'Ancient fishing', route: [{ order: 1, title: 'North Sea fishing', location: { name: 'North Sea', countryCode: 'GB', coordinates: [3.0, 56.0] }, period: 'Medieval', routeType: 'sea', notes: 'Cod and haddock were primary targets of British North Sea fishing.' }, { order: 2, title: 'Steam trawler industrialization', location: { name: 'Hull / Grimsby', countryCode: 'GB', coordinates: [-0.3367, 53.7457] }, period: '1880s', routeType: 'trade', notes: 'Steam-powered trawlers massively increased the volume and range of British fish catches.' }], convergenceRole: 'The white-fleshed fish that holds batter well and became the standard for chip shops.', confidence: 'high', sourceNotes: ['North Sea cod and haddock fishing history is well documented.'] },
      { id: 'potato', ingredient: 'Potato', role: 'Chips', origin: { name: 'Andes', countryCode: 'PE', coordinates: [-75.0152, -9.189] }, originPeriod: '7000–8000 BCE', route: [{ order: 1, title: 'Andean domestication', location: { name: 'Peru/Bolivia', countryCode: 'PE', coordinates: [-75.0152, -9.189] }, period: '7000 BCE', routeType: 'agricultural', notes: 'Potato was domesticated in the Andes.' }, { order: 2, title: 'Spanish introduction to Europe', location: { name: 'Spain', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: 'Late 16th century', routeType: 'colonial', notes: 'Spanish returned potatoes from South America; they spread slowly across Europe.' }, { order: 3, title: 'British potato adoption', location: { name: 'Ireland / Britain', countryCode: 'GB', coordinates: [-6.2603, 53.3498] }, period: '17th–18th century', routeType: 'agricultural', notes: 'Potato became a staple crop in Ireland and northern Britain.' }], convergenceRole: 'The Columbian Exchange ingredient that gave fish and chips its carbohydrate foundation.', confidence: 'high', sourceNotes: ['Potato\'s Andean origin and European spread are well established.'] }
    ],
    nameJourney: [
      { order: 1, name: 'pescado frito', languageOrCulture: 'Sephardic Judeo-Spanish (Ladino)', location: { name: 'London', countryCode: 'GB', coordinates: [-0.1276, 51.5072] }, period: '17th century', notes: 'The Sephardic Jewish fried fish preparation that preceded fish and chips.' },
      { order: 2, name: 'fish and chips', languageOrCulture: 'British English', location: { name: 'Northern England', countryCode: 'GB', coordinates: [-1.5491, 53.8008] }, period: '1860s onward', notes: 'The combined street food name that established the canonical British dish.' }
    ],
    globalForces: ['Sephardic Jewish migration', 'Columbian Exchange', 'industrial fishing', 'British working-class food culture'],
    sources: [{ id: 'fish-chips-history', title: 'Fish and chips origins', note: 'Panikos Panayi\'s research on immigrant food in Britain documents the Jewish and Belgian contributions to fish and chips.' }],
    uncertainties: ['Whether Joseph Malin or John Lees first opened a combined fish-and-chip shop is unresolved.']
  },

  'pho': {
    dishName: 'Pho',
    canonicalDishName: 'Phở',
    dishType: 'Rice noodle soup with beef or chicken',
    plateLocation: { name: 'Nam Dinh / Hanoi', countryCode: 'VN', coordinates: [105.8412, 21.0285] },
    convergenceThesis: 'Pho emerged at the intersection of Vietnamese rice noodle traditions and French colonial beef consumption. Before French colonization, cattle were draft animals rarely eaten; the French introduced the habit of beef broth and slaughter, while Chinese laborers contributed noodle and anise-spiced soup techniques. The dish coalesced in northern Vietnam around 1900 and was transformed again by Vietnamese refugees who brought it worldwide after 1975.',
    shareQuote: 'Pho is what colonialism left behind when it turned a draft animal into a bowl of soup.',
    dishLineage: [
      { order: 1, ancestorName: 'Vietnamese rice noodle soups', stageTitle: 'Indigenous noodle broth tradition', location: { name: 'Red River Delta', countryCode: 'VN', coordinates: [106.0, 20.5] }, period: 'Pre-colonial', transformation: 'Vietnamese cooking already included rice noodle soups; fish and vegetable broths were staples.', routeType: 'agricultural', confidence: 'medium', notes: 'Pre-pho rice noodle soups existed but beef was not central to Vietnamese diet.' },
      { order: 2, ancestorName: 'French pot-au-feu influence', stageTitle: 'Beef broth via colonialism', location: { name: 'Hanoi', countryCode: 'VN', coordinates: [105.8412, 21.0285] }, period: '1880s–1900s', transformation: 'French colonizers introduced beef consumption and slaughterhouse infrastructure; Vietnamese cooks began using beef bones for broth.', routeType: 'colonial', confidence: 'high', notes: 'The French connection (pot-au-feu → pho) is a primary scholarly thesis, though the degree of influence is debated.' },
      { order: 3, ancestorName: 'Chinese xao trau influence', stageTitle: 'Chinese noodle soup techniques', location: { name: 'Nam Dinh', countryCode: 'VN', coordinates: [106.1683, 20.4138] }, period: 'Early 20th century', transformation: 'Chinese laborers in the textile industry near Nam Dinh contributed noodle soup traditions using star anise.', routeType: 'migration', confidence: 'medium', notes: 'Nam Dinh is traditionally cited as pho\'s birthplace; Chinese worker influence is noted in local histories.' },
      { order: 4, ancestorName: 'Hanoi pho', stageTitle: 'Northern style codified', location: { name: 'Hanoi', countryCode: 'VN', coordinates: [105.8412, 21.0285] }, period: '1920s–1954', transformation: 'Pho bò (beef pho) became a Hanoi street food staple; the clear, delicate northern broth style was established.', routeType: 'migration', confidence: 'high', notes: 'Pho is documented as a street food in Hanoi by the 1920s.' },
      { order: 5, ancestorName: 'Southern pho and diaspora', stageTitle: 'Refugee globalization', location: { name: 'Saigon / Los Angeles', countryCode: 'VN', coordinates: [106.6297, 10.8231] }, period: '1954–1980s', transformation: 'Partition brought northern pho cooks to Saigon, creating a richer southern style; 1975 refugees carried both styles worldwide.', routeType: 'migration', confidence: 'high', notes: 'The Vietnamese refugee diaspora established pho restaurants across North America, France, and Australia.' }
    ],
    ingredients: [
      { id: 'rice-noodles-pho', ingredient: 'Bánh phở (flat rice noodles)', role: 'Noodle base', origin: { name: 'Southern China / Vietnam', countryCode: 'VN', coordinates: [108.2772, 14.0583] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Chinese rice noodle tradition', location: { name: 'Southern China', countryCode: 'CN', coordinates: [113.2644, 23.1291] }, period: 'Ancient–medieval', routeType: 'agricultural', notes: 'Flat rice noodles are a southern Chinese and Southeast Asian tradition.' }], convergenceRole: 'The silky flat noodle that gives pho its distinctive texture.', confidence: 'high', sourceNotes: ['Rice noodle traditions in southern China and Vietnam are well established.'] },
      { id: 'star-anise', ingredient: 'Star anise', role: 'Primary broth spice', origin: { name: 'Southern China / Vietnam', countryCode: 'CN', coordinates: [110.0, 22.0] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Star anise in Chinese medicine and cooking', location: { name: 'Guangxi/Yunnan', countryCode: 'CN', coordinates: [108.3275, 22.8155] }, period: 'Antiquity', routeType: 'agricultural', notes: 'Star anise is native to the border region of China and Vietnam.' }], convergenceRole: 'Provides the distinctive anise sweetness that defines pho broth and separates it from all other beef soups.', confidence: 'high', sourceNotes: ['Star anise origin in southern China/northern Vietnam is botanically established.'] },
      { id: 'beef-bones', ingredient: 'Beef bones', role: 'Broth base', origin: { name: 'Eurasia (via French colonialism)', countryCode: 'VN', coordinates: [105.8412, 21.0285] }, originPeriod: 'Colonial period', route: [{ order: 1, title: 'Cattle domestication', location: { name: 'Near East', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, period: '8000 BCE', routeType: 'agricultural', notes: 'Cattle were work animals in Vietnam before French colonial introduction of beef eating.' }, { order: 2, title: 'French slaughterhouse infrastructure', location: { name: 'Hanoi', countryCode: 'VN', coordinates: [105.8412, 21.0285] }, period: 'Late 19th century', routeType: 'colonial', notes: 'French colonizers built abattoirs and introduced systematic beef consumption in Vietnam.' }], convergenceRole: 'The ingredient that would not exist in this dish without colonial disruption of Vietnamese dietary practice.', confidence: 'high', sourceNotes: ['French influence on beef consumption in Vietnam is documented in colonial histories.'] }
    ],
    nameJourney: [
      { order: 1, name: 'phở', languageOrCulture: 'Vietnamese', location: { name: 'Nam Dinh / Hanoi', countryCode: 'VN', coordinates: [106.1683, 20.4138] }, period: 'Early 20th century', notes: 'Possibly from the Cantonese word ngau (beef) or from pot-au-feu (French beef stew); both etymologies are debated.' }
    ],
    globalForces: ['French colonialism', 'Chinese labor migration', 'Vietnam War', 'refugee diaspora'],
    sources: [{ id: 'pho-history', title: 'Pho origins', note: 'Andrea Nguyen\'s "The Pho Cookbook" and Erica Peters\'s research document pho\'s colonial-era origins.' }],
    uncertainties: ['Whether pot-au-feu directly inspired pho broth or the French connection is overstated is actively debated.', 'The precise etymology of the word phở is unresolved.']
  },

  'dumplings': {
    dishName: 'Dumplings',
    canonicalDishName: 'Jiaozi',
    dishType: 'Stuffed dough pockets',
    plateLocation: { name: 'Northern China', countryCode: 'CN', coordinates: [116.4074, 39.9042] },
    convergenceThesis: 'The stuffed dough dumpling—found across Eurasia from Chinese jiaozi to Georgian khinkali to Italian ravioli—likely spread along Silk Road trade and migration routes from a Chinese origin point around 1,800 years ago. The Chinese jiaozi tradition is the best-documented ancient form; Mongol empire trade networks likely spread the concept westward, where each culture adapted it with local fillings and cooking methods.',
    shareQuote: 'Every culture that trades with China eventually invents a dumpling. The Silk Road explains why.',
    dishLineage: [
      { order: 1, ancestorName: 'Zhang Zhongjing\'s ear-shaped dumplings', stageTitle: 'Medicinal dumpling legend', location: { name: 'Henan Province', countryCode: 'CN', coordinates: [113.6654, 34.7566] }, period: '3rd century CE', transformation: 'Traditional accounts credit physician Zhang Zhongjing with creating ear-shaped dumplings to distribute herbal medicine to frostbitten patients.', routeType: 'migration', confidence: 'low', notes: 'This is a legendary account; archaeological evidence for early dumplings predates this story.' },
      { order: 2, ancestorName: 'Northern Chinese jiaozi', stageTitle: 'Wheat dough stuffed pocket', location: { name: 'Shanxi / Henan', countryCode: 'CN', coordinates: [112.5489, 37.8706] }, period: 'Han to Tang dynasties (206 BCE–907 CE)', transformation: 'Wheat-growing northern China developed boiled or steamed dough pockets filled with meat and vegetables.', routeType: 'agricultural', confidence: 'high', notes: 'Jiaozi are documented in Tang-era texts and archaeological finds.' },
      { order: 3, ancestorName: 'Silk Road diffusion', stageTitle: 'Dumplings move west', location: { name: 'Central Asia', countryCode: 'KZ', coordinates: [66.9237, 48.0196] }, period: '13th–15th century', transformation: 'Mongol expansion and Silk Road trade spread stuffed dough traditions across Eurasia.', routeType: 'land', confidence: 'medium', notes: 'Manti (Central Asia/Turkey), momo (Tibet/Nepal), and maultaschen (Germany) all share structural similarities.' },
      { order: 4, ancestorName: 'Chinese New Year tradition', stageTitle: 'Cultural ritual embedding', location: { name: 'Northern China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, period: 'Ming–Qing dynasties (14th–19th c.)', transformation: 'Jiaozi became associated with Lunar New Year celebrations; their gold-ingot shape symbolized wealth.', routeType: 'migration', confidence: 'high', notes: 'New Year jiaozi tradition is well documented in Chinese cultural history.' },
      { order: 5, ancestorName: 'Chinese diaspora dim sum', stageTitle: 'Global Chinese restaurant culture', location: { name: 'Hong Kong / San Francisco', countryCode: 'HK', coordinates: [114.1694, 22.3193] }, period: '20th century', transformation: 'Chinese emigrants spread dim sum and jiaozi culture worldwide through restaurants.', routeType: 'migration', confidence: 'high', notes: 'Dim sum culture globalized Chinese dumpling traditions through Cantonese restaurant networks.' }
    ],
    ingredients: [
      { id: 'wheat-wrapper', ingredient: 'Wheat flour wrapper', role: 'Dough skin', origin: { name: 'Fertile Crescent', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, originPeriod: '10,000 BCE', route: [{ order: 1, title: 'Wheat domestication', location: { name: 'Fertile Crescent', countryCode: 'IQ', coordinates: [43.6793, 33.2232] }, period: '10,000 BCE', routeType: 'agricultural', notes: 'Wheat was domesticated in the Fertile Crescent and spread east to China.' }, { order: 2, title: 'Wheat in northern China', location: { name: 'Yellow River basin', countryCode: 'CN', coordinates: [113.0, 35.0] }, period: '5000 BCE onward', routeType: 'trade', notes: 'Wheat became the primary grain of northern China, enabling dough-based cooking.' }], convergenceRole: 'Defines the entire structural concept of the dumpling—a thin skin that holds filling.', confidence: 'high', sourceNotes: ['Wheat in northern China and its role in northern Chinese cuisine is well established.'] },
      { id: 'pork', ingredient: 'Pork and cabbage filling', role: 'Savory filling', origin: { name: 'China', countryCode: 'CN', coordinates: [104.1954, 35.8617] }, originPeriod: '7000 BCE', route: [{ order: 1, title: 'Pig domestication in China', location: { name: 'Yellow River / Yangtze', countryCode: 'CN', coordinates: [114.3, 30.6] }, period: '7000 BCE', routeType: 'agricultural', notes: 'Pigs were independently domesticated in China and remain central to Chinese food culture.' }], convergenceRole: 'The most common jiaozi filling; pork and cabbage defines the flavor profile of the classic Chinese dumpling.', confidence: 'high', sourceNotes: ['Pig domestication in China is archaeologically established.'] }
    ],
    nameJourney: [
      { order: 1, name: 'jiaozi (餃子)', languageOrCulture: 'Mandarin Chinese', location: { name: 'Northern China', countryCode: 'CN', coordinates: [116.4074, 39.9042] }, period: 'Ancient–medieval', notes: 'The character 餃 suggests a food with a sealed/crossed shape; the exact original pronunciation is debated.' },
      { order: 2, name: 'dumpling', languageOrCulture: 'English', location: { name: 'Britain', countryCode: 'GB', coordinates: [-0.1276, 51.5072] }, period: '17th century', notes: 'English "dumpling" originally referred to a doughy ball; it was applied to stuffed Asian versions through 20th-century adoption.' }
    ],
    globalForces: ['Silk Road trade', 'Chinese diaspora', 'Mongol empire', 'wheat agriculture spread'],
    sources: [{ id: 'dumpling-history', title: 'Jiaozi origins', note: 'Archaeological finds of sealed dough pockets in Tang-era China provide early documentation of jiaozi.' }],
    uncertainties: ['Whether European stuffed pasta (ravioli, pierogi) derived from Chinese dumplings via the Silk Road or developed independently remains debated.']
  },

  'paella': {
    dishName: 'Paella',
    canonicalDishName: 'Paella Valenciana',
    dishType: 'Saffron rice pan dish',
    plateLocation: { name: 'Valencia', countryCode: 'ES', coordinates: [-0.3763, 39.4699] },
    convergenceThesis: 'Paella crystallizes eight centuries of Arab agricultural influence on Iberia. Arab Moors introduced rice cultivation, saffron farming, and sophisticated irrigation to Valencia; when Christian kingdoms reconquered Valencia, local farmers combined this Moorish agricultural heritage with pork and rabbit (foods forbidden to Muslims) in a deliberate assertion of Christian identity. The dish evolved into a symbol of Valencian and then Spanish national cuisine.',
    shareQuote: 'Paella is what happens when a Christian kingdom inherits a Muslim farmer\'s irrigation canals.',
    dishLineage: [
      { order: 1, ancestorName: 'Arab rice cultivation in Valencia', stageTitle: 'Moorish agricultural legacy', location: { name: 'Valencia', countryCode: 'ES', coordinates: [-0.3763, 39.4699] }, period: '8th–13th century', transformation: 'Moorish rulers introduced rice cultivation and advanced irrigation systems (acequia) to Valencia\'s coastal wetlands.', routeType: 'agricultural', confidence: 'high', notes: 'Valencia\'s rice-growing infrastructure was built by Arab engineers; it is still in use today.' },
      { order: 2, ancestorName: 'Post-Reconquista Valencian rice culture', stageTitle: 'Christian adaptation', location: { name: 'Valencia', countryCode: 'ES', coordinates: [-0.3763, 39.4699] }, period: '13th–15th century', transformation: 'After Christian reconquest, local cooks kept rice but added pork and rabbit—foods marking Christian identity against Moorish and Jewish dietary laws.', routeType: 'migration', confidence: 'high', notes: 'Scholars note the pork and rabbit combination was a deliberate cultural marker after reconquest.' },
      { order: 3, ancestorName: 'Valencian field worker rice', stageTitle: 'Farmworker origin', location: { name: 'Albufera wetlands', countryCode: 'ES', coordinates: [-0.3417, 39.3271] }, period: '18th–19th century', transformation: 'Field workers cooked rice in wide shallow pans over open fires, adding whatever was available—snails, rabbit, green beans, saffron.', routeType: 'agricultural', confidence: 'high', notes: 'Paella valenciana\'s "authentic" ingredients (rabbit, snails, flat beans) reflect peasant farmworker cooking.' },
      { order: 4, ancestorName: 'Spanish national paella', stageTitle: 'Nationalist symbol', location: { name: 'Spain', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: '20th century', transformation: 'Paella was promoted as Spain\'s national dish; tourist versions added seafood, creating paella mixta.', routeType: 'migration', confidence: 'high', notes: 'Valencians often reject seafood paella as inauthentic; the seafood version is largely a tourist-driven adaptation.' }
    ],
    ingredients: [
      { id: 'bomba-rice', ingredient: 'Short-grain rice (bomba)', role: 'Starchy base', origin: { name: 'Southeast Asia', countryCode: 'CN', coordinates: [117.0, 31.0] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Rice cultivation in Asia', location: { name: 'Yangtze Delta', countryCode: 'CN', coordinates: [121.0, 31.0] }, period: '7000 BCE', routeType: 'agricultural', notes: 'Rice was domesticated in the Yangtze River basin.' }, { order: 2, title: 'Arab introduction to Iberia', location: { name: 'Valencia', countryCode: 'ES', coordinates: [-0.3763, 39.4699] }, period: '8th century', routeType: 'agricultural', notes: 'Arab Moors introduced rice cultivation to the Iberian peninsula via Valencia\'s wetlands.' }], convergenceRole: 'The ingredient the entire dish is built around; Valencia\'s bomba variety absorbs broth without going mushy.', confidence: 'high', sourceNotes: ['Arab introduction of rice to Valencia is historically established.'] },
      { id: 'saffron-paella', ingredient: 'Saffron', role: 'Color and aroma', origin: { name: 'Persia / Greece', countryCode: 'IR', coordinates: [53.688, 32.4279] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Saffron cultivation in Persia', location: { name: 'Khorasan', countryCode: 'IR', coordinates: [59.5626, 35.8997] }, period: 'Ancient', routeType: 'agricultural', notes: 'Saffron was widely cultivated in Persia and the ancient world.' }, { order: 2, title: 'Arab introduction to Iberia', location: { name: 'La Mancha', countryCode: 'ES', coordinates: [-3.0, 39.5] }, period: '8th–10th century', routeType: 'agricultural', notes: 'Arab farmers introduced saffron cultivation to Spain, where La Mancha became a major producer.' }], convergenceRole: 'Gives paella its golden color and floral aroma; the visible marker of Moorish agricultural heritage.', confidence: 'high', sourceNotes: ['Arab introduction of saffron cultivation to Spain is documented.'] },
      { id: 'rabbit-pork', ingredient: 'Rabbit and pork', role: 'Protein', origin: { name: 'Europe', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, originPeriod: 'Pre-Roman', route: [{ order: 1, title: 'Iberian rabbit population', location: { name: 'Iberian Peninsula', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: 'Ancient', routeType: 'agricultural', notes: 'The Iberian Peninsula\'s name may derive from the Latin for "land of rabbits."' }], convergenceRole: 'The post-Reconquista identity marker: pork and rabbit were forbidden to Muslims and Jews, making them symbols of Christian Valencian identity.', confidence: 'high', sourceNotes: ['Pork and rabbit as markers of Christian identity post-Reconquista is a recognized historical thesis.'] }
    ],
    nameJourney: [
      { order: 1, name: 'paella', languageOrCulture: 'Valencian/Catalan', location: { name: 'Valencia', countryCode: 'ES', coordinates: [-0.3763, 39.4699] }, period: '19th century (as food)', notes: 'Paella refers to the wide flat pan, from Latin patella (pan). The dish is named for its cooking vessel.' }
    ],
    globalForces: ['Arab/Moorish agricultural transfer', 'Spanish Reconquista', 'Spanish tourism', 'Mediterranean trade'],
    sources: [{ id: 'paella-history', title: 'Paella and Moorish Valencia', note: 'Claudia Roden and others have documented the Moorish agricultural heritage of Valencian rice culture.' }],
    uncertainties: ['The exact moment paella coalesced as a specific dish versus generic rice pan cooking is unclear.']
  },

  'shakshuka': {
    dishName: 'Shakshuka',
    canonicalDishName: 'Shakshuka',
    dishType: 'Eggs poached in spiced tomato sauce',
    plateLocation: { name: 'North Africa / Israel', countryCode: 'TN', coordinates: [9.5375, 33.8869] },
    convergenceThesis: 'Shakshuka emerged from the Ottoman Empire\'s network of spiced vegetable dishes, with North African Amazigh and Arab cooks developing tomato-based egg preparations after the Columbian Exchange brought tomatoes to the region. It was carried to Israel by Jewish immigrants from Tunisia, Libya, and Yemen and became the national breakfast dish of Israeli café culture. Its global popularity exploded in the 2010s via food media.',
    shareQuote: 'Shakshuka is a New World tomato cooked in an Old World spice tradition and adopted by three continents.',
    dishLineage: [
      { order: 1, ancestorName: 'Ottoman egg and vegetable dishes', stageTitle: 'Spiced egg preparations', location: { name: 'Ottoman Levant / North Africa', countryCode: 'TR', coordinates: [35.2433, 38.9637] }, period: '16th–19th century', transformation: 'Ottoman cooking traditions across the Levant and North Africa featured eggs cooked in spiced sauces and vegetable bases.', routeType: 'migration', confidence: 'medium', notes: 'Eggs poached in sauce is a preparation type found across Ottoman-influenced cuisines.' },
      { order: 2, ancestorName: 'Columbian Exchange tomatoes', stageTitle: 'Tomatoes enter North Africa', location: { name: 'Tunis / Tripoli', countryCode: 'TN', coordinates: [10.1815, 36.8065] }, period: '17th–18th century', transformation: 'New World tomatoes, introduced via Spain and the Ottoman empire, became central to North African cooking.', routeType: 'colonial', confidence: 'high', notes: 'Tomatoes were adopted rapidly into North African and Middle Eastern cooking after introduction.' },
      { order: 3, ancestorName: 'Tunisian and Libyan shakshuka', stageTitle: 'North African codification', location: { name: 'Tunisia / Libya', countryCode: 'TN', coordinates: [9.5375, 33.8869] }, period: '19th–20th century', transformation: 'North African Jewish and Muslim communities developed the dish using harissa, cumin, and paprika with tomatoes and eggs.', routeType: 'agricultural', confidence: 'high', notes: 'Tunisian and Libyan Jewish communities are credited with the shakshuka familiar to Israeli cuisine.' },
      { order: 4, ancestorName: 'Israeli shakshuka', stageTitle: 'Immigrant dish becomes national symbol', location: { name: 'Tel Aviv', countryCode: 'IL', coordinates: [34.7818, 32.0853] }, period: '1948 onward', transformation: 'Jewish immigrants from Tunisia, Libya, and Yemen brought shakshuka to Israel, where it became a cheap, popular café dish.', routeType: 'migration', confidence: 'high', notes: 'Restaurant Bino in Tel Aviv (est. 1977) popularized shakshuka; it is now an Israeli national dish.' }
    ],
    ingredients: [
      { id: 'tomatoes-sk', ingredient: 'Tomatoes', role: 'Sauce base', origin: { name: 'Andes', countryCode: 'PE', coordinates: [-75.0152, -9.189] }, originPeriod: 'Pre-Columbian', route: [{ order: 1, title: 'Andean origin', location: { name: 'Peru', countryCode: 'PE', coordinates: [-75.0152, -9.189] }, period: 'Pre-Columbian', routeType: 'agricultural', notes: 'Tomatoes were domesticated in the Americas.' }, { order: 2, title: 'Columbian Exchange to Mediterranean', location: { name: 'Spain / Ottoman Empire', countryCode: 'ES', coordinates: [-3.7038, 40.4168] }, period: '16th century', routeType: 'colonial', notes: 'Spanish brought tomatoes to Europe; Ottoman trade spread them to North Africa and the Levant.' }], convergenceRole: 'The New World ingredient without which shakshuka cannot exist in its modern form.', confidence: 'high', sourceNotes: ['Tomato introduction to North Africa and the Levant via Spanish-Ottoman exchange is established.'] },
      { id: 'harissa', ingredient: 'Harissa (chili paste)', role: 'Heat and depth', origin: { name: 'Tunisia / North Africa', countryCode: 'TN', coordinates: [9.5375, 33.8869] }, originPeriod: '16th century (post-Columbian)', route: [{ order: 1, title: 'New World chilies to North Africa', location: { name: 'Tunisia', countryCode: 'TN', coordinates: [9.5375, 33.8869] }, period: '16th–17th century', routeType: 'colonial', notes: 'Chili peppers from the Americas were adopted into North African spice culture and became central to Tunisian cooking.' }], convergenceRole: 'The North African spice paste that defines shakshuka\'s heat profile and regional identity.', confidence: 'high', sourceNotes: ['Harissa as a North African invention post-Columbian Exchange is well established.'] }
    ],
    nameJourney: [
      { order: 1, name: 'شكشوكة (shakshuka)', languageOrCulture: 'Arabic / Amazigh-influenced', location: { name: 'Tunisia / Libya', countryCode: 'TN', coordinates: [9.5375, 33.8869] }, period: '19th–20th century', notes: 'Possibly from Amazigh (Berber) language meaning "mixed up" or from Arabic for shaking/mixing.' }
    ],
    globalForces: ['Columbian Exchange', 'Ottoman empire', 'North African Jewish migration', 'Israeli food culture'],
    sources: [{ id: 'shakshuka-history', title: 'Shakshuka origins', note: 'North African Jewish communities are credited with bringing shakshuka to Israel; its Ottoman-era antecedents are noted by food historians.' }],
    uncertainties: ['Whether shakshuka originated in Tunisia, Libya, or Yemen is debated among communities.', 'The precise etymology of the name is unresolved.']
  },

  'tom yum': {
    dishName: 'Tom Yum',
    canonicalDishName: 'Tom Yum Goong',
    dishType: 'Spicy sour lemongrass soup',
    plateLocation: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] },
    convergenceThesis: 'Tom yum is a Thai soup built entirely from ingredients native to or long-established in Southeast Asia: lemongrass, galangal, kaffir lime, and fish sauce form an aromatic broth tradition that predates written records. The modern restaurant version was shaped by Thai royal court cuisine and later standardized through tourist-era Thai restaurant culture. Unlike pad thai, tom yum has deep indigenous roots with no colonial disruption.',
    shareQuote: 'Tom yum is one of the few beloved global dishes made entirely from ingredients that never needed to travel far.',
    dishLineage: [
      { order: 1, ancestorName: 'Southeast Asian herbal broth tradition', stageTitle: 'Indigenous aromatic soups', location: { name: 'Mainland Southeast Asia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: 'Pre-historical', transformation: 'Southeast Asian communities developed soups using local aromatics—lemongrass, galangal, kaffir lime—to flavor broths.', routeType: 'agricultural', confidence: 'medium', notes: 'These aromatics are native to Southeast Asia; their use predates written records.' },
      { order: 2, ancestorName: 'Thai royal court cuisine', stageTitle: 'Court refinement', location: { name: 'Ayutthaya / Bangkok', countryCode: 'TH', coordinates: [100.5688, 14.3533] }, period: '14th–18th century', transformation: 'Thai royal court recipes codified the balance of sour (lime), spicy (chili), salty (fish sauce) as a distinct flavor profile.', routeType: 'migration', confidence: 'medium', notes: 'Court cuisine texts from the Ayutthaya and Bangkok periods include sour-spicy soups.' },
      { order: 3, ancestorName: 'Chili adoption', stageTitle: 'New World spice adds heat', location: { name: 'Thailand', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: '16th–17th century', transformation: 'Portuguese traders introduced chili peppers to Thailand; they were rapidly adopted and became central to Thai cooking.', routeType: 'colonial', confidence: 'high', notes: 'Chili\'s adoption in Thailand is documented from the 17th century via Portuguese and other European traders.' },
      { order: 4, ancestorName: 'Tom yum goong standardization', stageTitle: 'Prawn version becomes iconic', location: { name: 'Bangkok', countryCode: 'TH', coordinates: [100.5018, 13.7563] }, period: '20th century', transformation: 'Tom yum goong (with river prawns) became the definitive restaurant version during Thailand\'s tourism boom.', routeType: 'trade', confidence: 'high', notes: 'The prawn version dominated as Thailand developed its restaurant and tourism infrastructure.' }
    ],
    ingredients: [
      { id: 'lemongrass', ingredient: 'Lemongrass', role: 'Primary aromatic', origin: { name: 'Southeast Asia / South Asia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Native Southeast Asian grass', location: { name: 'Southeast Asia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: 'Pre-historical', routeType: 'agricultural', notes: 'Lemongrass is native to tropical Southeast Asia.' }], convergenceRole: 'Provides the citrus-herbal base note that makes tom yum instantly recognizable.', confidence: 'high', sourceNotes: ['Lemongrass is native to Southeast Asia.'] },
      { id: 'galangal', ingredient: 'Galangal (kha)', role: 'Earthy-piney spice', origin: { name: 'Southeast Asia', countryCode: 'ID', coordinates: [113.9213, -0.7893] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Native rhizome of Southeast Asia', location: { name: 'Indonesia / Thailand', countryCode: 'ID', coordinates: [113.9213, -0.7893] }, period: 'Ancient', routeType: 'agricultural', notes: 'Galangal is native to Southeast Asia and has been used in cooking for millennia.' }], convergenceRole: 'Adds the distinctive piney, medicinal depth that separates tom yum from any other sour soup.', confidence: 'high', sourceNotes: ['Galangal cultivation in Southeast Asia is ancient.'] },
      { id: 'kaffir-lime', ingredient: 'Kaffir lime leaves (makrut)', role: 'Citrus aroma', origin: { name: 'Southeast Asia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Native citrus of Southeast Asia', location: { name: 'Thailand/Indonesia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: 'Ancient', routeType: 'agricultural', notes: 'Makrut lime is native to Southeast Asia.' }], convergenceRole: 'The leaves infuse the broth with a floral citrus note without adding sourness; essential to the aromatic identity.', confidence: 'high', sourceNotes: ['Makrut lime is native to tropical Southeast Asia.'] },
      { id: 'fish-sauce-ty', ingredient: 'Fish sauce (nam pla)', role: 'Salty umami base', origin: { name: 'Southeast Asia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, originPeriod: 'Ancient', route: [{ order: 1, title: 'Fermented fish liquid', location: { name: 'Southeast Asia', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: 'Ancient', routeType: 'agricultural', notes: 'Fish sauce fermentation traditions are ancient across Southeast Asia.' }], convergenceRole: 'Provides the deep salty-umami flavor that replaces salt in Thai cooking.', confidence: 'high', sourceNotes: ['Fish sauce is central to Southeast Asian culinary traditions.'] }
    ],
    nameJourney: [
      { order: 1, name: 'ต้มยำ (tom yam)', languageOrCulture: 'Thai', location: { name: 'Thailand', countryCode: 'TH', coordinates: [101.9758, 15.8700] }, period: 'Pre-modern', notes: '"Tom" means boiled/soup; "yam" means mixed/combined. Tom yum goong (ต้มยำกุ้ง) specifies prawns.' }
    ],
    globalForces: ['Southeast Asian agricultural tradition', 'Portuguese chili introduction', 'Thai tourism industry'],
    sources: [{ id: 'tom-yum-history', title: 'Tom yum and Thai cuisine', note: 'Tom yum\'s indigenous aromatic ingredients are native to Southeast Asia; chili adoption via Portuguese trade is documented.' }],
    uncertainties: ['The earliest written recipe for tom yum in its recognizable form has not been precisely dated.']
  }
};
