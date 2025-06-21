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
  Workflow
} from '../model/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private jsonBasePath = './assets/data/';

  constructor(private http: HttpClient,@Inject(DOCUMENT) private document: Document) {}

  getPolicyDetails(policyNumber: string): Observable<Policy> {
    return this.http.get<{ttContractDetailsView: PolicyDetail[]}>(
      `${this.jsonBasePath}contract_detail_view.json`
    ).pipe(
      map(response => this.mapPolicyDetails(response.ttContractDetailsView[0], policyNumber)),
      catchError(this.handleError)
    );
  }

  getPolicyComponents(policyNumber: string): Observable<ContractComponent[]> {
    return this.http.get<{contractcomponentview: {ttContractComponentView: ContractComponent[]}}>(
      `${this.jsonBasePath}components.json`
    ).pipe(
      map(response => response.contractcomponentview.ttContractComponentView),
      catchError(this.handleError)
    );
  }

  getPolicyTimeline(policyNumber: string): Observable<TimelineEvent[]> {
    return this.http.get<{Elements: TimelineEvent[]}>(
      `${this.jsonBasePath}time_line.json`
    ).pipe(
      map(response => response.Elements),
      catchError(this.handleError)
    );
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
    return this.http.get<{entityincidentsview: {ttEntityIncidentsView: Claim[]}}>(
      `${this.jsonBasePath}claims.json`
    ).pipe(
      map(response => response.entityincidentsview.ttEntityIncidentsView),
      catchError(this.handleError)
    );
  }

  getPolicyWorkflows(policyNumber: string): Observable<Workflow[]> {
    return this.http.get<{entityworkflowsview: {ttEntityWorkflowsView: Workflow[]}}>(
      `${this.jsonBasePath}workflows.json`
    ).pipe(
      map(response => response.entityworkflowsview.ttEntityWorkflowsView),
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