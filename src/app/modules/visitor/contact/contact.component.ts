import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  // styleUrls: ['./contact.component.css'],
  imports: [FormsModule] // ✅ Important !
})
export class ContactComponent {
  onSubmit() {
    console.log('Formulaire soumis ✅');
  }
}
