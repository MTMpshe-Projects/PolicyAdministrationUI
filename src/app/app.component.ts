import { Component } from '@angular/core';
import { PolicyHeaderComponent } from './policy-header/policy-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PolicyHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PolicyAdministrationUI';
}
