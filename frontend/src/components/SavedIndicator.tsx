// Small UI indicator shown briefly after data is saved
interface SavedIndicatorProps {
  show: boolean;
}

function SavedIndicator({ show }: SavedIndicatorProps) {
  if (!show) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-green-100/70 dark:bg-green-900/50 backdrop-blur-sm border border-green-200/60 dark:border-green-700/50 rounded-lg text-green-700 dark:text-green-300 text-sm font-medium animate-fade-in shadow-sm">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>Saved</span>
    </div>
  );
}

export default SavedIndicator;

