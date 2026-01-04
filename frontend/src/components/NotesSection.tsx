import { useState, useEffect, useMemo } from 'react';
import { DocumentTextIcon, PlusIcon, TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { Note } from '../types';
import ConfirmModal from './ConfirmModal';

interface NotesSectionProps {
  notes: Note[];
  onUpdate: (notes: Note[]) => void;
  searchQuery?: string;
}

function NotesSection({ notes, onUpdate, searchQuery = '' }: NotesSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; noteId: string | null }>({
    isOpen: false,
    noteId: null,
  });
  const [formData, setFormData] = useState({
    content: '',
  });

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const query = searchQuery.toLowerCase();
    return notes.filter((note) => note.content.toLowerCase().includes(query));
  }, [notes, searchQuery]);

  const resetForm = () => {
    setFormData({ content: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.content.trim()) return;

    if (editingId) {
      onUpdate(
        notes.map((note) =>
          note.id === editingId
            ? { ...note, ...formData }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        ...formData,
      };
      onUpdate([...notes, newNote]);
    }
    resetForm();
  };

  const handleEdit = (note: Note) => {
    setFormData({
      content: note.content,
    });
    setEditingId(note.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate(notes.filter((note) => note.id !== id));
  };

  return (
    <>
      <section className="bg-amber-100/60 backdrop-blur-sm rounded-xl shadow-md border border-amber-200/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div 
          className="flex items-center justify-between p-6 cursor-pointer bg-gradient-to-r from-amber-100/70 to-yellow-100/70 backdrop-blur-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-200/60 rounded-lg backdrop-blur-sm">
              <DocumentTextIcon className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Important Notes</h2>
              <p className="text-sm text-slate-600">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-slate-600" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-slate-600" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="p-6 space-y-6">
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
              >
                <PlusIcon className="w-4 h-4" />
                Add Note
              </button>
            )}

            {isAdding && (
              <div className="p-4 bg-gradient-to-br from-amber-100/60 to-yellow-100/60 backdrop-blur-sm rounded-lg border-2 border-amber-200/60 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">
                  {editingId ? 'Edit Note' : 'Add New Note'}
                </h3>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ content: e.target.value })}
                  placeholder="Add any additional important information here..."
                  className="w-full min-h-[200px] px-4 py-3 bg-amber-50/60 backdrop-blur-sm border-2 border-amber-200/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-400 resize-y text-slate-700 placeholder-slate-500 transition-all"
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                  >
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-slate-200/70 hover:bg-slate-300/70 text-slate-700 rounded-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {filteredNotes.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                {searchQuery ? 'No notes match your search.' : 'No notes added yet.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 backdrop-blur-sm rounded-lg border border-amber-200/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="text-slate-700 whitespace-pre-wrap break-words">
                          {note.content}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => handleEdit(note)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-all duration-200"
                          title="Edit note"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, noteId: note.id })}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                          title="Delete note"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, noteId: null })}
        onConfirm={() => {
          if (deleteModal.noteId) {
            handleDelete(deleteModal.noteId);
          }
        }}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
      />
    </>
  );
}

export default NotesSection;
