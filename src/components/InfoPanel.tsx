import { Anchor, BookOpen, Copy, ExternalLink, Landmark, MapPin, Route, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PlaybackMode } from '@/lib/journeyFrames';
import type { DishCartography } from '@/lib/types';

interface InfoPanelProps {
  data: DishCartography;
  playbackMode: PlaybackMode;
  activeIndex: number;
  activeLineageIndex: number;
  activePointIndex: number;
  onClose: () => void;
  onShare: () => void;
  onSelectIngredient: (index: number) => void;
  onSelectLineage: (index: number) => void;
}

export function InfoPanel({
  data,
  playbackMode,
  activeIndex,
  activeLineageIndex,
  activePointIndex,
  onClose,
  onShare,
  onSelectIngredient,
  onSelectLineage
}: InfoPanelProps) {
  const activeIngredient = data.ingredients[activeIndex] || data.ingredients[0];
  const activeLineage = data.dishLineage[activeLineageIndex] || data.dishLineage[0];

  return (
    <motion.aside
      className="info-panel"
      aria-label={`${data.dishName} cartography`}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 220 }}
    >
      <div className="panel-header">
        <div>
          <span className="eyebrow">{data.dishType}</span>
          <h1>{data.dishName}</h1>
          <p>{data.canonicalDishName}</p>
        </div>
        <div className="panel-actions">
          <button onClick={onShare} aria-label="Copy share link">
            <Copy size={17} />
          </button>
          <button onClick={onClose} aria-label="Close panel">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="share-quote">
        <span>00_Shareable_Finding</span>
        "{data.shareQuote}"
      </div>

      <section>
        <h2>Convergence Thesis</h2>
        <p>{data.convergenceThesis}</p>
        <div className="plate-location">
          <MapPin size={14} />
          <span>{data.plateLocation.name}</span>
        </div>
      </section>

      <section>
        <h2>{playbackMode === 'lineage' ? 'Active Evolution Stage' : 'Active Ingredient'}</h2>
        {playbackMode === 'lineage' ? (
          <article className="ingredient-card active">
            <div className="ingredient-card-header">
              <div>
                <strong>{activeLineage.stageTitle}</strong>
                <span>{activeLineage.ancestorName} · {activeLineage.period}</span>
              </div>
              <span className={`confidence ${activeLineage.confidence}`}>{activeLineage.confidence}</span>
            </div>
            <p>{activeLineage.transformation}</p>
            <p className="stage-note">{activeLineage.notes}</p>
          </article>
        ) : (
          <article className="ingredient-card active">
          <div className="ingredient-card-header">
            <div>
              <strong>{activeIngredient.ingredient}</strong>
              <span>{activeIngredient.role}</span>
            </div>
            <span className={`confidence ${activeIngredient.confidence}`}>{activeIngredient.confidence}</span>
          </div>
          <p>{activeIngredient.convergenceRole}</p>
          <ol>
            {activeIngredient.route.map((step, routeIndex) => (
              <li
                key={`${activeIngredient.id}-${step.order}`}
                className={routeIndex + 1 <= activePointIndex ? 'revealed' : ''}
              >
                {step.routeType === 'sea' ? <Anchor size={13} /> : <Landmark size={13} />}
                <div>
                  <strong>{step.title}</strong>
                  <span>{step.location.name} · {step.period}</span>
                  <p>{step.notes}</p>
                </div>
              </li>
            ))}
          </ol>
          </article>
        )}
      </section>

      <section>
        <h2>Dish Evolution</h2>
        <div className="ingredient-list">
          {data.dishLineage.map((stage, index) => (
            <button
              className={`ingredient-row ${playbackMode === 'lineage' && index === activeLineageIndex ? 'selected' : ''}`}
              key={`${stage.order}-${stage.stageTitle}`}
              type="button"
              onClick={() => onSelectLineage(index)}
            >
              <Route size={14} />
              <div>
                <strong>{stage.stageTitle}</strong>
                <span>{stage.ancestorName} · {stage.location.name}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>Converging Ingredients</h2>
        <div className="ingredient-list">
          {data.ingredients.map((ingredient, index) => (
            <button
              className={`ingredient-row ${playbackMode === 'ingredients' && index === activeIndex ? 'selected' : ''}`}
              key={ingredient.id}
              type="button"
              onClick={() => onSelectIngredient(index)}
            >
              <Route size={14} />
              <div>
                <strong>{ingredient.ingredient}</strong>
                <span>{ingredient.origin.name} → {data.plateLocation.name}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {data.nameJourney.length > 0 && (
        <section>
          <h2>Name Journey</h2>
          <div className="name-journey">
            {data.nameJourney.map((step) => (
              <div key={`${step.order}-${step.name}`}>
                <strong>{step.name}</strong>
                <span>{step.languageOrCulture} · {step.period}</span>
                <p>{step.notes}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2>Evidence Notes</h2>
        <div className="chips">
          {data.globalForces.map((force) => <span key={force}>{force}</span>)}
        </div>
        {data.sources.map((source) => (
          <div className="source-note" key={source.id}>
            <BookOpen size={14} />
            <div>
              <strong>{source.title}</strong>
              <p>{source.note}</p>
              {source.url && (
                <a href={source.url} target="_blank" rel="noreferrer">
                  Source <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
        {data.uncertainties.length > 0 && (
          <div className="uncertainties">
            <strong>Uncertainties</strong>
            {data.uncertainties.map((note) => <p key={note}>{note}</p>)}
          </div>
        )}
      </section>
    </motion.aside>
  );
}
