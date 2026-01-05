// Pets section: add/edit pet info including vet contact
import { useState, useMemo } from 'react';
import { HeartIcon, PlusIcon, TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { Pet } from '../types';
import { formatPhoneNumber } from '../utils/phoneFormatter';
import ConfirmModal from './ConfirmModal';

interface PetsSectionProps {
  pets: Pet[];
  onUpdate: (pets: Pet[]) => void;
  searchQuery?: string;
}

function PetsSection({ pets, onUpdate, searchQuery = '' }: PetsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; petId: string | null }>({
    isOpen: false,
    petId: null,
  });
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    vetName: '',
    vetPhone: '',
    notes: '',
  });

  const filteredPets = useMemo(() => {
    if (!searchQuery.trim()) return pets;
    const query = searchQuery.toLowerCase();
    return pets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(query) ||
        pet.type.toLowerCase().includes(query) ||
        pet.vetName.toLowerCase().includes(query) ||
        pet.vetPhone.includes(query) ||
        pet.notes.toLowerCase().includes(query)
    );
  }, [pets, searchQuery]);

  const resetForm = () => {
    setFormData({ name: '', type: '', vetName: '', vetPhone: '', notes: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingId) {
      // Update existing pet
      onUpdate(
        pets.map((pet) =>
          pet.id === editingId
            ? { ...pet, ...formData }
            : pet
        )
      );
    } else {
      // Add new pet
      const newPet: Pet = {
        id: Date.now().toString(),
        ...formData,
      };
      onUpdate([...pets, newPet]);
    }
    resetForm();
  };

  const handleEdit = (pet: Pet) => {
    setFormData({
      name: pet.name,
      type: pet.type,
      vetName: pet.vetName,
      vetPhone: pet.vetPhone,
      notes: pet.notes,
    });
    setEditingId(pet.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate(pets.filter((pet) => pet.id !== id));
  };

  return (
    <>
      <section className="bg-pink-100/60 backdrop-blur-sm rounded-xl shadow-md border border-pink-200/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div 
          className="flex items-center justify-between p-6 cursor-pointer bg-gradient-to-r from-pink-100/70 to-rose-100/70 backdrop-blur-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-200/60 rounded-lg backdrop-blur-sm">
              <HeartIcon className="w-6 h-6 text-pink-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Pets</h2>
              <p className="text-sm text-slate-600">{pets.length} pet{pets.length !== 1 ? 's' : ''}</p>
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
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
              >
                <PlusIcon className="w-4 h-4" />
                Add Pet
              </button>
            )}

            {isAdding && (
              <div className="p-4 bg-gradient-to-br from-pink-100/60 to-rose-100/60 backdrop-blur-sm rounded-lg border-2 border-pink-200/60 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">
                  {editingId ? 'Edit Pet' : 'Add New Pet'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-pink-50/60 backdrop-blur-sm border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-400 transition-all text-slate-700 placeholder-slate-500"
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
                      className="w-full px-3 py-2 bg-pink-50/60 backdrop-blur-sm border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="Dog, Cat, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Vet Name
                    </label>
                    <input
                      type="text"
                      value={formData.vetName}
                      onChange={(e) => setFormData({ ...formData, vetName: e.target.value })}
                      className="w-full px-3 py-2 bg-pink-50/60 backdrop-blur-sm border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="Dr. Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Vet Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.vetPhone}
                      onChange={(e) => setFormData({ ...formData, vetPhone: formatPhoneNumber(e.target.value) })}
                      className="w-full px-3 py-2 bg-pink-50/60 backdrop-blur-sm border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="(555) 123-4567"
                      maxLength={14}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-pink-50/60 backdrop-blur-sm border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="Additional information"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
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

            {filteredPets.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                {searchQuery ? 'No pets match your search.' : 'No pets added yet.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPets.map((pet) => (
                  <div
                    key={pet.id}
                    className="p-4 bg-gradient-to-br from-pink-50/80 to-rose-50/80 backdrop-blur-sm rounded-lg border border-pink-200/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-slate-800">{pet.name}</h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(pet)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-all duration-200"
                          title="Edit pet"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, petId: pet.id })}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                          title="Delete pet"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {pet.type && (
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="font-semibold">Type:</span> {pet.type}
                      </p>
                    )}
                    {pet.vetName && (
                      <p className="text-sm text-slate-600 mb-1">
                        <span className="font-semibold">Vet:</span> {pet.vetName}
                      </p>
                    )}
                    {pet.vetPhone && (
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="font-semibold">Phone:</span>{' '}
                        <a href={`tel:${pet.vetPhone.replace(/\D/g, '')}`} className="text-pink-600 hover:text-pink-700">
                          {pet.vetPhone}
                        </a>
                      </p>
                    )}
                    {pet.notes && (
                      <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-pink-200/40">
                        <span className="font-semibold">Notes:</span> {pet.notes}
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
        onClose={() => setDeleteModal({ isOpen: false, petId: null })}
        onConfirm={() => {
          if (deleteModal.petId) {
            handleDelete(deleteModal.petId);
          }
        }}
        title="Delete Pet"
        message="Are you sure you want to delete this pet? This action cannot be undone."
      />
    </>
  );
}

export default PetsSection;
