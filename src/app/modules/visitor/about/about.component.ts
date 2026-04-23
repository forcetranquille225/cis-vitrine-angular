import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEAM_MEMBERS, COMPANY_VALUES, COMPANY_STATS, TeamMember, CompanyValue, CompanyStat } from './about.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  teamMembers: TeamMember[] = TEAM_MEMBERS;
  companyValues: CompanyValue[] = COMPANY_VALUES;
  companyStats: CompanyStat[] = COMPANY_STATS;
}
