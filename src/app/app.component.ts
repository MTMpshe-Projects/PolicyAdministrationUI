import { Component } from '@angular/core';
import { PolicyHeaderComponent } from './policy-header/policy-header.component';
import { Policy } from './common/model/policy.model';
import { PolicyService } from './common/services/policy.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PolicyDashboardComponent } from "./policy-dashboard/policy-dashboard.component";

@Component({
  selector: 'app-root',
  imports: [ PolicyDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {


   currentView = 'policy'; // Default view

}
