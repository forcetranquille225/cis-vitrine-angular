export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'import-export',
    title: 'Import-Export',
    icon: 'fas fa-ship',
    shortDescription: 'Solutions complètes pour vos opérations d\'importation et d\'exportation internationales',
    fullDescription: 'Nous vous accompagnons dans l\'achat, le transport et le dédouanement de vos marchandises depuis l\'étranger, avec une expertise éprouvée. Nos services couvrent toutes les phases de vos opérations d\'import-export avec des solutions adaptées à vos besoins.',
    benefits: [
      'Expertise en dédouanement et documentation',
      'Réseau de fournisseurs internationaux fiables',
      'Gestion logistique optimisée',
      'Support dédié tout au long du processus',
      'Tarifs compétitifs négociés'
    ],
    process: [
      'Analyse de vos besoins et sourcing',
      'Négociation avec les fournisseurs',
      'Organisation du transport',
      'Dédouanement et documentation',
      'Livraison et support post-livraison'
    ]
  },
  {
    id: 'transit',
    title: 'Transit',
    icon: 'fas fa-truck',
    shortDescription: 'Gestion optimisée de vos flux logistiques et documentation douanière',
    fullDescription: 'Optimisez vos délais de livraison avec notre service de transit douanier et notre logistique maîtrisée. Nous gérons toutes les formalités douanières pour accélérer vos opérations.',
    benefits: [
      'Réduction des délais de transit',
      'Optimisation des coûts logistiques',
      'Traçabilité complète des marchandises',
      'Gestion des douanes spécialisée',
      'Assurance marchandise incluse'
    ],
    process: [
      'Prise en charge des marchandises',
      'Déclaration en douane',
      'Inspection et vérification',
      'Optimisation du parcours',
      'Livraison sécurisée'
    ]
  },
  {
    id: 'representation-commerciale',
    title: 'Représentation Commerciale',
    icon: 'fas fa-handshake',
    shortDescription: 'Votre présence locale assurée par nos experts commerciaux',
    fullDescription: 'Bénéficiez de notre réseau et de notre ancrage local pour représenter efficacement vos produits et services sur le marché africain. Nous jouons le rôle d\'intermédiaire stratégique pour développer votre présence commerciale.',
    benefits: [
      'Présence locale garantie',
      'Réseau commercial établi',
      'Connaissance du marché local',
      'Support commercial personnalisé',
      'Prospection commerciale active'
    ],
    process: [
      'Analyse du marché cible',
      'Identification des opportunités',
      'Prospection clients',
      'Négociation commerciale',
      'Suivi et développement commercial'
    ]
  },
  {
    id: 'commerce-international',
    title: 'Commerce International',
    icon: 'fas fa-globe',
    shortDescription: 'Accompagnement stratégique dans vos opérations commerciales internationales',
    fullDescription: 'Nous jouons le rôle d\'intermédiaire stratégique entre acheteurs et vendeurs à l\'échelle mondiale pour fluidifier vos opérations. Nos experts vous conseilleront sur les meilleures stratégies commerciales.',
    benefits: [
      'Accès à un réseau mondial',
      'Expertise en trading international',
      'Conseil stratégique personnalisé',
      'Gestion des risques commerciaux',
      'Optimisation des transactions'
    ],
    process: [
      'Étude de marché approfondie',
      'Structuration des deals',
      'Négociation commerciale',
      'Finalisation des contrats',
      'Suivi de l\'exécution'
    ]
  }
];
