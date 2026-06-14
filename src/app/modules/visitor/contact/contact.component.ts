import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CONTACT_INFOS, OFFICE_HOURS, FORM_FIELDS, ContactInfo } from './contact.model';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [CommonModule, FormsModule]
})
export class ContactComponent implements OnInit {
  contactInfos: ContactInfo[] = CONTACT_INFOS;
  officeHours = OFFICE_HOURS;
  formFields = FORM_FIELDS;
  submitted = false;
  messageSent = false;
  errorMessage: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // Initialize component
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;
      this.errorMessage = null;

      const contactData = {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone || undefined,
        company: form.value.company || undefined,
        subject: form.value.subject,
        message: form.value.message
      };

      this.contactService.submitContact(contactData).subscribe({
        next: (response) => {
          console.log('Message envoyé avec succès ✅', response);
          this.messageSent = true;
          this.submitted = false;

          // Reset form and message after 5 seconds
          setTimeout(() => {
            this.messageSent = false;
            form.reset();
          }, 5000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi du message ❌', error);
          this.errorMessage = error.error?.error || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
          this.submitted = false;

          // Clear error message after 5 seconds
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      });
    }
  }
}


