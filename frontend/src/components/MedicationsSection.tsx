import { useState } from 'react';
import type { Medication } from '../types';

interface MedicationsSectionProps {
  medications: Medication[];
  onUpdate: (medications: Medication[]) => void;
}

function MedicationsSection({ medications, onUpdate }: MedicationsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    person: '',
    medication: '',
    dosage: '',
    notes: '',
  });

  const handleAdd = () => {
    if (!formData.person.trim() || !formData.medication.trim()) return;

    const newMedication: Medication = {
      id: Date.now().toString(),
      ...formData,
    };

    onUpdate([...medications, newMedication]);
    setFormData({ person: '', medication: '', dosage: '', notes: '' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(medications.filter((med) => med.id !== id));
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Medications</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Add Medication
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Person *
              </label>
              <input
                type="text"
                value={formData.person}
                onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Medication *
              </label>
              <input
                type="text"
                value={formData.medication}
                onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Aspirin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="100mg daily"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Notes
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Take with food"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setFormData({ person: '', medication: '', dosage: '', notes: '' });
              }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {medications.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No medications added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800">{med.medication}</h3>
                <button
                  onClick={() => handleDelete(med.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-1">
                <span className="font-medium">Person:</span> {med.person}
              </p>
              {med.dosage && (
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">Dosage:</span> {med.dosage}
                </p>
              )}
              {med.notes && (
                <p className="text-sm text-slate-600 mt-2">
                  <span className="font-medium">Notes:</span> {med.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MedicationsSection;

