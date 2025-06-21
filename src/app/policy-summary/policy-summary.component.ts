import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Policy } from '../common/model/policy.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-policy-summary',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatProgressSpinnerModule],
  templateUrl: './policy-summary.component.html',
  styleUrl: './policy-summary.component.css'
})
export class PolicySummaryComponent {

  @Input() policy?: Policy ;
  
  get statusClass() {
      if (!this.policy) return {};
    return {
      'active': this.policy.status === 'In-Force',
      'lapsed': this.policy.status === 'Lapsed',
      'cancelled': this.policy.status === 'Cancelled'
    };
  }

    get premiumAmount(): string {
      if(this.policy== null) return '';
    return this.policy.premium.toLocaleString('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    });
  }

  get termYears(): string {
          if(this.policy== null) return '';
    const years = parseFloat(this.policy.term);
    return `${years.toFixed(1)} years`;
  }
}
