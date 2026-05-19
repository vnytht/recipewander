import { Loader2, Search } from 'lucide-react';
import { EXAMPLE_DISHES } from '@/data/examples';

interface SearchBarProps {
  value: string;
  isLoading: boolean;
  onValueChange: (value: string) => void;
  onSearch: (dish: string) => void;
}

export function SearchBar({ value, isLoading, onValueChange, onSearch }: SearchBarProps) {
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <section className="search-shell" aria-label="Search dishes">
      <form className="search-form" onSubmit={submit}>
        <Search size={18} aria-hidden="true" />
        <input
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="Search a dish or drink..."
          disabled={isLoading}
          aria-label="Dish or drink"
        />
        <button disabled={isLoading || !value.trim()} type="submit">
          {isLoading ? <Loader2 size={14} className="spin" /> : null}
          {isLoading ? 'Mapping...' : 'Map Dish'}
        </button>
      </form>
      <div className="examples" aria-label="Example dishes">
        <span>Examples</span>
        {EXAMPLE_DISHES.map((dish) => (
          <button key={dish} disabled={isLoading} type="button" onClick={() => onSearch(dish)}>
            {dish}
          </button>
        ))}
      </div>
    </section>
  );
}
