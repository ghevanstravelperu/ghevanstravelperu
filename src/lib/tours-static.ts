import type { Locale } from "./constants";

export type TourStatus = "published" | "hidden" | "draft";

export type PriceDisplay = "soles" | "dollars" | "both";

export type ItineraryStop = {
  title: string;
  detail?: string;
};

export type LocalizedTourContent = {
  name: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  itinerary?: ItineraryStop[];
  duration?: string;
};

export type Tour = {
  id: string;
  slug: string;
  status: TourStatus;
  duration: string;
  price: number | null;
  priceUsd?: number | null;
  priceDisplay?: PriceDisplay;
  pricePrefix?: boolean;
  customQuote?: boolean;
  featured: boolean;
  sortOrder: number;
  image: string;
  /** Intrinsic pixel size of the main image, when known (from Sanity). */
  imageWidth?: number;
  imageHeight?: number;
  gallery: string[];
  content: Record<Locale, LocalizedTourContent>;
};

export const staticTours: Tour[] = [
  {
    id: "cusco-city-tour",
    slug: "cusco-city-tour",
    status: "published",
    duration: "5h",
    price: 40,
    featured: true,
    sortOrder: 1,
    image: "/images/tours/cusco-city-tour.jpg",
    gallery: [],
    content: {
      es: {
        name: "Cusco City Tour",
        shortDescription:
          "Recorrido por la Plaza de Armas, Qoricancha, Sacsayhuamán y sitios esenciales del Cusco inca y colonial.",
        fullDescription:
          "Descubre el corazón del antiguo imperio inca con un tour privado por Cusco. Visitamos los lugares más emblemáticos de la ciudad, combinando historia, arquitectura y cultura viva.",
        highlights: [
          "Plaza de Armas y Catedral",
          "Qoricancha / Templo del Sol",
          "Sacsayhuamán",
          "Guía local en español",
        ],
      },
      en: {
        name: "Cusco City Tour",
        shortDescription:
          "Visit the Main Square, Qoricancha, Sacsayhuaman, and essential Inca and colonial sites in Cusco.",
        fullDescription:
          "Discover the heart of the former Inca Empire on a private Cusco city tour. We visit the city's most iconic landmarks, blending history, architecture, and living culture.",
        highlights: [
          "Main Square & Cathedral",
          "Qoricancha / Temple of the Sun",
          "Sacsayhuaman",
          "Local Spanish-speaking guide",
        ],
      },
      pt: {
        name: "City Tour Cusco",
        shortDescription:
          "Visite a Praça de Armas, Qoricancha, Sacsayhuaman e os principais sítios incas e coloniais de Cusco.",
        fullDescription:
          "Descubra o coração do antigo Império Inca em um city tour privado por Cusco, visitando os marcos mais icônicos da cidade.",
        highlights: [
          "Praça de Armas e Catedral",
          "Qoricancha / Templo do Sol",
          "Sacsayhuaman",
          "Guia local",
        ],
      },
      fr: {
        name: "City Tour Cusco",
        shortDescription:
          "Visitez la Plaza de Armas, Qoricancha, Sacsayhuaman et les sites incas et coloniaux essentiels de Cusco.",
        fullDescription:
          "Découvrez le cœur de l'ancien empire inca lors d'une visite privée de Cusco et de ses monuments les plus emblématiques.",
        highlights: [
          "Plaza de Armas et Cathédrale",
          "Qoricancha / Temple du Soleil",
          "Sacsayhuaman",
          "Guide local",
        ],
      },
    },
  },
  {
    id: "valle-sur-tour",
    slug: "valle-sur-tour",
    status: "published",
    duration: "6h 30m",
    price: 80,
    featured: false,
    sortOrder: 2,
    image: "/images/tours/valle-sur.jpg",
    gallery: [],
    content: {
      es: {
        name: "Valle Sur Tour",
        shortDescription:
          "Ruta por Tipón, Pikillacta y Andahuaylillas, con paisajes andinos y patrimonio preinca e inca.",
        fullDescription:
          "Explora el Valle Sur de Cusco en un tour completo que combina arqueología, paisajes verdes y la famosa capilla de Andahuaylillas.",
        highlights: ["Tipón", "Pikillacta", "Andahuaylillas", "Transporte privado"],
      },
      en: {
        name: "South Valley Tour",
        shortDescription:
          "Route through Tipón, Pikillacta, and Andahuaylillas with Andean landscapes and pre-Inca heritage.",
        fullDescription:
          "Explore Cusco's South Valley on a full tour combining archaeology, green landscapes, and the famous Andahuaylillas chapel.",
        highlights: ["Tipón", "Pikillacta", "Andahuaylillas", "Private transport"],
      },
      pt: {
        name: "Tour Vale Sul",
        shortDescription:
          "Rota por Tipón, Pikillacta e Andahuaylillas com paisagens andinas e patrimônio pré-inca.",
        fullDescription:
          "Explore o Vale Sul de Cusco em um tour completo que combina arqueologia, paisagens verdes e a famosa capela de Andahuaylillas.",
        highlights: ["Tipón", "Pikillacta", "Andahuaylillas", "Transporte privado"],
      },
      fr: {
        name: "Tour Vallée Sud",
        shortDescription:
          "Route via Tipón, Pikillacta et Andahuaylillas avec paysages andins et patrimoine pré-inca.",
        fullDescription:
          "Explorez la vallée sud de Cusco lors d'un tour complet alliant archéologie, paysages verdoyants et la chapelle d'Andahuaylillas.",
        highlights: ["Tipón", "Pikillacta", "Andahuaylillas", "Transport privé"],
      },
    },
  },
  {
    id: "tours-mistico",
    slug: "tours-mistico",
    status: "published",
    duration: "7h 30m",
    price: 80,
    featured: false,
    sortOrder: 3,
    image: "/images/tours/tours-mistico.jpg",
    gallery: [],
    content: {
      es: {
        name: "Tours Místico",
        shortDescription:
          "Experiencia espiritual y cultural en sitios sagrados y paisajes místicos cerca de Cusco.",
        fullDescription:
          "Un tour diferente que conecta naturaleza, tradición andina y sitios con fuerte carga espiritual en los alrededores de Cusco.",
        highlights: [
          "Sitios fuera de la ruta clásica",
          "Enfoque cultural y espiritual",
          "Grupos pequeños o privado",
          "Recogida en hotel",
        ],
      },
      en: {
        name: "Mystical Tour",
        shortDescription:
          "Spiritual and cultural experience at sacred sites and mystical landscapes near Cusco.",
        fullDescription:
          "A distinctive tour connecting nature, Andean tradition, and spiritually significant sites around Cusco.",
        highlights: [
          "Off-the-beaten-path sites",
          "Cultural & spiritual focus",
          "Small private groups",
          "Hotel pickup",
        ],
      },
      pt: {
        name: "Tour Místico",
        shortDescription:
          "Experiência espiritual e cultural em sítios sagrados e paisagens místicas perto de Cusco.",
        fullDescription:
          "Um tour diferenciado que conecta natureza, tradição andina e locais de forte significado espiritual nos arredores de Cusco.",
        highlights: [
          "Locais fora do roteiro clássico",
          "Foco cultural e espiritual",
          "Grupos pequenos ou privado",
          "Pick-up no hotel",
        ],
      },
      fr: {
        name: "Tour Mystique",
        shortDescription:
          "Expérience spirituelle et culturelle sur des sites sacrés près de Cusco.",
        fullDescription:
          "Un tour unique qui relie nature, tradition andine et lieux à forte dimension spirituelle autour de Cusco.",
        highlights: [
          "Sites hors des sentiers battus",
          "Approche culturelle et spirituelle",
          "Petits groupes privés",
          "Prise en charge à l'hôtel",
        ],
      },
    },
  },
  {
    id: "montana-de-colores",
    slug: "montana-de-colores",
    status: "published",
    duration: "1d",
    price: 120,
    pricePrefix: true,
    featured: true,
    sortOrder: 4,
    image: "/images/tours/montana-colores.jpg",
    gallery: ["/images/experiences/rainbow-1.jpg"],
    content: {
      es: {
        name: "Tour de la Montaña de Colores",
        shortDescription:
          "Excursión de día completo a Vinicunca, la famosa montaña arcoíris de los Andes peruanos.",
        fullDescription:
          "Vive uno de los paisajes más fotografiados del Perú en un tour a la Montaña de Colores. Incluye caminata escénica, vistas únicas y acompañamiento profesional.",
        highlights: [
          "Montaña Vinicunca",
          "Caminata escénica",
          "Día completo desde Cusco",
          "Desayuno / snack según itinerario",
        ],
      },
      en: {
        name: "Rainbow Mountain Tour",
        shortDescription:
          "Full-day excursion to Vinicunca, the famous rainbow mountain of the Peruvian Andes.",
        fullDescription:
          "Experience one of Peru's most photographed landscapes on a Rainbow Mountain tour with scenic hiking and professional support.",
        highlights: [
          "Vinicunca Mountain",
          "Scenic hike",
          "Full day from Cusco",
          "Breakfast / snack per itinerary",
        ],
      },
      pt: {
        name: "Montanha Colorida",
        shortDescription:
          "Excursão de dia inteiro à Vinicunca, a famosa montanha arco-íris dos Andes peruanos.",
        fullDescription:
          "Viva uma das paisagens mais fotografadas do Peru em um tour à Montanha Colorida com caminhada cênica e acompanhamento profissional.",
        highlights: [
          "Montanha Vinicunca",
          "Caminhada cênica",
          "Dia inteiro saindo de Cusco",
          "Café da manhã / lanche conforme roteiro",
        ],
      },
      fr: {
        name: "Montagne des Couleurs",
        shortDescription:
          "Excursion d'une journée à Vinicunca, la célèbre montagne arc-en-ciel des Andes.",
        fullDescription:
          "Découvrez l'un des paysages les plus photographiés du Pérou lors d'un tour à la Montagne des Couleurs avec randonnée panoramique.",
        highlights: [
          "Mont Vinicunca",
          "Randonnée panoramique",
          "Journée complète depuis Cusco",
          "Petit-déjeuner / snack selon l'itinéraire",
        ],
      },
    },
  },
  {
    id: "laguna-humantay",
    slug: "laguna-humantay",
    status: "published",
    duration: "1d",
    price: 120,
    pricePrefix: true,
    featured: false,
    sortOrder: 5,
    image: "/images/tours/laguna-humantay.jpg",
    gallery: [
      "/images/experiences/humantay-1.jpg",
      "/images/experiences/humantay-2.jpg",
      "/images/experiences/humantay-3.jpg",
    ],
    content: {
      es: {
        name: "Tour de la Laguna Humantay",
        shortDescription:
          "Aventura de día completo a la laguna turquesa Humantay, rodeada de glaciares andinos.",
        fullDescription:
          "Camina hasta una de las lagunas más hermosas del Cusco. Humantay sorprende con aguas turquesas y montañas nevadas en un entorno de alta montaña.",
        highlights: [
          "Laguna Humantay",
          "Trek de alta montaña",
          "Vistas glaciares",
          "Salida desde Cusco",
        ],
      },
      en: {
        name: "Humantay Lake Tour",
        shortDescription:
          "Full-day adventure to turquoise Humantay Lake, surrounded by Andean glaciers.",
        fullDescription:
          "Hike to one of Cusco's most stunning lakes. Humantay dazzles with turquoise waters and snow-capped peaks in a high-altitude setting.",
        highlights: [
          "Humantay Lake",
          "High-altitude trek",
          "Glacier views",
          "Departure from Cusco",
        ],
      },
      pt: {
        name: "Laguna Humantay",
        shortDescription:
          "Aventura de dia inteiro até a laguna turquesa Humantay, cercada por glaciares andinos.",
        fullDescription:
          "Caminhe até uma das lagunas mais belas de Cusco, com águas turquesas e picos nevados em um cenário de alta montanha.",
        highlights: [
          "Laguna Humantay",
          "Trek em alta montanha",
          "Vistas glaciares",
          "Saída de Cusco",
        ],
      },
      fr: {
        name: "Lagune Humantay",
        shortDescription:
          "Aventure d'une journée vers la lagune turquoise Humantay, entourée de glaciers andins.",
        fullDescription:
          "Randonnez jusqu'à l'une des plus belles lagunes de Cusco, aux eaux turquoise et aux sommets enneigés.",
        highlights: [
          "Lagune Humantay",
          "Trek en haute montagne",
          "Vues sur les glaciers",
          "Départ de Cusco",
        ],
      },
    },
  },
  {
    id: "super-valle-vip",
    slug: "super-valle-vip",
    status: "published",
    duration: "1d",
    price: 140,
    featured: true,
    sortOrder: 6,
    image: "/images/tours/super-valle-vip.jpg",
    gallery: [],
    content: {
      es: {
        name: "Super Valle VIP Tour",
        shortDescription:
          "Tour premium por el Valle Sagrado: Moray, Maras, Ollantaytambo y pueblos andinos.",
        fullDescription:
          "La mejor forma de conocer el Valle Sagrado con un servicio VIP. Combina arqueología inca, paisajes andinos y experiencias exclusivas en un solo día.",
        highlights: [
          "Moray y Maras",
          "Ollantaytambo",
          "Servicio VIP",
          "Grupo privado",
        ],
      },
      en: {
        name: "Super Sacred Valley VIP Tour",
        shortDescription:
          "Premium Sacred Valley tour: Moray, Maras, Ollantaytambo, and Andean villages.",
        fullDescription:
          "The best way to explore the Sacred Valley with VIP service, combining Inca archaeology, Andean landscapes, and exclusive experiences in one day.",
        highlights: [
          "Moray & Maras",
          "Ollantaytambo",
          "VIP service",
          "Private group",
        ],
      },
      pt: {
        name: "Super Vale Sagrado VIP",
        shortDescription:
          "Tour premium pelo Vale Sagrado: Moray, Maras, Ollantaytambo e vilarejos andinos.",
        fullDescription:
          "A melhor forma de conhecer o Vale Sagrado com serviço VIP, combinando arqueologia inca e experiências exclusivas em um dia.",
        highlights: [
          "Moray e Maras",
          "Ollantaytambo",
          "Serviço VIP",
          "Grupo privado",
        ],
      },
      fr: {
        name: "Super Vallée Sacrée VIP",
        shortDescription:
          "Tour premium de la vallée sacrée : Moray, Maras, Ollantaytambo et villages andins.",
        fullDescription:
          "La meilleure façon de découvrir la vallée sacrée avec un service VIP, combinant archéologie inca et expériences exclusives en une journée.",
        highlights: [
          "Moray et Maras",
          "Ollantaytambo",
          "Service VIP",
          "Groupe privé",
        ],
      },
    },
  },
  {
    id: "qeswachaca",
    slug: "qeswachaca",
    status: "published",
    duration: "1d",
    price: 150,
    featured: false,
    sortOrder: 7,
    image: "/images/tours/qeswachaca.jpg",
    gallery: ["/images/experiences/qeswachaca-2.jpg"],
    content: {
      es: {
        name: "Tours de Qeswachaca",
        shortDescription:
          "Visita al último puente de cuerda inca reconstruido cada año por comunidades locales.",
        fullDescription:
          "Una experiencia auténtica en Q'eswachaka, el puente de ichu sobre el río Apurímac. Ideal para viajeros que buscan cultura viva y paisajes impresionantes.",
        highlights: [
          "Puente inca de Q'eswachaka",
          "Cultura comunitaria",
          "Cañón del Apurímac",
          "Tour de día completo",
        ],
      },
      en: {
        name: "Q'eswachaka Bridge Tour",
        shortDescription:
          "Visit the last Inca rope bridge rebuilt annually by local communities.",
        fullDescription:
          "An authentic experience at Q'eswachaka, the ichu-grass bridge over the Apurímac River — perfect for travelers seeking living culture and dramatic scenery.",
        highlights: [
          "Q'eswachaka Inca bridge",
          "Community culture",
          "Apurímac canyon",
          "Full-day tour",
        ],
      },
      pt: {
        name: "Tour Q'eswachaka",
        shortDescription:
          "Visite a última ponte de corda inca reconstruída anualmente por comunidades locais.",
        fullDescription:
          "Uma experiência autêntica em Q'eswachaka, a ponte de ichu sobre o rio Apurímac, ideal para quem busca cultura viva e paisagens impressionantes.",
        highlights: [
          "Ponte inca Q'eswachaka",
          "Cultura comunitária",
          "Cânion do Apurímac",
          "Tour de dia inteiro",
        ],
      },
      fr: {
        name: "Tour Q'eswachaka",
        shortDescription:
          "Visitez le dernier pont de corde inca reconstruit chaque année par les communautés locales.",
        fullDescription:
          "Une expérience authentique à Q'eswachaka, le pont en ichu au-dessus de l'Apurímac, parfaite pour les voyageurs en quête de culture vivante.",
        highlights: [
          "Pont inca Q'eswachaka",
          "Culture communautaire",
          "Canyon de l'Apurímac",
          "Tour d'une journée",
        ],
      },
    },
  },
  {
    id: "cuatrimotos-huaypo",
    slug: "cuatrimotos-huaypo",
    status: "published",
    duration: "6h 30m",
    price: 150,
    featured: false,
    sortOrder: 8,
    image: "/images/experiences/atv-3.jpg",
    gallery: [
      "/images/experiences/cuatrimotos-lake.jpg",
      "/images/experiences/atv-1.jpg",
      "/images/experiences/atv-2.jpg",
      "/images/tours/cuatrimotos-huaypo.jpg",
    ],
    content: {
      es: {
        name: "Tour en Cuatrimotos de la Laguna de Huaypo",
        shortDescription:
          "Aventura en ATV por paisajes andinos con vistas a la laguna Huaypo y montañas nevadas.",
        fullDescription:
          "Combina adrenalina y naturaleza en un tour en cuatrimoto hacia la laguna Huaypo. Perfecto para quienes buscan una experiencia activa cerca de Cusco.",
        highlights: [
          "Cuatrimotos / ATV",
          "Laguna Huaypo",
          "Paisajes andinos",
          "Equipo de seguridad",
        ],
      },
      en: {
        name: "ATV Tour to Huaypo Lake",
        shortDescription:
          "ATV adventure through Andean landscapes with views of Huaypo Lake and snowy peaks.",
        fullDescription:
          "Combine adrenaline and nature on an ATV tour to Huaypo Lake — an active experience perfect for adventure seekers near Cusco.",
        highlights: [
          "ATV / quad bikes",
          "Huaypo Lake",
          "Andean landscapes",
          "Safety equipment",
        ],
      },
      pt: {
        name: "Tour de Quadriciclo na Laguna Huaypo",
        shortDescription:
          "Aventura de quadriciclo com vistas para a laguna Huaypo e montanhas nevadas.",
        fullDescription:
          "Combine adrenalina e natureza em um tour de quadriciclo até a laguna Huaypo, ideal para quem busca uma experiência ativa perto de Cusco.",
        highlights: [
          "Quadriciclos / ATV",
          "Laguna Huaypo",
          "Paisagens andinas",
          "Equipamento de segurança",
        ],
      },
      fr: {
        name: "Tour Quad à la Lagune Huaypo",
        shortDescription:
          "Aventure en quad à travers les paysages andins avec vue sur la lagune Huaypo.",
        fullDescription:
          "Alliez adrénaline et nature lors d'un tour en quad vers la lagune Huaypo, parfait pour les amateurs d'aventure près de Cusco.",
        highlights: [
          "Quad / ATV",
          "Lagune Huaypo",
          "Paysages andins",
          "Équipement de sécurité",
        ],
      },
    },
  },
  {
    id: "machupicchu",
    slug: "machupicchu",
    status: "published",
    duration: "1d",
    price: 920,
    featured: true,
    sortOrder: 9,
    image: "/images/tours/machupicchu.jpg",
    gallery: [
      "/images/experiences/machu-1.jpg",
      "/images/experiences/machu-2.jpg",
      "/images/experiences/machu-3.jpg",
      "/images/experiences/machu-4.jpg",
    ],
    content: {
      es: {
        name: "Tours a Machupicchu",
        shortDescription:
          "Experiencia de día completo en la ciudadela inca más famosa del mundo con guía profesional.",
        fullDescription:
          "Visita Machu Picchu con un servicio organizado desde Cusco. Incluye logística esencial para que vivas la maravilla inca con tranquilidad y acompañamiento local.",
        highlights: [
          "Ciudadela de Machu Picchu",
          "Guía profesional",
          "Logística desde Cusco",
          "Experiencia de día completo",
        ],
      },
      en: {
        name: "Machu Picchu Tour",
        shortDescription:
          "Full-day experience at the world's most famous Inca citadel with a professional guide.",
        fullDescription:
          "Visit Machu Picchu with an organized service from Cusco, including essential logistics so you can enjoy the Inca wonder with peace of mind.",
        highlights: [
          "Machu Picchu citadel",
          "Professional guide",
          "Logistics from Cusco",
          "Full-day experience",
        ],
      },
      pt: {
        name: "Tour Machu Picchu",
        shortDescription:
          "Experiência de dia inteiro na cidadela inca mais famosa do mundo com guia profissional.",
        fullDescription:
          "Visite Machu Picchu com serviço organizado saindo de Cusco, incluindo logística essencial para aproveitar a maravilha inca com tranquilidade.",
        highlights: [
          "Cidadela de Machu Picchu",
          "Guia profissional",
          "Logística desde Cusco",
          "Experiência de dia inteiro",
        ],
      },
      fr: {
        name: "Tour Machu Picchu",
        shortDescription:
          "Expérience d'une journée à la citadelle inca la plus célèbre du monde avec guide professionnel.",
        fullDescription:
          "Visitez Machu Picchu avec un service organisé depuis Cusco, incluant la logistique essentielle pour profiter de la merveille inca en toute sérénité.",
        highlights: [
          "Citadelle du Machu Picchu",
          "Guide professionnel",
          "Logistique depuis Cusco",
          "Expérience d'une journée",
        ],
      },
    },
  },
];
