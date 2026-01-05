// Theme toggle button (switch between light and dark modes)
// Theme toggle button (switch between light and dark modes)
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200/70 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:hover:bg-slate-600/70 text-slate-700 dark:text-slate-200 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
}

export default ThemeToggle;

