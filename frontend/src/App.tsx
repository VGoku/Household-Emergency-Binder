import { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactsSection from './components/ContactsSection';
import MedicationsSection from './components/MedicationsSection';
import PetsSection from './components/PetsSection';
import InsuranceSection from './components/InsuranceSection';
import NotesSection from './components/NotesSection';
import type { EmergencyBinderData } from './types';

const STORAGE_KEY = 'emergencyBinder';

const defaultData: EmergencyBinderData = {
  contacts: [],
  medications: [],
  pets: [],
  insurancePolicies: [],
  notes: '',
};

function App() {
  const [data, setData] = useState<EmergencyBinderData>(defaultData);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (error) {
        console.error('Error loading data from LocalStorage:', error);
      }
    }
  }, []);

  // Auto-save to LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (newData: EmergencyBinderData) => {
    setData(newData);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <ContactsSection
            contacts={data.contacts}
            onUpdate={(contacts) => updateData({ ...data, contacts })}
          />
          <MedicationsSection
            medications={data.medications}
            onUpdate={(medications) => updateData({ ...data, medications })}
          />
          <PetsSection
            pets={data.pets}
            onUpdate={(pets) => updateData({ ...data, pets })}
          />
          <InsuranceSection
            insurancePolicies={data.insurancePolicies}
            onUpdate={(insurancePolicies) => updateData({ ...data, insurancePolicies })}
          />
          <NotesSection
            notes={data.notes}
            onUpdate={(notes) => updateData({ ...data, notes })}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
