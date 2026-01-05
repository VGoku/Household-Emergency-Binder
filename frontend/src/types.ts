// Type definitions for data shapes used across the app
export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  notes: string;
}

export interface Medication {
  id: string;
  person: string;
  medication: string;
  dosage: string;
  notes: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  vetName: string;
  vetPhone: string;
  notes: string;
}

export interface InsurancePolicy {
  id: string;
  type: string;
  provider: string;
  policyNumber: string;
  phone: string;
}

export interface Note {
  id: string;
  content: string;
}

export interface EmergencyBinderData {
  contacts: Contact[];
  medications: Medication[];
  pets: Pet[];
  insurancePolicies: InsurancePolicy[];
  notes: Note[];
  backgroundImage?: string;
}

