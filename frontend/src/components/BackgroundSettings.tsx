// Background settings: choose/upload/reset app background image
import { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon, LinkIcon } from '@heroicons/react/24/outline';

interface BackgroundSettingsProps {
  backgroundImage: string | undefined;
  onBackgroundChange: (image: string | undefined) => void;
}

function BackgroundSettings({ backgroundImage, onBackgroundChange }: BackgroundSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onBackgroundChange(urlInput.trim());
      setUrlInput('');
      setIsOpen(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onBackgroundChange(base64);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    onBackgroundChange(undefined);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-200/70 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:hover:bg-slate-600/70 text-slate-700 dark:text-slate-200 rounded-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm"
        title="Customize background"
      >
        <PhotoIcon className="w-4 h-4" />
        Background
      </button>
      <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-slate-800/90 dark:bg-slate-900/90 text-slate-100 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 backdrop-blur-sm">
        Make it yours — choose a photo or image
      </span>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-blue-100/80 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-2xl border border-blue-200/50 dark:border-slate-700/50 z-50 p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Background Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-lg transition-all"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 bg-blue-50/60 dark:bg-slate-700/60 backdrop-blur-sm border border-blue-200/50 dark:border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 dark:focus:ring-blue-400 dark:focus:border-blue-500 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400"
                  />
                  <button
                    onClick={handleUrlSubmit}
                    className="px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all flex items-center gap-1"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Upload Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2 bg-slate-200/70 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:hover:bg-slate-600/70 text-slate-700 dark:text-slate-200 rounded-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm font-medium"
                >
                  <PhotoIcon className="w-4 h-4" />
                  Choose File
                </button>
              </div>

              {backgroundImage && (
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-all font-medium"
                >
                  Reset Background
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BackgroundSettings;
