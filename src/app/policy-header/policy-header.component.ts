import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Policy, PolicyDetail } from '../common/model/policy.model';
import { Tab } from '../common/model/tab.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-policy-header',
  imports: [CommonModule, MatIcon],
  templateUrl: './policy-header.component.html',
  styleUrl: './policy-header.component.css',
})
export class PolicyHeaderComponent {
  @Input() policy!: Policy | PolicyDetail;
  // @Input() policy :Policy ;
  @Input() claimsCount: number = 0;

  tabs: Tab[] = [
    { id: 'summary', icon: '📋', label: 'Summary' },
    { id: 'roles', icon: '👥', label: 'Role Players' },
    { id: 'timeline', icon: '📅', label: 'Timeline' },
    { id: 'benefits', icon: '💼', label: 'Benefits' },
    { id: 'claims', icon: '📝', label: 'Claims' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  activeTab = 'summary';
  @Output() tabChanged = new EventEmitter<string>();

  statusClass() {
    if (this.policy == null) {
      return;
    }
    return {
      'status-active': this.policy.status === 'In-Force',
      'status-lapsed': this.policy.status === 'Lapsed',
      'status-cancelled': this.policy.status === 'Cancelled',
    };
  }

  get formattedPremium(): string {
    const premium = this.getNumericPremium();
    return premium.toLocaleString('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    });
  }

  getStatusClass(): string {
    const status =
      'contractStatus' in this.policy
        ? this.policy.contractStatus.toLowerCase()
        : this.policy.status.toLowerCase();
    return status.replace(' ', '-');
  }

  getArrearsCount(): number {
    return 'numberOfPremiumsInArrearsAdvance' in this.policy
      ? this.policy.numberOfPremiumsInArrearsAdvance || 0
      : this.policy.arrears || 0;
  }

  private getNumericPremium(): number {
    if ('actualRecurringCollection' in this.policy) {
      const collection = this.policy.actualRecurringCollection?.replace(
        /\s+/g,
        ''
      );
      return collection ? parseFloat(collection) : 0;
    }
    return this.policy.premium || 0;
  }
}
