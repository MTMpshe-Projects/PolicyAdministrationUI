import { Component } from '@angular/core';
import {
  Claim,
  ContractRole,
  Policy,
  TimelineEvent,
} from '../common/model/policy.model';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from '../common/services/policy.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PolicyHeaderComponent } from '../policy-header/policy-header.component';

import { PolicySummaryComponent } from '../policy-summary/policy-summary.component';
import { PolicyTimelineComponent } from '../policy-timeline/policy-timeline.component';
import { RolesComponent } from '../roles/roles.component';
import { WorkflowsComponent } from '../workflows/workflows.component';
import { ClaimsMovementComponent } from '../claims-movement/claims-movement.component';
import { TransactionsComponent } from "../transactions/transactions.component";
import { PolicyComponentsComponent } from "../policy-components/policy-components.component";
import { StatusHistoryComponent } from "../status-history/status-history.component";

@Component({
  selector: 'app-policy-dashboard',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    PolicyHeaderComponent,
    PolicySummaryComponent,
    PolicyTimelineComponent,
    RolesComponent,
    WorkflowsComponent,
    ClaimsMovementComponent,
    TransactionsComponent,
    PolicyComponentsComponent,
    StatusHistoryComponent
],
  templateUrl: './policy-dashboard.component.html',
  styleUrl: './policy-dashboard.component.css',
})
export class PolicyDashboardComponent {
  policy: Policy | undefined;
  timelineEvents: TimelineEvent[] = [];
  roles: ContractRole[] = [];
  claims: Claim[] = [];
  loading = true;
  error: string | null = null;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    const policyNumber = '6000185'; // Would normally come from route
    console.log('testing');
    this.loadPolicyData(policyNumber);
  }

  loadPolicyData(policyNumber: string): void {
    this.loading = true;
    this.error = null;

    // Parallel data loading
    this.policyService.getPolicyDetails().subscribe({
      next: (policy) => {
        this.policy = policy;
        this.checkLoadingComplete();
      },
      error: (err) => this.handleError(err),
    });

    this.policyService.getPolicyTimeline(policyNumber).subscribe({
      next: (events) => {
        this.timelineEvents = events;
        this.checkLoadingComplete();
      },
      error: (err) => console.error('Timeline error:', err),
    });

    this.policyService.getPolicyRoles(policyNumber).subscribe({
      next: (roles) => {
        this.roles = roles;
        this.checkLoadingComplete();
      },
      error: (err) => console.error('Roles error:', err),
    });

    this.policyService.getPolicyClaims(policyNumber).subscribe({
      next: (claims) => {
        this.claims = claims;
        this.checkLoadingComplete();
      },
      error: (err) => console.error('Claims error:', err),
    });
  }

  private checkLoadingComplete(): void {
    if (this.policy && this.timelineEvents && this.roles && this.claims) {
      this.loading = false;
    }
  }

  private handleError(error: Error): void {
    this.error = error.message;
    this.loading = false;
  }

  refreshPolicy(): void {
    if (this.policy) {
      this.loadPolicyData(this.policy.number);
    }
  }
}
