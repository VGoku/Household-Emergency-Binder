import { useState } from 'react';
import type { Contact } from '../types';

interface ContactsSectionProps {
  contacts: Contact[];
  onUpdate: (contacts: Contact[]) => void;
}

function ContactsSection({ contacts, onUpdate }: ContactsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    notes: '',
  });

  const handleAdd = () => {
    if (!formData.name.trim()) return;

    const newContact: Contact = {
      id: Date.now().toString(),
      ...formData,
    };

    onUpdate([...contacts, newContact]);
    setFormData({ name: '', relationship: '', phone: '', notes: '' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Contacts</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Add Contact
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(555) 123-4567"
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
                setFormData({ name: '', relationship: '', phone: '', notes: '' });
              }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {contacts.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No contacts added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800">{contact.name}</h3>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              {contact.relationship && (
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">Relationship:</span> {contact.relationship}
                </p>
              )}
              {contact.phone && (
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">Phone:</span> {contact.phone}
                </p>
              )}
              {contact.notes && (
                <p className="text-sm text-slate-600 mt-2">
                  <span className="font-medium">Notes:</span> {contact.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ContactsSection;

