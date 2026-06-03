import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

type ProgramItem = {
  title: string;
  tag: string;
  desc: string;
  category: string[]; // Used for filtering logic
};

type NewsItem = {
  title: string;
  date: string;
  category: string;
  desc: string;
  image: string;
  // We can add an internal 'filterCategory' if the display category (tag) differs from the filter key, 
  // but for simplicity we will try to match them or filter by inclusion.
};

type Translations = {
  [key in Language]: {
    nav: {
      home: string;
      about: string;
      programs: string;
      news: string;
      contact: string;
      membership: string;
      toggle: string;
    };
    footer: {
      desc: string;
      navigation: string;
      resources: string;
      contact: string;
      rights: string;
      legal: string;
      privacy: string;
      annualReports: string;
      partners: string;
    };
    home: {
      heroTitle: string;
      heroDesc: string;
      discover: string;
      join: string;
      valuesTitle: string;
      valuesSubtitle: string;
      valuesDesc: string;
      val1Title: string;
      val1Desc: string;
      val2Title: string;
      val2Desc: string;
      val3Title: string;
      val3Desc: string;
      val4Title: string;
      val4Desc: string;
      programsTitle: string;
      programsDesc: string;
      viewAllPrograms: string;
      newsTitle: string;
      viewBlog: string;
      ctaTitle: string;
      ctaDesc: string;
      donate: string;
      readMore: string;
    };
    about: {
      heroTitle: string;
      heroSubtitle: string;
      heroDesc: string;
      philosophyTitle: string;
      philosophyDesc: string;
      philosophyDesc2: string;
      missionTitle: string;
      missionDesc: string;
      missionPoint1: string;
      missionPoint2: string;
      visionTitle: string;
      visionDesc: string;
      visionPoint1: string;
      visionPoint2: string;
      valuesTitle: string;
      valuesDesc: string;
      val1Title: string;
      val1Desc: string;
      val2Title: string;
      val2Desc: string;
      val3Title: string;
      val3Desc: string;
      val4Title: string;
      val4Desc: string;
      workTitle: string;
      workDesc: string;
      workRegionTitle: string;
      workRegionDesc: string;
      workCentersTitle: string;
      workCentersDesc: string;
      readyDiff: string;
      readyDiffDesc: string;
    };
    programs: {
      heroTitle: string;
      heroDesc: string;
      support: string;
      searchPlaceholder: string;
      filters: {
        all: string;
        edu: string;
        training: string;
        community: string;
        innovation: string;
      };
      items: ProgramItem[];
      loadMore: string;
      noResults: string;
      ctaTitle: string;
      ctaDesc: string;
    };
    news: {
      title: string;
      subtitle: string;
      filters: string[];
      items: NewsItem[];
      readArticle: string;
    };
    membership: {
      title: string;
      subtitle: string;
      feesTitle: string;
      feesDesc: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      professionLabel: string;
      professionPlaceholder: string;
      typeLabel: string;
      typeActive: string;
      typeHonor: string;
      typeBenefactor: string;
      motivationLabel: string;
      motivationPlaceholder: string;
      submit: string;
      privacy: string;
      success: string;
    };
    contact: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
      sent: string;
      infoTitle: string;
      addressLabel: string;
      infoEmailLabel: string;
      phoneInfoLabel: string;
      hours: string;
      mapTitle: string;
      mapButton: string;
    }
  };
};

