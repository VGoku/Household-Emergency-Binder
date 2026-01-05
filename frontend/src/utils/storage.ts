// LocalStorage helpers: load, save, import, and export binder data
import type { EmergencyBinderData } from '../types';

const STORAGE_KEY = 'emergencyBinder';

export function loadFromStorage(): EmergencyBinderData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as EmergencyBinderData;
    }
  } catch (error) {
    console.error('Error loading data from LocalStorage:', error);
  }
  return null;
}

export function saveToStorage(data: EmergencyBinderData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to LocalStorage:', error);
  }
}

export function exportToJSON(data: EmergencyBinderData): string {
  return JSON.stringify(data, null, 2);
}

export function importFromJSON(jsonString: string): EmergencyBinderData | null {
  try {
    const parsedRaw = JSON.parse(jsonString) as unknown;

    // Basic shape checks
    if (
      typeof parsedRaw === 'object' && parsedRaw !== null
    ) {
      const parsedObj = parsedRaw as Record<string, unknown>;

      const contacts = parsedObj.contacts;
      const medications = parsedObj.medications;
      const pets = parsedObj.pets;
      const insurancePolicies = parsedObj.insurancePolicies;

      if (Array.isArray(contacts) && Array.isArray(medications) && Array.isArray(pets) && Array.isArray(insurancePolicies)) {
        // Normalize notes
        let notesValue = parsedObj.notes;
        if (typeof notesValue === 'string') {
          notesValue = notesValue.trim() ? [{ id: Date.now().toString(), content: notesValue }] : [];
        } else if (!Array.isArray(notesValue)) {
          notesValue = [];
        }

        // Migrate old pets format safely
        const normalizedPets = pets.map((petRaw) => {
          if (petRaw && typeof petRaw === 'object') {
            const pet = petRaw as Record<string, unknown>;
            const vetContact = pet.vetContact;
            const vetName = pet.vetName;
            const vetPhone = pet.vetPhone;

            if (typeof vetContact === 'string' && !vetName && !vetPhone) {
              const phoneMatch = vetContact.match(/\(?\d{3}\)?\s?-?\d{3}-?\d{4}/);
              if (phoneMatch) {
                const phone = phoneMatch[0];
                const name = vetContact.replace(phone, '').trim().replace(/^-\s*/, '');
                return { ...pet, vetName: name, vetPhone: phone } as Record<string, unknown>;
              }
              return { ...pet, vetName: vetContact, vetPhone: '' } as Record<string, unknown>;
            }
            return pet;
          }
          return petRaw;
        });

        const result: EmergencyBinderData = {
          contacts: contacts as unknown as EmergencyBinderData['contacts'],
          medications: medications as unknown as EmergencyBinderData['medications'],
          pets: normalizedPets as unknown as EmergencyBinderData['pets'],
          insurancePolicies: insurancePolicies as unknown as EmergencyBinderData['insurancePolicies'],
          notes: notesValue as unknown as EmergencyBinderData['notes'],
        };

        return result;
      }
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  return null;
}

