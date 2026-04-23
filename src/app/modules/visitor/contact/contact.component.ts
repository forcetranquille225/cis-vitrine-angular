import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CONTACT_INFOS, OFFICE_HOURS, FORM_FIELDS, ContactInfo } from './contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  contactInfos: ContactInfo[] = CONTACT_INFOS;
  officeHours = OFFICE_HOURS;
  formFields = FORM_FIELDS;
  submitted = false;
  messageSent = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;
      this.messageSent = true;
      console.log('Formulaire soumis ✅', form.value);
      
      // Reset message after 5 seconds
      setTimeout(() => {
        this.messageSent = false;
        form.reset();
        this.submitted = false;
      }, 5000);
    }
  }
}

