import { Component } from '@angular/core';
import { Claim } from '../common/model/policy.model';
import { PolicyService } from '../common/services/policy.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-claims-movement',
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './claims-movement.component.html',
  styleUrl: './claims-movement.component.css',
})
export class ClaimsMovementComponent {
  claims: Claim[] = [];
  isLoading = true;
  displayedColumns: string[] = [
    'reference',
    'details',
    'amount',
    'status',
    'actions',
  ];

  constructor(private policyService: PolicyService,    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.isLoading = true;
    this.policyService.getPolicyClaims('').subscribe({
      next: (claims) => {
        this.claims = claims.sort(
          (a, b) =>
            new Date(b.claimDate).getTime() - new Date(a.claimDate).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load claims', err);
        this.isLoading = false;
      },
    });

    // console.log("Masego Claim:" + this.claims[0].settlementAmount);
  }

  getStatusIcon(claimStatus: string): string {
    if (claimStatus.toLowerCase().includes('paid')) return 'check_circle';
    if (claimStatus.toLowerCase().includes('pending')) return 'pending';
    if (claimStatus.toLowerCase().includes('rejected')) return 'cancel';
    return 'help';
  }

  getStatusColor(claimStatus: string): string {
    if (claimStatus.toLowerCase().includes('paid')) return 'primary';
    if (claimStatus.toLowerCase().includes('pending')) return 'accent';
    if (claimStatus.toLowerCase().includes('rejected')) return 'warn';
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
