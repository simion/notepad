import { useCallback } from 'react';

export default function SearchBar({ query, onQueryChange }) {
  const handleChange = useCallback(
    (e) => onQueryChange(e.target.value),
    [onQueryChange]
  );

  const handleClear = useCallback(
    () => onQueryChange(''),
    [onQueryChange]
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {query && (
        <button
          onClick={handleClear}
          className="search-clear-btn"
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
}
