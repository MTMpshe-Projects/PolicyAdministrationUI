import { Component } from '@angular/core';
import { StatusHistory } from '../common/model/policy.model';
import { PolicyService } from '../common/services/policy.service';


import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-status-history',
  imports: [   
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule],
  templateUrl: './status-history.component.html',
  styleUrl: './status-history.component.css'
})
export class StatusHistoryComponent {
  statusHistory: StatusHistory[] = [];
  isLoading = true;
  displayedColumns: string[] = ['date', 'status', 'details', 'user'];

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadStatusHistory();
  }

  loadStatusHistory(): void {
    this.isLoading = true;
    this.policyService.getStatusHistory('').subscribe({
      next: (history) => {
        this.statusHistory = history.sort((a, b) => 
          new Date(b.changedDate + ' ' + b.changedTime).getTime() - 
          new Date(a.changedDate + ' ' + a.changedTime).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load status history', err);
        this.isLoading = false;
      }
    });
  }

  formatDateTime(date: string, time: string): string {
    if (!date || !time) return '';
    const dateTime = new Date(date + ' ' + time);
    return dateTime.toLocaleString();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  getStatusIcon(status: string): string {
    if (status.includes('Upgrade')) return 'trending_up';
    if (status.includes('In-Force')) return 'check_circle';
    if (status.includes('Complete')) return 'done_all';
    return 'history';
  }

  getStatusColor(status: string): string {
    if (status.includes('Upgrade')) return 'accent';
    if (status.includes('In-Force')) return 'primary';
    if (status.includes('Complete')) return 'primary';
    return '';
  }

}
