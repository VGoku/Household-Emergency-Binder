// Header: top bar with import/export, theme toggle, and last-updated info
import { DocumentArrowDownIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onExport: () => void;
  onImport: () => void;
  lastUpdated: Date;
  isDark: boolean;
  onToggleTheme: () => void;
}

function Header({ onExport, onImport, lastUpdated, isDark, onToggleTheme }: HeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-200/60 to-cyan-200/60 dark:from-slate-800/60 dark:to-indigo-900/60 backdrop-blur-md border-b border-blue-300/30 dark:border-slate-700/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-slate-700 dark:from-blue-400 dark:to-slate-300 bg-clip-text text-transparent">
              Household Emergency Binder
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Keep your important information organized and accessible
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              Last updated: {formatTime(lastUpdated)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative group">
                <button
                  onClick={onImport}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200/70 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:hover:bg-slate-600/70 text-slate-700 dark:text-slate-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium backdrop-blur-sm"
                >
                  <DocumentArrowUpIcon className="w-4 h-4" />
                  Import
                </button>
                <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-slate-800/90 dark:bg-slate-900/90 text-slate-100 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 backdrop-blur-sm">
                  Load a saved binder from your device
                </span>
              </div>
              <div className="relative group">
                <button
                  onClick={onExport}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                >
                  <DocumentArrowDownIcon className="w-4 h-4" />
                  Export Backup
                </button>
                <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-slate-800/90 dark:bg-slate-900/90 text-slate-100 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 backdrop-blur-sm">
                  Download a backup you can keep forever
                </span>
              </div>
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
