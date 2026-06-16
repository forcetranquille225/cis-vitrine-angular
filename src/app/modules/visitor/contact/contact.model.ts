export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  details?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
}

export const CONTACT_INFOS: ContactInfo[] = [
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Adresse',
    content: 'Plateaux Dokui, Abidjan',
    details: 'Côte d\'Ivoire'
  },
  {
    icon: 'fas fa-phone-alt',
    title: 'Téléphone',
    content: '+225 07 02 71 6329',
    details: 'Disponible du lundi au vendredi'
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    content: 'commerce.interservices@gmail.com',
    details: 'Réponse dans les 24h'
  },
  {
    icon: 'fas fa-clock',
    title: 'Horaires',
    content: 'Lundi - Vendredi : 8h30 - 17h30',
    details: 'Samedi - Dimanche : Fermé'
  }
];

export const OFFICE_HOURS = [
  { day: 'Lundi - Vendredi', hours: '8h30 - 17h30' },
  { day: 'Samedi - Dimanche', hours: 'Fermé' },
  { day: 'Jours fériés', hours: 'Fermé' }
];

export const FORM_FIELDS: FormField[] = [
  {
    name: 'name',
    label: 'Nom complet',
    type: 'text',
    required: true,
    placeholder: 'Votre nom et prénom'
  },
  {
    name: 'email',
    label: 'Adresse email',
    type: 'email',
    required: true,
    placeholder: 'votre.email@exemple.com'
  },
  {
    name: 'phone',
    label: 'Téléphone',
    type: 'tel',
    required: false,
    placeholder: '+225 XX XX XX XX'
  },
  {
    name: 'company',
    label: 'Entreprise',
    type: 'text',
    required: false,
    placeholder: 'Nom de votre entreprise'
  },
  {
    name: 'subject',
    label: 'Objet',
    type: 'text',
    required: true,
    placeholder: 'Objet de votre demande'
  }
];
