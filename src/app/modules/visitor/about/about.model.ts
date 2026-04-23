export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  icon: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CompanyStat {
  value: string;
  label: string;
  icon: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Monsieur Ahmed Diallo',
    position: 'Directeur Général & Fondateur',
    description: 'Expert en commerce international avec plus de 18 ans d\'expérience. Spécialiste en stratégie commerciale et développement de partenariats mondiaux.',
    icon: 'fas fa-user-tie'
  },
  {
    id: 'logistics-manager',
    name: 'Madame Fatima Ndiaye',
    position: 'Directrice Logistique',
    description: 'Spécialiste du transit douanier et chaîne d\'approvisionnement. 12 ans d\'expérience dans l\'optimisation logistique et la gestion douanière.',
    icon: 'fas fa-shipping-fast'
  },
  {
    id: 'commercial-director',
    name: 'Monsieur Pierre Moussa',
    position: 'Directeur Commercial',
    description: 'Responsable du développement commercial et des relations clients. Réseau étendu auprès des entreprises africaines et internationales.',
    icon: 'fas fa-handshake'
  },
  {
    id: 'operations-manager',
    name: 'Madame Marie Dubois',
    position: 'Responsable Opérations',
    description: 'Gestion opérationnelle et assurance qualité. Garantit l\'excellence dans l\'exécution de tous les projets.',
    icon: 'fas fa-cogs'
  }
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'trust',
    title: 'Confiance',
    description: 'La confiance est le fondement de nos relations. Nous nous engageons à être transparents et honnêtes dans chaque interaction.',
    icon: 'fas fa-handshake'
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'Nous recherchons l\'excellence dans chaque détail de nos services pour garantir la satisfaction de nos clients.',
    icon: 'fas fa-star'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Nous adoptons les dernières technologies et méthodes pour offrir des solutions avant-gardistes.',
    icon: 'fas fa-lightbulb'
  },
  {
    id: 'reliability',
    title: 'Fiabilité',
    description: 'Nos clients peuvent compter sur nous pour livrer à temps et selon les normes les plus élevées.',
    icon: 'fas fa-shield-alt'
  },
  {
    id: 'partnership',
    title: 'Partenariat',
    description: 'Nous croyons au développement mutuels et à la création de partenariats durables et bénéfiques.',
    icon: 'fas fa-users'
  },
  {
    id: 'sustainability',
    title: 'Développement Durable',
    description: 'Nous nous engageons envers des pratiques commerciales responsables et respectueuses de l\'environnement.',
    icon: 'fas fa-leaf'
  }
];

export const COMPANY_STATS: CompanyStat[] = [
  {
    value: '18+',
    label: 'Ans d\'expérience',
    icon: 'fas fa-trophy'
  },
  {
    value: '50+',
    label: 'Pays de partenaires',
    icon: 'fas fa-globe'
  },
  {
    value: '500+',
    label: 'Clients satisfaits',
    icon: 'fas fa-users'
  },
  {
    value: '1000+',
    label: 'Projets réalisés',
    icon: 'fas fa-check-circle'
  }
];
