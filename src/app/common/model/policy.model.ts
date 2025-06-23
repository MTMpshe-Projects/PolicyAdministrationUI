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
  date: Date;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'pending';
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
  incidentObj: any;
  claimReference: string;
  claimStatus: string;
  claimDate: string;
  claimEffectiveDate: string;
  claimType: string;
  coveredPartyName: string;
  settlementAmount: number;
  statusDate: string;
  customURL: string;
}

export interface Workflow {
  processLogObj: any;
  processLogReference: string;
  processLabel: string;
  statusLabel: string;
  createdDateTime: string;
  completedDateTime?: string;
  owning_obj: any;
  owning_entity_mnemonic: string;
}

export interface Transaction {
  id: any;
  date: string;
  type: string;
  amount: number;
  status: string;
  reference: string;
  method: string;
  effectiveDate?: string;
  dueDate?: string;
}

export interface PolicyComponent {
  id: any;
  label: string;
  startDate: string;
  endDate?: string;
  premium: number;
  singlePaymentAmount: number;
  recurringPaymentAmount: number;
  parentId: any;
  movementLabel: string;
  hasChildRecords: boolean;
}

export interface StatusHistory {
  id: any;
  changedDate: string;
  changedTime: string;
  effectiveDate: string;
  statusDescription: string;
  statusNotes: string;
  username: string;
  fiscalPeriodDate: string;
}

