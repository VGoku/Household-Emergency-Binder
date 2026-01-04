import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-96">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search across all sections..."
        className="w-full pl-10 pr-4 py-2 bg-blue-100/60 dark:bg-slate-700/60 backdrop-blur-sm border border-blue-200/50 dark:border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-400 dark:focus:border-blue-500 shadow-sm transition-all text-slate-700 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;

