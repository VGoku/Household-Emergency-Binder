import { useState, useMemo } from 'react';
import { UserIcon, PlusIcon, TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { Contact } from '../types';
import { formatPhoneNumber } from '../utils/phoneFormatter';
import ConfirmModal from './ConfirmModal';

interface ContactsSectionProps {
  contacts: Contact[];
  onUpdate: (contacts: Contact[]) => void;
  searchQuery?: string;
}

function ContactsSection({ contacts, onUpdate, searchQuery = '' }: ContactsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; contactId: string | null }>({
    isOpen: false,
    contactId: null,
  });
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    notes: '',
  });

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    const query = searchQuery.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.relationship.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.notes.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  const resetForm = () => {
    setFormData({ name: '', relationship: '', phone: '', notes: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingId) {
      onUpdate(
        contacts.map((contact) =>
          contact.id === editingId
            ? { ...contact, ...formData }
            : contact
        )
      );
    } else {
      const newContact: Contact = {
        id: Date.now().toString(),
        ...formData,
      };
      onUpdate([...contacts, newContact]);
    }
    resetForm();
  };

  const handleEdit = (contact: Contact) => {
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      notes: contact.notes,
    });
    setEditingId(contact.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <>
      <section className="bg-blue-100/60 backdrop-blur-sm rounded-xl shadow-md border border-blue-200/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div 
          className="flex items-center justify-between p-6 cursor-pointer bg-gradient-to-r from-blue-100/70 to-cyan-100/70 backdrop-blur-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-200/60 rounded-lg backdrop-blur-sm">
              <UserIcon className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Contacts</h2>
              <p className="text-sm text-slate-600">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</p>
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
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
              >
                <PlusIcon className="w-4 h-4" />
                Add Contact
              </button>
            )}

            {isAdding && (
              <div className="p-4 bg-gradient-to-br from-blue-100/60 to-cyan-100/60 backdrop-blur-sm rounded-lg border-2 border-blue-200/60 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">
                  {editingId ? 'Edit Contact' : 'Add New Contact'}
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
                      className="w-full px-3 py-2 bg-blue-50/60 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="w-full px-3 py-2 bg-blue-50/60 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="Spouse, Doctor, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                      className="w-full px-3 py-2 bg-blue-50/60 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="(555) 123-4567"
                      maxLength={14}
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
                      className="w-full px-3 py-2 bg-blue-50/60 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="Additional information"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                  >
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-slate-200/70 hover:bg-slate-300/70 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200 text-sm font-medium backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {filteredContacts.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                {searchQuery ? 'No contacts match your search.' : 'No contacts added yet.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-lg border border-blue-200/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-slate-800">{contact.name}</h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-100/60 rounded transition-all duration-200"
                          title="Edit contact"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, contactId: contact.id })}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100/60 rounded transition-all duration-200"
                          title="Delete contact"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {contact.relationship && (
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="font-semibold">Relationship:</span> {contact.relationship}
                      </p>
                    )}
                    {contact.phone && (
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="font-semibold">Phone:</span>{' '}
                        <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-blue-600 hover:text-blue-700">
                          {contact.phone}
                        </a>
                      </p>
                    )}
                    {contact.notes && (
                      <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-blue-200/40">
                        <span className="font-semibold">Notes:</span> {contact.notes}
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
        onClose={() => setDeleteModal({ isOpen: false, contactId: null })}
        onConfirm={() => {
          if (deleteModal.contactId) {
            handleDelete(deleteModal.contactId);
          }
        }}
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
      />
    </>
  );
}

export default ContactsSection;
