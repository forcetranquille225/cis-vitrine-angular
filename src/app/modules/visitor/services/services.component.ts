import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SERVICES_DATA, Service } from './services.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  services: Service[] = SERVICES_DATA;
  selectedService: Service | null = null;
  isMenuOpen = false;

  constructor(private route: ActivatedRoute) {
    if (this.services.length > 0) {
      this.selectedService = this.services[0];
    }
  }

  ngOnInit() {
    // Handle fragment (URL hash) to select service
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const service = this.services.find(s => s.id === fragment);
        if (service) {
          this.selectedService = service;
          this.scrollToService();
        }
      }
    });
  }

  selectService(service: Service) {
    this.selectedService = service;
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private scrollToService() {
    setTimeout(() => {
      const element = document.querySelector('.service-detail-card');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
