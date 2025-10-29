import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Navigation vers les services
  navigateToServices() {
    // TODO: Implémenter la navigation vers la section services
  }

  // Navigation vers la page de contact
  navigateToContact() {
    // TODO: Implémenter la navigation vers la page de contact
  }
}
