import { useState } from 'react';
import type { Pet } from '../types';

interface PetsSectionProps {
  pets: Pet[];
  onUpdate: (pets: Pet[]) => void;
}

function PetsSection({ pets, onUpdate }: PetsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    vetContact: '',
    notes: '',
  });

  const handleAdd = () => {
    if (!formData.name.trim()) return;

    const newPet: Pet = {
      id: Date.now().toString(),
      ...formData,
    };

    onUpdate([...pets, newPet]);
    setFormData({ name: '', type: '', vetContact: '', notes: '' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(pets.filter((pet) => pet.id !== id));
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Pets</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Add Pet
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buddy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Dog, Cat, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Vet Contact
              </label>
              <input
                type="text"
                value={formData.vetContact}
                onChange={(e) => setFormData({ ...formData, vetContact: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Dr. Smith - (555) 123-4567"
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
                placeholder="Additional information"
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
                setFormData({ name: '', type: '', vetContact: '', notes: '' });
              }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {pets.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No pets added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800">{pet.name}</h3>
                <button
                  onClick={() => handleDelete(pet.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              {pet.type && (
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">Type:</span> {pet.type}
                </p>
              )}
              {pet.vetContact && (
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">Vet Contact:</span> {pet.vetContact}
                </p>
              )}
              {pet.notes && (
                <p className="text-sm text-slate-600 mt-2">
                  <span className="font-medium">Notes:</span> {pet.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PetsSection;

