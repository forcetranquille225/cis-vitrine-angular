import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 year = new Date().getFullYear();
  showScrollTop = false;
  private document = inject(DOCUMENT);

  /** Show scroll-top button after user scrolls down */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const y = (this.document.defaultView?.pageYOffset ?? 0);
    this.showScrollTop = y > 250;
  }

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }}
