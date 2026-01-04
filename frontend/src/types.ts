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
  vetContact: string;
  notes: string;
}

export interface InsurancePolicy {
  id: string;
  type: string;
  provider: string;
  policyNumber: string;
  phone: string;
}

export interface EmergencyBinderData {
  contacts: Contact[];
  medications: Medication[];
  pets: Pet[];
  insurancePolicies: InsurancePolicy[];
  notes: string;
}

