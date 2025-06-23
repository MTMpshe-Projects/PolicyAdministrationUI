import { Component, Input } from '@angular/core';
import {TimelineEvent } from '../common/model/policy.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PolicyService } from '../common/services/policy.service';


@Component({
  selector: 'app-policy-timeline',
  imports: [CommonModule,MatIcon],
  templateUrl: './policy-timeline.component.html',
  styleUrl: './policy-timeline.component.css'
})
export class PolicyTimelineComponent {
  @Input() events: TimelineEvent[] = [];

  isLoading = true;

  constructor(private policyService: PolicyService) {}
ngOnInit(): void {
    this.policyService.getPolicyTimeline('').subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load timeline data', err);
        this.isLoading = false;
      }
    });
  }

  private getIconForMovementType(movementType: string): string {
    switch(movementType) {
      case 'NBU': return 'file-add';
      case 'RER': return 'sync';
      case 'ADH': return 'warning';
      default: return 'question';
    }
  }

}
