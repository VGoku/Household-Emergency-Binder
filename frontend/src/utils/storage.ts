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
    const parsed = JSON.parse(jsonString) as any;
    // Validate structure
    if (
      Array.isArray(parsed.contacts) &&
      Array.isArray(parsed.medications) &&
      Array.isArray(parsed.pets) &&
      Array.isArray(parsed.insurancePolicies)
    ) {
      // Migrate old format if needed
      if (typeof parsed.notes === 'string') {
        parsed.notes = parsed.notes.trim()
          ? [{ id: Date.now().toString(), content: parsed.notes }]
          : [];
      } else if (!Array.isArray(parsed.notes)) {
        parsed.notes = [];
      }
      
      // Migrate old pets format
      if (parsed.pets && parsed.pets.length > 0) {
        parsed.pets = parsed.pets.map((pet: any) => {
          if (pet.vetContact && !pet.vetName && !pet.vetPhone) {
            const phoneMatch = pet.vetContact.match(/\(?\d{3}\)?\s?-?\d{3}-?\d{4}/);
            if (phoneMatch) {
              const phone = phoneMatch[0];
              const name = pet.vetContact.replace(phone, '').trim().replace(/^-\s*/, '');
              return { ...pet, vetName: name, vetPhone: phone };
            }
            return { ...pet, vetName: pet.vetContact, vetPhone: '' };
          }
          return pet;
        });
      }
      
      return parsed as EmergencyBinderData;
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  return null;
}

