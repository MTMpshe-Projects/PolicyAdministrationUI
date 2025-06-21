import { Benefit } from "./benefit.model";

// policy.model.ts
export interface Policy {
  number: string;
  product: string;
  status: string;
  commencementDate: string;
  maturityDate: string;
  premium: number;
  frequency: string;
  term: string;
  arrears?: number;
}

export interface PolicyDetail {
  contractNumber: string;
  productLabel: string;
  contractStatus: string;
  commencementDate: string;
  maturityDate: string;
  actualRecurringCollection?: string;
  collectionFrequency: string;
  contractTerm: string;
  numberOfPremiumsInArrearsAdvance?: number;
  [key: string]: any;
}

export interface ContractComponent {
  contract_component_obj: number;
  component_label: string;
  contract_component_premium: number;
  single_payment_amount: number;
  contract_component_start_date: string;
  contract_component_end_date: string | null;
}

export interface TimelineEvent {
  Type: string;
  TypeLabel: string;
  Description: string;
  Start: string;
  End: string | null;
  Label: string;
}

export interface ContractRole {
  roleDescription: string;
  entityName: string;
  dateOfBirth: string;
  relationship: string;
  cellphone: string;
  email: string;
}

export interface Claim {
  claimReference: string;
  claimDate: string;
  claimType: string;
  settlementAmount: number;
  claimStatus: string;
}

export interface Workflow {
  processLogReference: string;
  processLabel: string;
  statusLabel: string;
  createdDateTime: string;
}

