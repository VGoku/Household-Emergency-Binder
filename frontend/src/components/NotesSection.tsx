import { useState, useEffect } from 'react';

interface NotesSectionProps {
  notes: string;
  onUpdate: (notes: string) => void;
}

function NotesSection({ notes, onUpdate }: NotesSectionProps) {
  const [localNotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setLocalNotes(newNotes);
    onUpdate(newNotes);
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Important Notes</h2>
      <textarea
        value={localNotes}
        onChange={handleChange}
        placeholder="Add any additional important information here..."
        className="w-full min-h-[300px] px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y text-slate-700 placeholder-slate-400"
      />
    </section>
  );
}

export default NotesSection;