const translations: Translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      programs: "Nos Programmes",
      news: "Blog",
      contact: "Contact",
      membership: "Devenir membre",
      toggle: "EN",
    },
    footer: {
      desc: "SmartEducation œuvre pour une société où chaque apprenant a accès à une éducation de qualité, inclusive et équitable.",
      navigation: "Navigation",
      resources: "Ressources",
      contact: "Contactez-nous",
      rights: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      annualReports: "Rapports Annuels",
      partners: "Partenaires",
    },
    home: {
      heroTitle: "Promouvoir l’accès équitable à une éducation de qualité",
      heroDesc: "SmartEducation œuvre pour l’autonomisation des individus, la réduction des inégalités et la construction de sociétés durables à travers des actions concrètes et inclusives.",
      discover: "Découvrir nos actions",
      join: "Devenir Membre",
      valuesTitle: "Nos Valeurs",
      valuesSubtitle: "Ce qui nous anime",
      valuesDesc: "Des principes fondamentaux pour construire une société plus juste et un système éducatif ouvert à tous.",
      val1Title: "Engagement",
      val1Desc: "Nous nous engageons pleinement dans nos actions pour un impact durable sur les communautés.",
      val2Title: "Innovation",
      val2Desc: "Développer des solutions pédagogiques innovantes pour répondre aux défis éducatifs modernes.",
      val3Title: "Impact social",
      val3Desc: "Mesurer et maximiser notre contribution à la réduction des inégalités et au développement social.",
      val4Title: "Excellence pédagogique",
      val4Desc: "Viser la plus haute qualité dans les normes éducatives et les méthodes d'enseignement.",
      programsTitle: "Nos Programmes & Actions",
      programsDesc: "Découvrez comment nous traduisons nos valeurs en actions concrètes sur le terrain.",
      viewAllPrograms: "Voir tous les programmes",
      newsTitle: "Dernières Actualités",
      viewBlog: "Voir tout le blog",
      ctaTitle: "Rejoignez le mouvement SmartEducation",
      ctaDesc: "En devenant membre, vous soutenez directement nos actions sur le terrain et participez à la construction d'une éducation plus juste.",
      donate: "Faire un don",
      readMore: "En savoir plus",
    },
    about: {
      heroSubtitle: "Qui sommes-nous ?",
      heroTitle: "À propos de SmartEducation",
      heroDesc: "SmartEducation œuvre pour l’autonomisation des individus, la réduction des inégalités et la construction de sociétés durables à travers des actions concrètes et inclusives.",
      philosophyTitle: "Notre Philosophie",
      philosophyDesc: "L’éducation est un droit fondamental et une priorité de développement. À travers des actions concrètes, inclusives et innovantes, l’association place l’éducation au cœur du progrès social, de la citoyenneté, de la paix et de la justice.",
      philosophyDesc2: "Nous croyons que chaque individu mérite d'avoir accès à une éducation de qualité, adaptée aux défis locaux et globaux.",
      missionTitle: "Notre Mission",
      missionDesc: "Promouvoir l’accès équitable à une éducation de qualité comme levier essentiel du développement humain, économique et social. Nous œuvrons pour l’autonomisation des individus, la réduction des inégalités et la construction de sociétés durables.",
      missionPoint1: "Améliorer l’accès à l’éducation",
      missionPoint2: "Renforcer la qualité de l’enseignement",
      visionTitle: "Notre Vision",
      visionDesc: "Construire une société où chaque individu, sans distinction de genre, d’origine sociale ou de condition physique, a accès à une éducation de qualité, adaptée aux défis locaux et globaux.",
      visionPoint1: "Éducation pour tous",
      visionPoint2: "Développement durable et inclusif",
      valuesTitle: "Nos Valeurs",
      valuesDesc: "Les principes qui guident nos actions et nos programmes.",
      val1Title: "Engagement",
      val1Desc: "Nous nous engageons pleinement dans nos actions pour un impact durable.",
      val2Title: "Innovation",
      val2Desc: "Développer des solutions pédagogiques innovantes.",
      val3Title: "Impact social",
      val3Desc: "Mesurer et maximiser notre contribution à la réduction des inégalités.",
      val4Title: "Excellence pédagogique",
      val4Desc: "Viser la plus haute qualité dans les normes éducatives.",
      workTitle: "Zone d’intervention",
      workDesc: "SmartEducation opère principalement au Cameroun avec des partenariats internationaux.",
      workRegionTitle: "National - Cameroun",
      workRegionDesc: "Actions ciblées sur l'amélioration de l'éducation dans toutes les régions du pays.",
      workCentersTitle: "International",
      workCentersDesc: "Partenariats et collaborations avec des organisations internationales pour des échanges éducatifs.",
      readyDiff: "Prêt à faire une différence ?",
      readyDiffDesc: "Rejoignez SmartEducation et contribuez à notre mission.",
    },
    programs: {
      heroTitle: "Nos Programmes et Actions",
      heroDesc: "Découvrez comment SmartEducation transforme l'éducation à travers des initiatives concrètes, durables et inclusives pour les communautés qui en ont le plus besoin.",
      support: "Soutenir nos actions",
      searchPlaceholder: "Rechercher un programme...",
      filters: {
        all: "Tous",
        edu: "Éducation",
        training: "Formation",
        community: "Communauté",
        innovation: "Innovation"
      },
      items: [
        {
          title: "Soutien à l'éducation et à la formation",
          tag: "Éducation",
          desc: "Programmes de tutorat et de mentorat pour les élèves en difficulté, aide aux devoirs, ateliers éducatifs et formation professionnelle.",
          category: ["edu", "training"]
        },
        {
          title: "Sensibilisation et plaidoyer",
          tag: "Sensibilisation",
          desc: "Campagnes de sensibilisation sur l'importance de l'éducation, plaidoyer auprès des institutions et organisation de conférences.",
          category: ["community"]
        },
        {
          title: "Développement des infrastructures éducatives",
          tag: "Infrastructures",
          desc: "Construction et rénovation d'écoles, bibliothèques et centres de formation, équipement en matériel pédagogique.",
          category: ["innovation"]
        },
        {
          title: "Inclusion et accessibilité",
          tag: "Inclusion",
          desc: "Programmes d'éducation inclusive pour les personnes en situation de handicap et soutien aux enfants réfugiés.",
          category: ["community"]
        },
        {
          title: "Partenariats et collaboration",
          tag: "Partenariats",
          desc: "Collaboration avec les écoles, universités et entreprises pour le financement et les échanges éducatifs.",
          category: ["innovation", "training"]
        }
      ],
      loadMore: "Charger plus de programmes",
      noResults: "Aucun résultat trouvé.",
      ctaTitle: "Rejoignez le mouvement SmartEducation",
      ctaDesc: "Votre soutien est essentiel pour pérenniser ces actions. Devenez membre dès aujourd'hui ou contactez-nous pour proposer un partenariat.",
    },
    news: {
      title: "Actualités & Insights",
      subtitle: "Découvrez les dernières nouvelles, nos projets récents et nos articles de fond sur l'éducation inclusive. Restez informés de nos actions.",
      filters: ["Tous", "Événements", "Pédagogie", "Institutionnel", "Projets"],
      items: [
        {
            title: "Orientation scolaire et accompagnement académique",
            date: "15 Nov 2023",
            category: "Projets",
            desc: "Lancement de notre programme d'orientation pour aider les élèves à choisir leur parcours éducatif et professionnel.",
            image: "https://images.unsplash.com/photo-1542810634-71277d95dc24?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Déploiement de la plateforme éducative",
            date: "10 Oct 2023",
            category: "Projets",
            desc: "Notre nouvelle plateforme numérique est désormais accessible aux enseignants et élèves pour un apprentissage interactif.",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Cours de soutien et programmes de tutorat",
            date: "01 Oct 2023",
            category: "Pédagogie",
            desc: "Extension de nos programmes de tutorat pour couvrir plus d'élèves dans les régions défavorisées.",
            image: "https://images.unsplash.com/photo-1577896335477-285875b2e623?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Renforcement des capacités des enseignants",
            date: "25 Sep 2023",
            category: "Formation",
            desc: "Programme de formation sur les nouvelles formes pédagogiques pour améliorer la qualité de l'enseignement.",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Conférence annuelle sur l'accessibilité",
            date: "18 Sep 2023",
            category: "Événements",
            desc: "Les experts internationaux discutent des défis et solutions pour l'éducation lors de notre 5ème conférence annuelle.",
            image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Témoignages de nos bénévoles",
            date: "12 Sep 2023",
            category: "Communauté",
            desc: "Nos membres partagent leurs expériences sur le terrain, de l'accompagnement scolaire à l'organisation d'événements caritatifs.",
            image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop"
        }
      ],
      readArticle: "Lire l'article",
    },
    membership: {
      title: "Devenir Membre",
      subtitle: "Rejoignez une communauté engagée. Seuls le fondateur, les membres actifs et d'honneur ont le droit de vote.",
      feesTitle: "Conditions d'adhésion",
      feesDesc: "Les conditions générales d'adhésion vous seront envoyées avec la réponse à votre demande.",
      nameLabel: "Nom complet",
      namePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "exemple@email.com",
      phoneLabel: "Téléphone",
      phonePlaceholder: "+237 6...",
      professionLabel: "Profession",
      professionPlaceholder: "Votre métier",
      typeLabel: "Membership Type",
      typeActive: "Membre individuel",
      typeHonor: "Étudiant / Chercheur",
      typeBenefactor: "Institution / Entreprise",
      motivationLabel: "Vos motivations",
      motivationPlaceholder: "Pourquoi souhaitez-vous nous rejoindre ?",
      submit: "Envoyer ma demande",
      privacy: "Règlement intérieur",
      success: "Demande envoyée ! Veuillez procéder au paiement des droits d'adhésion.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Do you have questions about our inclusive education programs or want to get involved? Fill out the form below or use our direct contact info.",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email Address",
      emailPlaceholder: "example@email.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+237 691 34 45 63",
      subjectLabel: "Subject",
      subjectPlaceholder: "General inquiries",
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      submit: "Send Message",
      sent: "Message sent successfully!",
      infoTitle: "Our Contact Info",
      addressLabel: "Headquarters",
      infoEmailLabel: "Email",
      phoneInfoLabel: "Phone",
      hours: "Monday to Friday, 9am-6pm",
      mapTitle: "Map",
      mapButton: "View on Google Maps",
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      programs: "Our Programs",
      news: "Blog",
      contact: "Contact",
      membership: "Become a member",
      toggle: "FR",
    },
    footer: {
      desc: "SmartEducation works for a society where every learner has access to quality, inclusive, and equitable education.",
      navigation: "Navigation",
      resources: "Resources",
      contact: "Contact Us",
      rights: "All rights reserved.",
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      annualReports: "Annual Reports",
      partners: "Partners",
    },
    home: {
      heroTitle: "Promoting equitable access to quality education",
      heroDesc: "SmartEducation works for individual empowerment, inequality reduction, and building sustainable societies through concrete and inclusive actions.",
      discover: "Discover our actions",
      join: "Become a Member",
      valuesTitle: "Our Values",
      valuesSubtitle: "What drives us",
      valuesDesc: "Fundamental principles to build a fairer society and an education system open to all.",
      val1Title: "Commitment",
      val1Desc: "We are fully committed to our actions for a sustainable impact on communities.",
      val2Title: "Innovation",
      val2Desc: "Developing innovative pedagogical solutions to meet modern educational challenges.",
      val3Title: "Social Impact",
      val3Desc: "Measuring and maximizing our contribution to reducing inequalities and social development.",
      val4Title: "Educational Excellence",
      val4Desc: "Aiming for the highest quality in educational standards and teaching methods.",
      programsTitle: "Our Programs & Actions",
      programsDesc: "Discover how we translate our values into concrete actions on the ground.",
      viewAllPrograms: "View all programs",
      newsTitle: "Latest News",
      viewBlog: "View full blog",
      ctaTitle: "Join the SmartEducation movement",
      ctaDesc: "By becoming a member, you directly support our actions on the ground and participate in building a fairer education.",
      donate: "Donate",
      readMore: "Read more",
    },
    about: {
      heroSubtitle: "Who are we?",
      heroTitle: "About SmartEducation",
      heroDesc: "SmartEducation works for individual empowerment, reduction of inequalities, and the construction of sustainable societies through concrete and inclusive actions.",
      philosophyTitle: "Our Philosophy",
      philosophyDesc: "Education is a fundamental right and a development priority. Through concrete, inclusive, and innovative actions, the association places education at the heart of social progress, citizenship, peace, and justice.",
      philosophyDesc2: "We believe that every individual deserves access to quality education, adapted to local and global challenges.",
      missionTitle: "Our Mission",
      missionDesc: "To promote equitable access to quality education as an essential lever for human, economic, and social development. We work for individual empowerment, inequality reduction, and building sustainable societies.",
      missionPoint1: "Improve access to education",
      missionPoint2: "Strengthen teaching quality",
      visionTitle: "Our Vision",
      visionDesc: "To build a society where every individual, regardless of gender, social origin, or physical condition, has access to quality education tailored to local and global challenges.",
      visionPoint1: "Education for all",
      visionPoint2: "Sustainable and inclusive development",
      valuesTitle: "Our Values",
      valuesDesc: "The principles that guide our actions and programs.",
      val1Title: "Commitment",
      val1Desc: "We are fully committed to our actions for sustainable impact.",
      val2Title: "Innovation",
      val2Desc: "Developing innovative pedagogical solutions.",
      val3Title: "Social Impact",
      val3Desc: "Measuring and maximizing our contribution to reducing inequalities.",
      val4Title: "Educational Excellence",
      val4Desc: "Aiming for the highest quality in educational standards.",
      workTitle: "Intervention Area",
      workDesc: "SmartEducation operates mainly in Cameroon with international partnerships.",
      workRegionTitle: "National - Cameroon",
      workRegionDesc: "Actions targeted at improving education in all regions of the country.",
      workCentersTitle: "International",
      workCentersDesc: "Partnerships and collaborations with international organizations for educational exchanges.",
      readyDiff: "Ready to make a difference?",
      readyDiffDesc: "Join SmartEducation and contribute to our mission.",
    },
    programs: {
      heroTitle: "Our Programs and Actions",
      heroDesc: "Discover how SmartEducation transforms education through concrete, sustainable, and inclusive initiatives for the communities that need them most.",
      support: "Support our actions",
      searchPlaceholder: "Search for a program...",
      filters: {
        all: "All",
        edu: "Education",
        training: "Training",
        community: "Community",
        innovation: "Innovation"
      },
      items: [
        {
          title: "Education and Training Support",
          tag: "Education",
          desc: "Tutoring and mentoring programs for struggling students, homework help, educational workshops, and vocational training.",
          category: ["edu", "training"]
        },
        {
          title: "Awareness and Advocacy",
          tag: "Awareness",
          desc: "Awareness campaigns on the importance of education, advocacy with institutions, and organization of conferences.",
          category: ["community"]
        },
        {
          title: "Educational Infrastructure Development",
          tag: "Infrastructure",
          desc: "Construction and renovation of schools, libraries, and training centers, equipment with pedagogical material.",
          category: ["innovation"]
        },
        {
          title: "Inclusion and Accessibility",
          tag: "Inclusion",
          desc: "Inclusive education programs for people with disabilities and support for refugee children.",
          category: ["community"]
        },
        {
          title: "Partnerships and Collaboration",
          tag: "Partnerships",
          desc: "Collaboration with schools, universities, and companies for funding and educational exchanges.",
          category: ["innovation", "training"]
        }
      ],
      loadMore: "Load more programs",
      noResults: "No results found.",
      ctaTitle: "Join the SmartEducation movement",
      ctaDesc: "Your support is essential to sustain these actions. Become a member today or contact us to propose a partnership.",
    },
    news: {
      title: "News & Insights",
      subtitle: "Discover the latest news, our recent projects, and our in-depth articles on inclusive education. Stay informed about our actions.",
      filters: ["All", "Events", "Pedagogy", "Institutional", "Projects"],
      items: [
        {
            title: "Academic Orientation and Support",
            date: "15 Nov 2023",
            category: "Projects",
            desc: "Launch of our orientation program to help students choose their educational and professional path.",
            image: "https://images.unsplash.com/photo-1542810634-71277d95dc24?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Deployment of the Educational Platform",
            date: "10 Oct 2023",
            category: "Projects",
            desc: "Our new digital platform is now accessible to teachers and students for interactive learning.",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Tutoring Programs and Support Classes",
            date: "01 Oct 2023",
            category: "Pedagogy",
            desc: "Extension of our tutoring programs to cover more students in disadvantaged regions.",
            image: "https://images.unsplash.com/photo-1577896335477-285875b2e623?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Teacher Capacity Building",
            date: "25 Sep 2023",
            category: "Training",
            desc: "Training program on new pedagogical forms to improve teaching quality.",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Annual Accessibility Conference",
            date: "18 Sep 2023",
            category: "Events",
            desc: "International experts discuss challenges and solutions for education during our 5th annual conference in Paris.",
            image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Testimonials from our Volunteers",
            date: "12 Sep 2023",
            category: "Community",
            desc: "Our members share their experiences on the ground, from school support to organizing charity events.",
            image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop"
        }
      ],
      readArticle: "Read article",
    },
    membership: {
      title: "Become a Member",
      subtitle: "Join a committed community. Only founder, active, and honorary members have voting rights.",
      feesTitle: "Membership Conditions",
      feesDesc: "General membership conditions will be sent with the response to your request.",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "example@email.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+237 6...",
      professionLabel: "Profession",
      professionPlaceholder: "Your job",
      typeLabel: "Membership Type",
      typeActive: "Individual Member",
      typeHonor: "Student / Researcher",
      typeBenefactor: "Institution / Company",
      motivationLabel: "Your Motivations",
      motivationPlaceholder: "Why do you want to join us?",
      submit: "Send Application",
      privacy: "Internal Regulations",
      success: "Application sent! Please proceed with the registration fee payment.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Do you have questions about our inclusive education programs or want to get involved? Fill out the form below or use our direct contact info.",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email Address",
      emailPlaceholder: "example@email.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+237 691 34 45 63",
      subjectLabel: "Subject",
      subjectPlaceholder: "General inquiries",
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      submit: "Send Message",
      sent: "Message sent successfully!",
      infoTitle: "Our Contact Info",
      addressLabel: "Headquarters",
      infoEmailLabel: "Email",
      phoneInfoLabel: "Phone",
      hours: "Monday to Friday, 9am-6pm",
      mapTitle: "Map",
      mapButton: "View on Google Maps",
    }
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      return (saved === 'en' || saved === 'fr') ? saved : 'fr';
    } catch {
      return 'fr';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch {
      // Ignore write errors in restricted environments
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};