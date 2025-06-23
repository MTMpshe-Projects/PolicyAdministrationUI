import { Component } from '@angular/core';
import { PolicyComponent } from '../common/model/policy.model';
import { PolicyService } from '../common/services/policy.service';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-policy-components',
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './policy-components.component.html',
  styleUrl: './policy-components.component.css',
})
export class PolicyComponentsComponent {
  components: PolicyComponent[] = [];
  isLoading = true;
  displayedColumns: string[] = ['label', 'dates', 'payments', 'details'];

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadComponents();
  }

  loadComponents(): void {
    this.isLoading = true;
    this.policyService.getPolicyComponents('').subscribe({
      next: (components) => {
        this.components = this.buildComponentTree(components);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load components', err);
        this.isLoading = false;
      },
    });
  }

  buildComponentTree(components: PolicyComponent[]): PolicyComponent[] {
    const rootComponents = components.filter((c) => c.parentId === 0);
    return rootComponents.map((root) => ({
      ...root,
      children: components.filter((c) => c.parentId === root.id),
    }));
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-ZA', {
      // 'en-ZA' for South African locale
      style: 'currency',
      currency: 'ZAR', // South African Rand currency code
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  }

  getComponentIcon(component: PolicyComponent): string {
    if (component.hasChildRecords) return 'account_tree';
    if (component.singlePaymentAmount > 0) return 'monetization_on';
    return 'assignment';
  }
}
