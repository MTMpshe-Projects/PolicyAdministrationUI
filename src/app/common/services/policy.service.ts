import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { 
  Policy, 
  PolicyDetail, 
  ContractComponent, 
  TimelineEvent,
  ContractRole,
  Claim,
  Workflow,
  Transaction,
  PolicyComponent,
  StatusHistory
} from '../model/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private jsonBasePath = './assets/data/';

  constructor(private http: HttpClient,@Inject(DOCUMENT) private document: Document) {}


  
  getPolicyDetails(): Observable<Policy> {

    return this.http.get<{ttContractDetailsView: PolicyDetail[]}>( `${this.jsonBasePath}contract_detail_view.json`).pipe(
      map(response => this.transformPolicyDetail(response.ttContractDetailsView[0]))
    );
  }

  getTransactions(policyNumber: string): Observable<Transaction[]> {
  return this.http.get<{contracttransactionsview: {ttContractTransactionsView: any[]}}>(
    `${this.jsonBasePath}transactions.json`
  ).pipe(
    map(response => {
      return response.contracttransactionsview.ttContractTransactionsView.map(transaction => ({
        id: transaction.accountTransactionObj,
        date: transaction.transactionDate,
        type: transaction.transactionTypeDescription,
        amount: transaction.amount,
        status: transaction.systemStatusDescription,
        reference: transaction.batchReference || transaction.transactionSequence.toString(),
        method: transaction.accountTypeDescription,
        effectiveDate: transaction.effectiveDate,
        dueDate: transaction.dueDate
      }));
    }),
    catchError(this.handleError)
  );
}

  private transformPolicyDetail(detail: PolicyDetail): Policy {
    return {
      number: detail.contractNumber,
      product: detail.productLabel,
      status: detail.contractStatus,
      commencementDate: detail.commencementDate,
      maturityDate: detail.maturityDate,
      premium: this.parseCurrency(detail.actualRecurringCollection),
      frequency: detail.collectionFrequency,
      term: detail.contractTerm,
      arrears: detail.numberOfPremiumsInArrearsAdvance
    };
  }

  private parseCurrency(value?: string): number {
    if (!value) return 0;
    // Remove whitespace and parse (e.g., "              0.00" → 0)
    return parseFloat(value.replace(/\s+/g, ''));
  }

  getStatusHistory(policyNumber: string): Observable<StatusHistory[]> {
  return this.http.get<{entitystatushistoryview: {ttEntityStatusHistoryView: any[]}}>(
    `${this.jsonBasePath}status_history.json`
  ).pipe(
    map(response => {
      return response.entitystatushistoryview.ttEntityStatusHistoryView.map(history => ({
        id: history.statusHistoryObj,
        changedDate: history.changedDate,
        changedTime: history.changedTime,
        effectiveDate: history.effectiveDate,
        statusDescription: history.statusDescription,
        statusNotes: history.statusNotes,
        username: history.username,
        fiscalPeriodDate: history.fiscalPeriodDate
      }));
    }),
    catchError(this.handleError)
  );
}
  
getPolicyComponents(policyNumber: string): Observable<PolicyComponent[]> {
  return this.http.get<{contractcomponentview: {ttContractComponentView: any[]}}>(
    `${this.jsonBasePath}components.json`
  ).pipe(
    map(response => {
      return response.contractcomponentview.ttContractComponentView.map(component => ({
        id: component.contract_component_obj,
        label: component.component_label,
        startDate: component.contract_component_start_date,
        endDate: component.contract_component_end_date,
        premium: component.contract_component_premium,
        singlePaymentAmount: component.single_payment_amount,
        recurringPaymentAmount: component.recurring_payment_amount,
        parentId: component.parent_contract_component_obj,
        movementLabel: component.on_movement_label,
        hasChildRecords: component.HasChildRecords
      }));
    }),
    catchError(this.handleError)
  );
}

 // In your policy service (or component):
getPolicyTimeline(policyNumber: string): Observable<TimelineEvent[]> {
  return this.http.get<{Elements: any[]}>(`${this.jsonBasePath}time_line.json`).pipe(
    map(response => response.Elements.map(element => {
      const label = JSON.parse(element.Label);
      return {
        date: new Date(label.EffectiveDate),
        title: element.Description,
        description: `Type: ${label.MovementType}`,
        icon: this.getMovementIcon(label.MovementType),
        status: 'completed' // Default status
      } as TimelineEvent;
    })),
    catchError(this.handleError)
  );
}

private getMovementIcon(movementType: string): string {
  switch(movementType) {
    case 'NBU': return 'note_add'; // New Business
    case 'RER': return 'sync';     // Rerate
    case 'ADH': return 'warning';  // Adhoc
    default: return 'help';
  }
}

  getPolicyRoles(policyNumber: string): Observable<ContractRole[]> {
    return this.http.get<{contractrolesview: {ttContractRolesView: ContractRole[]}}>(
      `${this.jsonBasePath}roles.json`
    ).pipe(
      map(response => response.contractrolesview.ttContractRolesView),
      catchError(this.handleError)
    );
  }

getPolicyClaims(policyNumber: string): Observable<Claim[]> {
  return this.http.get<{entityincidentsview: {ttEntityIncidentsView: any[]}}>(
    `${this.jsonBasePath}claims.json`
  ).pipe(
    map(response => {
      return response.entityincidentsview.ttEntityIncidentsView.map(claim => ({
        incidentObj: claim.incidentObj,
        claimReference: claim.claimReference,
        claimStatus: claim.claimStatus,
        claimDate: claim.claimDate,
        claimEffectiveDate: claim.claimEffectiveDate,
        claimType: claim.claimType,
        coveredPartyName: claim.coveredPartyName,
        settlementAmount: claim.settlementAmount,
        statusDate: claim.statusDate,
        customURL: claim.customURL
      }));
    }),
    catchError(this.handleError)
  );
}

getPolicyWorkflows(policyNumber: string): Observable<Workflow[]> {
  return this.http.get<{entityworkflowsview: {ttEntityWorkflowsView: any[]}}>(
    `${this.jsonBasePath}workflows.json`
  ).pipe(
    map(response => {
      return response.entityworkflowsview.ttEntityWorkflowsView.map(workflow => ({
        processLogObj: workflow.processLogObj,
        processLogReference: workflow.processLogReference,
        processLabel: workflow.processLabel,
        statusLabel: workflow.statusLabel,
        createdDateTime: workflow.createdDateTime,
        completedDateTime: workflow.completedDateTime,
        owning_obj: workflow.owning_obj,
        owning_entity_mnemonic: workflow.owning_entity_mnemonic
      }));
    }),
    catchError(this.handleError)
  );
}

  private mapPolicyDetails(detail: PolicyDetail, policyNumber: string): Policy {
    return {
      number: policyNumber,
      product: detail.productLabel,
      status: detail.contractStatus,
      commencementDate: detail.commencementDate,
      maturityDate: detail.maturityDate,
      premium: parseFloat(detail.actualRecurringCollection?.replace(/\s+/g, '') || '0'),
      frequency: detail.collectionFrequency,
      term: detail.contractTerm,
      arrears: detail.numberOfPremiumsInArrearsAdvance
    };
  }


  
private handleError(error: any): Observable<never> {
  let errorMessage = 'An unknown error occurred';
  
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else if (error.status === 404) {
    errorMessage = 'Policy data not found';
  } else if (error.status === 0) {
    errorMessage = 'Could not connect to server';
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  
  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}


}