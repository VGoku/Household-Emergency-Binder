import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ContactsSection from './components/ContactsSection';
import MedicationsSection from './components/MedicationsSection';
import PetsSection from './components/PetsSection';
import InsuranceSection from './components/InsuranceSection';
import NotesSection from './components/NotesSection';
import SearchBar from './components/SearchBar';
import SavedIndicator from './components/SavedIndicator';
import BackgroundSettings from './components/BackgroundSettings';
import type { EmergencyBinderData } from './types';
import { loadFromStorage, saveToStorage, exportToJSON, importFromJSON } from './utils/storage';

const THEME_KEY = 'emergencyBinderTheme';

const defaultData: EmergencyBinderData = {
  contacts: [],
  medications: [],
  pets: [],
  insurancePolicies: [],
  notes: [],
  backgroundImage: undefined,
};

function App() {
  // Dark mode state - load from LocalStorage on first render
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved === 'dark';
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Lazy initialization - load from LocalStorage on first render
  const [data, setData] = useState<EmergencyBinderData>(() => {
    const saved = loadFromStorage();
    if (saved) {
      // Migrate old data format (notes as string) to new format (notes as Note[])
      if (typeof saved.notes === 'string') {
        saved.notes = saved.notes.trim()
          ? [{ id: Date.now().toString(), content: saved.notes }]
          : [];
      }
      // Migrate old pets format (vetContact) to new format (vetName, vetPhone)
      if (saved.pets && saved.pets.length > 0) {
        saved.pets = saved.pets.map((pet: any) => {
          if (pet.vetContact && !pet.vetName && !pet.vetPhone) {
            // Try to extract phone and name from vetContact
            const phoneMatch = pet.vetContact.match(/\(?\d{3}\)?\s?-?\d{3}-?\d{4}/);
            if (phoneMatch) {
              const phone = phoneMatch[0];
              const name = pet.vetContact.replace(phone, '').trim().replace(/^-\s*/, '');
              return { ...pet, vetName: name, vetPhone: phone, vetContact: undefined };
            }
            return { ...pet, vetName: pet.vetContact, vetPhone: '', vetContact: undefined };
          }
          return pet;
        });
      }
      return saved;
    }
    return defaultData;
  });

  const [savedIndicator, setSavedIndicator] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(() => {
    const saved = loadFromStorage();
    return saved ? new Date() : new Date();
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Auto-save to LocalStorage whenever data changes (but not on initial load)
  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    
    saveToStorage(data);
    setLastUpdated(new Date());
    setSavedIndicator(true);
    const timer = setTimeout(() => setSavedIndicator(false), 2000);
    return () => clearTimeout(timer);
  }, [data, isInitialMount]);

  const updateData = useCallback((newData: EmergencyBinderData) => {
    setData(newData);
  }, []);

  const handleExport = () => {
    const json = exportToJSON(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emergency-binder-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const jsonString = event.target?.result as string;
          const imported = importFromJSON(jsonString);
          if (imported) {
            setData(imported);
            setSavedIndicator(true);
            setTimeout(() => setSavedIndicator(false), 2000);
          } else {
            alert('Invalid file format. Please select a valid Emergency Binder backup file.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleBackgroundChange = useCallback((image: string | undefined) => {
    setData((prev) => ({ ...prev, backgroundImage: image }));
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundStyle = data.backgroundImage
    ? {
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-100/90 via-blue-100/60 to-cyan-100/60 relative"
      style={backgroundStyle}
    >
      {data.backgroundImage && (
        <div className="fixed inset-0 bg-blue-100/40 dark:bg-slate-900/40 z-0" />
      )}
      <div className="relative z-10">
        <Header 
          onExport={handleExport}
          onImport={handleImport}
          lastUpdated={lastUpdated}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <div className="flex items-center gap-3">
                <BackgroundSettings
                  backgroundImage={data.backgroundImage}
                  onBackgroundChange={handleBackgroundChange}
                />
                <SavedIndicator show={savedIndicator} />
              </div>
            </div>
          
          <ContactsSection
            contacts={data.contacts}
            onUpdate={(contacts) => updateData({ ...data, contacts })}
            searchQuery={searchQuery}
          />
          <MedicationsSection
            medications={data.medications}
            onUpdate={(medications) => updateData({ ...data, medications })}
            searchQuery={searchQuery}
          />
          <PetsSection
            pets={data.pets}
            onUpdate={(pets) => updateData({ ...data, pets })}
            searchQuery={searchQuery}
          />
          <InsuranceSection
            insurancePolicies={data.insurancePolicies}
            onUpdate={(insurancePolicies) => updateData({ ...data, insurancePolicies })}
            searchQuery={searchQuery}
          />
          <NotesSection
            notes={data.notes}
            onUpdate={(notes) => updateData({ ...data, notes })}
            searchQuery={searchQuery}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
