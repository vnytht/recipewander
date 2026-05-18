import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  canStep: boolean;
  activeIndex: number;
  total: number;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

export function PlaybackControls({
  isPlaying,
  canStep,
  activeIndex,
  total,
  onToggle,
  onPrev,
  onNext,
  onReset
}: PlaybackControlsProps) {
  const progress = total > 0 ? ((activeIndex + 1) / total) * 100 : 0;

  return (
    <div className="playback" aria-label="Playback controls">
      <button onClick={onReset} disabled={!canStep} aria-label="Reset animation">
        <RotateCcw size={16} />
      </button>
      <button onClick={onPrev} disabled={!canStep || activeIndex <= 0} aria-label="Previous ingredient">
        <SkipBack size={16} />
      </button>
      <button className="primary-control" onClick={onToggle} disabled={!canStep} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button onClick={onNext} disabled={!canStep || activeIndex >= total - 1} aria-label="Next ingredient">
        <SkipForward size={16} />
      </button>
      <div className="progress" aria-label="Animation progress">
        <div style={{ width: `${progress}%` }} />
      </div>
      <span className="counter">
        {total > 0 ? activeIndex + 1 : 0}/{total}
      </span>
    </div>
  );
}
