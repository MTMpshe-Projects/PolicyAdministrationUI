import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ContractRole } from '../common/model/policy.model';
import { PolicyService } from '../common/services/policy.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  imports: [
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  roles: ContractRole[] = [];
  isLoading = true;
  displayedColumns: string[] = ['role', 'person', 'contact', 'period'];

  constructor(private policyService: PolicyService) {}

  
  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.policyService.getPolicyRoles('').subscribe({
      next: (roles) => {
        this.roles = roles;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load roles', err);
        this.isLoading = false;
      }
    });
  }
}
