import { useState, useMemo } from 'react';
import { BeakerIcon, PlusIcon, TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { Medication } from '../types';
import ConfirmModal from './ConfirmModal';

interface MedicationsSectionProps {
  medications: Medication[];
  onUpdate: (medications: Medication[]) => void;
  searchQuery?: string;
}

function MedicationsSection({ medications, onUpdate, searchQuery = '' }: MedicationsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; medicationId: string | null }>({
    isOpen: false,
    medicationId: null,
  });
  const [formData, setFormData] = useState({
    person: '',
    medication: '',
    dosage: '',
    notes: '',
  });

  const filteredMedications = useMemo(() => {
    if (!searchQuery.trim()) return medications;
    const query = searchQuery.toLowerCase();
    return medications.filter(
      (med) =>
        med.person.toLowerCase().includes(query) ||
        med.medication.toLowerCase().includes(query) ||
        med.dosage.toLowerCase().includes(query) ||
        med.notes.toLowerCase().includes(query)
    );
  }, [medications, searchQuery]);

  const resetForm = () => {
    setFormData({ person: '', medication: '', dosage: '', notes: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.person.trim() || !formData.medication.trim()) return;

    if (editingId) {
      onUpdate(
        medications.map((med) =>
          med.id === editingId
            ? { ...med, ...formData }
            : med
        )
      );
    } else {
      const newMedication: Medication = {
        id: Date.now().toString(),
        ...formData,
      };
      onUpdate([...medications, newMedication]);
    }
    resetForm();
  };

  const handleEdit = (med: Medication) => {
    setFormData({
      person: med.person,
      medication: med.medication,
      dosage: med.dosage,
      notes: med.notes,
    });
    setEditingId(med.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate(medications.filter((med) => med.id !== id));
  };

  return (
    <>
      <section className="bg-purple-100/60 backdrop-blur-sm rounded-xl shadow-md border border-purple-200/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div 
          className="flex items-center justify-between p-6 cursor-pointer bg-gradient-to-r from-purple-100/70 to-indigo-100/70 backdrop-blur-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-200/60 rounded-lg backdrop-blur-sm">
              <BeakerIcon className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Medications</h2>
              <p className="text-sm text-slate-600">{medications.length} medication{medications.length !== 1 ? 's' : ''}</p>
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
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
              >
                <PlusIcon className="w-4 h-4" />
                Add Medication
              </button>
            )}

            {isAdding && (
              <div className="p-4 bg-gradient-to-br from-purple-100/60 to-indigo-100/60 backdrop-blur-sm rounded-lg border-2 border-purple-200/60 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">
                  {editingId ? 'Edit Medication' : 'Add New Medication'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Person *
                    </label>
                    <input
                      type="text"
                      value={formData.person}
                      onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                      className="w-full px-3 py-2 bg-purple-50/60 backdrop-blur-sm border border-purple-200/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all text-slate-700 placeholder-slate-500"
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
                      className="w-full px-3 py-2 bg-purple-50/60 backdrop-blur-sm border border-purple-200/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all text-slate-700 placeholder-slate-500"
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
                      className="w-full px-3 py-2 bg-purple-50/60 backdrop-blur-sm border border-purple-200/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all text-slate-700 placeholder-slate-500"
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
                      className="w-full px-3 py-2 bg-purple-50/60 backdrop-blur-sm border border-purple-200/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="Take with food"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
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

            {filteredMedications.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                {searchQuery ? 'No medications match your search.' : 'No medications added yet.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedications.map((med) => (
                  <div
                    key={med.id}
                    className="p-4 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-sm rounded-lg border border-purple-200/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-slate-800">{med.medication}</h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(med)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-all duration-200"
                          title="Edit medication"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, medicationId: med.id })}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                          title="Delete medication"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-semibold">Person:</span> {med.person}
                    </p>
                    {med.dosage && (
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="font-semibold">Dosage:</span> {med.dosage}
                      </p>
                    )}
                    {med.notes && (
                      <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-purple-200/40">
                        <span className="font-semibold">Notes:</span> {med.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, medicationId: null })}
        onConfirm={() => {
          if (deleteModal.medicationId) {
            handleDelete(deleteModal.medicationId);
          }
        }}
        title="Delete Medication"
        message="Are you sure you want to delete this medication? This action cannot be undone."
      />
    </>
  );
}

export default MedicationsSection;
