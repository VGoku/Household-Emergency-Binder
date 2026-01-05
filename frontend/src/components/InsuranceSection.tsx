// Insurance section: manage insurance policies and contact numbers
import { useState, useMemo } from 'react';
import { ShieldCheckIcon, PlusIcon, TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { InsurancePolicy } from '../types';
import { formatPhoneNumber } from '../utils/phoneFormatter';
import ConfirmModal from './ConfirmModal';

interface InsuranceSectionProps {
  insurancePolicies: InsurancePolicy[];
  onUpdate: (insurancePolicies: InsurancePolicy[]) => void;
  searchQuery?: string;
}

function InsuranceSection({ insurancePolicies, onUpdate, searchQuery = '' }: InsuranceSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; policyId: string | null }>({
    isOpen: false,
    policyId: null,
  });
  const [formData, setFormData] = useState({
    type: '',
    provider: '',
    policyNumber: '',
    phone: '',
  });

  const filteredPolicies = useMemo(() => {
    if (!searchQuery.trim()) return insurancePolicies;
    const query = searchQuery.toLowerCase();
    return insurancePolicies.filter(
      (policy) =>
        policy.type.toLowerCase().includes(query) ||
        policy.provider.toLowerCase().includes(query) ||
        policy.policyNumber.toLowerCase().includes(query) ||
        policy.phone.includes(query)
    );
  }, [insurancePolicies, searchQuery]);

  const resetForm = () => {
    setFormData({ type: '', provider: '', policyNumber: '', phone: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.type.trim() || !formData.provider.trim()) return;

    if (editingId) {
      onUpdate(
        insurancePolicies.map((policy) =>
          policy.id === editingId
            ? { ...policy, ...formData }
            : policy
        )
      );
    } else {
      const newPolicy: InsurancePolicy = {
        id: Date.now().toString(),
        ...formData,
      };
      onUpdate([...insurancePolicies, newPolicy]);
    }
    resetForm();
  };

  const handleEdit = (policy: InsurancePolicy) => {
    setFormData({
      type: policy.type,
      provider: policy.provider,
      policyNumber: policy.policyNumber,
      phone: policy.phone,
    });
    setEditingId(policy.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    onUpdate(insurancePolicies.filter((policy) => policy.id !== id));
  };

  return (
    <>
      <section className="bg-emerald-100/60 backdrop-blur-sm rounded-xl shadow-md border border-emerald-200/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div 
          className="flex items-center justify-between p-6 cursor-pointer bg-gradient-to-r from-emerald-100/70 to-teal-100/70 backdrop-blur-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-200/60 rounded-lg backdrop-blur-sm">
              <ShieldCheckIcon className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Insurance</h2>
              <p className="text-sm text-slate-600">{insurancePolicies.length} polic{insurancePolicies.length !== 1 ? 'ies' : 'y'}</p>
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
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
              >
                <PlusIcon className="w-4 h-4" />
                Add Policy
              </button>
            )}

            {isAdding && (
              <div className="p-4 bg-gradient-to-br from-emerald-100/60 to-teal-100/60 backdrop-blur-sm rounded-lg border-2 border-emerald-200/60 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">
                  {editingId ? 'Edit Policy' : 'Add New Policy'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Type *
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 bg-emerald-50/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all text-slate-700 placeholder-slate-500"
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
                      className="w-full px-3 py-2 bg-emerald-50/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all text-slate-700 placeholder-slate-500"
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
                      className="w-full px-3 py-2 bg-emerald-50/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all text-slate-700 placeholder-slate-500"
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
                      onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                      className="w-full px-3 py-2 bg-emerald-50/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all text-slate-700 placeholder-slate-500"
                      placeholder="(555) 123-4567"
                      maxLength={14}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
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

            {filteredPolicies.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                {searchQuery ? 'No policies match your search.' : 'No insurance policies added yet.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPolicies.map((policy) => (
                  <div
                    key={policy.id}
                    className="p-4 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-lg border border-emerald-200/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-slate-800">{policy.type}</h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(policy)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-all duration-200"
                          title="Edit policy"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, policyId: policy.id })}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                          title="Delete policy"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-semibold">Provider:</span> {policy.provider}
                    </p>
                    {policy.policyNumber && (
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="font-semibold">Policy #:</span> {policy.policyNumber}
                      </p>
                    )}
                    {policy.phone && (
                      <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-emerald-200/40">
                        <span className="font-semibold">Phone:</span>{' '}
                        <a href={`tel:${policy.phone.replace(/\D/g, '')}`} className="text-emerald-600 hover:text-emerald-700">
                          {policy.phone}
                        </a>
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
        onClose={() => setDeleteModal({ isOpen: false, policyId: null })}
        onConfirm={() => {
          if (deleteModal.policyId) {
            handleDelete(deleteModal.policyId);
          }
        }}
        title="Delete Insurance Policy"
        message="Are you sure you want to delete this insurance policy? This action cannot be undone."
      />
    </>
  );
}

export default InsuranceSection;
