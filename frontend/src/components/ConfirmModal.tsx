import { Fragment } from 'react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-blue-100/80 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full transform transition-all animate-fade-in border border-blue-200/50 dark:border-slate-700/50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100/80 dark:bg-red-900/50 rounded-lg">
                  <TrashIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-lg transition-all"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300 mb-6">{message}</p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-200/70 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:hover:bg-slate-600/70 text-slate-700 dark:text-slate-200 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmModal;

