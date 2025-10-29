import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-visitor-layout',
  standalone: true,
  templateUrl: './visitor-layout.component.html',
  styleUrls: ['./visitor-layout.component.scss'],
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent]
})
export class VisitorLayoutComponent {}
