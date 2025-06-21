import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Policy } from '../common/model/policy.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Tab } from '../common/model/tab.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-policy-header',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule,MatIconModule],
  templateUrl: './policy-header.component.html',
  styleUrl: './policy-header.component.css'
})
export class PolicyHeaderComponent {

@Input() policy? :Policy ;
@Input() claimsCount: number = 0;


  tabs :Tab[] =  [
  { id: 'summary', icon: '📋', label: 'Summary' },
  { id: 'roles', icon: '👥', label: 'Role Players' },
  { id: 'timeline', icon: '📅', label: 'Timeline' },
  { id: 'benefits', icon: '💼', label: 'Benefits' },
  { id: 'claims', icon: '📝', label: 'Claims' },
  { id: 'settings', icon: '⚙️', label: 'Settings' }
];

activeTab = 'summary';
@Output() tabChanged = new EventEmitter<string>();


  statusClass() {

    if (this.policy == null) {return;}
    return {
      'status-active': this.policy.status === 'In-Force',
      'status-lapsed': this.policy.status === 'Lapsed',
      'status-cancelled': this.policy.status === 'Cancelled'
    };
  }

   // Add this getter to format the premium amount
  get formattedPremium(): string {
       if (this.policy == null) {return '';}
    return this.policy.premium.toLocaleString('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    });
  }
  selectTab(tabId: string): void {
    // Prevent selection if tab is disabled
    const selectedTab = this.tabs.find(tab => tab.id === tabId);
    if (!selectedTab || selectedTab.disabled) return;

    // Update active tab
    this.activeTab = tabId;
    
    // Emit event to parent component
    this.tabChanged.emit(tabId);
    
    // Add analytics tracking (example)
    this.trackTabChange(tabId);
    
    // Optional: Scroll to content section
    this.scrollToContent();
  }

  private trackTabChange(tabId: string): void {
    console.log(`Tab changed to: ${tabId}`);
    // Implement actual analytics tracking here
  }

  private scrollToContent(): void {
    setTimeout(() => {
      const contentElement = document.querySelector('.content-section');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

}
