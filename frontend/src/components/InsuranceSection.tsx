import { useState } from 'react';
import type { InsurancePolicy } from '../types';

interface InsuranceSectionProps {
  insurancePolicies: InsurancePolicy[];
  onUpdate: (insurancePolicies: InsurancePolicy[]) => void;
}

function InsuranceSection({ insurancePolicies, onUpdate }: InsuranceSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    provider: '',
    policyNumber: '',
    phone: '',
  });

  const handleAdd = () => {
    if (!formData.type.trim() || !formData.provider.trim()) return;

    const newPolicy: InsurancePolicy = {
      id: Date.now().toString(),
      ...formData,
    };

    onUpdate([...insurancePolicies, newPolicy]);
    setFormData({ type: '', provider: '', policyNumber: '', phone: '' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(insurancePolicies.filter((policy) => policy.id !== id));
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Insurance</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Add Policy
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type *
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Health, Auto, Home, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Provider *
              </label>
              <input
                type="text"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Insurance Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Policy Number
              </label>
              <input
                type="text"
                value={formData.policyNumber}
                onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="POL-123456"
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
                setFormData({ type: '', provider: '', policyNumber: '', phone: '' });
              }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {insurancePolicies.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No insurance policies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insurancePolicies.map((policy) => (
            <div
              key={policy.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800">{policy.type}</h3>
                <button
                  onClick={() => handleDelete(policy.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-1">
                <span className="font-medium">Provider:</span> {policy.provider}
              </p>
              {policy.policyNumber && (
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">Policy #:</span> {policy.policyNumber}
                </p>
              )}
              {policy.phone && (
                <p className="text-sm text-slate-600 mt-2">
                  <span className="font-medium">Phone:</span> {policy.phone}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default InsuranceSection;

