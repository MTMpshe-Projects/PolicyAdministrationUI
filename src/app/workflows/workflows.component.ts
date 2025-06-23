import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { Workflow } from '../common/model/policy.model';
import { PolicyService } from '../common/services/policy.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-workflows',
  imports: [
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './workflows.component.html',
  styleUrl: './workflows.component.css',
})
export class WorkflowsComponent {
  workflows: Workflow[] = [];
  isLoading = true;
  displayedColumns: string[] = ['status', 'process', 'dates', 'actions'];

  constructor(private policyService: PolicyService) {}

ngOnInit(): void {
    this.loadWorkflows();
  }

   loadWorkflows(): void {
    this.isLoading = true;
    this.policyService.getPolicyWorkflows('').subscribe({
      next: (workflows) => {
        this.workflows = workflows.sort((a, b) => 
          new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load workflows', err);
        this.isLoading = false;
      }
    });
  }
 getStatusIcon(statusLabel: string): string {
    switch(statusLabel.toLowerCase()) {
      case 'complete': return 'check_circle';
      case 'abandon': return 'cancel';
      case 'in progress': return 'hourglass_empty';
      default: return 'help';
    }
  }

  getStatusColor(statusLabel: string): string {
    switch(statusLabel.toLowerCase()) {
      case 'complete': return 'primary';
      case 'abandon': return 'warn';
      case 'in progress': return 'accent';
      default: return '';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

}
