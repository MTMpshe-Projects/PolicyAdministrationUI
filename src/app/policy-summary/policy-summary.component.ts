import { Component, Input } from '@angular/core';
import { ContractComponent, Policy } from '../common/model/policy.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-summary',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './policy-summary.component.html',
  styleUrl: './policy-summary.component.css',
})
export class PolicySummaryComponent {
  @Input() policy?: Policy;
  @Input() components?: ContractComponent[];

  get termYears(): string {
    if (this.policy == null) return '';
    const years = parseFloat(this.policy.term);
    return `${years.toFixed(1)} years`;
  }

  // Calculate policy term display
  get termDisplay(): string {
    if (this.policy == null) return '';

    const term =
      'contractTerm' in this.policy &&
      typeof this.policy.contractTerm === 'string'
        ? this.policy.contractTerm
        : typeof this.policy.term === 'string'
        ? this.policy.term
        : '';

    const years = parseFloat(term);
    return isNaN(years) ? term : `${years} years`;
  }

  // Calculate total coverage amount from components
  get totalCoverage(): number {
    return (
      this.components?.reduce(
        (sum, comp) => sum + (comp.single_payment_amount || 0),
        0
      ) || 0
    );
  }

    // Get arrears count (if available)
get arrears(): number | null {
    if (this.policy == null) return null;
    
    if ('numberOfPremiumsInArrearsAdvance' in this.policy) {
        const arrearsValue = this.policy.numberOfPremiumsInArrearsAdvance;
        return typeof arrearsValue === 'number' ? arrearsValue : null;
    }
    
    const fallbackArrears = this.policy.arrears;
    return typeof fallbackArrears === 'number' ? fallbackArrears : null;
}
}
