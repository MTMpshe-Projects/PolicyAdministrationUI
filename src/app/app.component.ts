import { Component } from '@angular/core';
import { PolicyHeaderComponent } from './policy-header/policy-header.component';

@Component({
    selector: 'app-root',
    imports: [PolicyHeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PolicyAdministrationUI';
}
