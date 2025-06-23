import { Component } from '@angular/core';
import { Transaction } from '../common/model/policy.model';
import { PolicyService } from '../common/services/policy.service';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-transactions',
   imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

    transactions: Transaction[] = [];
  isLoading = true;
  displayedColumns: string[] = ['date', 'type', 'amount', 'status', 'reference', 'method'];

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.policyService.getTransactions('').subscribe({
      next: (transactions) => {
        this.transactions = transactions.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load transactions', err);
        this.isLoading = false;
      }
    });
  }

  getTypeIcon(type: string): string {
    if (type.includes('Premium')) return 'attach_money';
    if (type.includes('Payment')) return 'payment';
    if (type.includes('Adjustment')) return 'calculate';
    if (type.includes('Refund')) return 'keyboard_return';
    return 'help';
  }

  getStatusColor(status: string): string {
    if (status.includes('Reversal')) return 'warn';
    if (status.includes('Captured')) return 'primary';
    if (status.includes('New')) return 'accent';
    return '';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
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

}
