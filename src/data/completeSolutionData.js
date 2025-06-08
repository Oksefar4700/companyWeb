// src/data/completeSolutionData.js
import {
  Palette,
  Globe,
  Camera,
  Search,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  Zap,
} from "lucide-react";

export const packageIncludes = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Logo & Brand Identitet",
    description: "Professionelt logo design og komplet brand guidelines",
    deliverables: [
      "3 logo koncepter",
      "Brand farvepalette",
      "Typografi guide",
      "Brand retningslinjer",
    ],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Skræddersyet Hjemmeside",
    description: "Fuldt responsivt website bygget i React med moderne design",
    deliverables: [
      "Mobil-optimeret design",
      "CMS integration",
      "Kontaktformularer",
      "Google Analytics",
    ],
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Billeder & Video",
    description:
      "Professionel foto/video produktion til dit website og sociale medier",
    deliverables: [
      "Produktfotografering",
      "Virksomhedsbilleder",
      "Intro video",
      "Stock billeder",
    ],
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "SEO & Google Optimering",
    description: "Komplet SEO setup så du bliver fundet på Google",
    deliverables: [
      "Keyword research",
      "Google My Business",
      "Teknisk SEO",
      "Indholdsoptimering",
    ],
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Social Media Setup",
    description: "Professionelle profiler på alle relevante platforme",
    deliverables: [
      "Facebook Business",
      "Instagram erhverv",
      "LinkedIn profil",
      "Content strategi",
    ],
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Support & Vedligeholdelse",
    description: "6 måneders support og vedligeholdelse inkluderet",
    deliverables: [
      "24/7 teknisk support",
      "Månedlige opdateringer",
      "Backup & sikkerhed",
      "Performance monitoring",
    ],
  },
];

export const processSteps = [
  {
    step: "1",
    title: "Strategi & Planlægning",
    description:
      "Vi analyserer din virksomhed og laver en skræddersyet strategi",
    duration: "Uge 1",
  },
  {
    step: "2",
    title: "Design & Branding",
    description: "Logo design, brand identitet og website mockups",
    duration: "Uge 2-3",
  },
  {
    step: "3",
    title: "Udvikling & Indhold",
    description: "Website udvikling, tekstskrivning og billedproduktion",
    duration: "Uge 4-6",
  },
  {
    step: "4",
    title: "SEO & Lancering",
    description:
      "SEO optimering, test og lancering af din nye digitale tilstedeværelse",
    duration: "Uge 7-8",
  },
];

export const missionPoints = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Tæt samarbejde hele vejen",
    description:
      "Løbende samtaler og feedback sikrer at løsningen bliver perfekt til dine behov",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Gør det enkelt for dig",
    description:
      "Du behøver ikke være teknisk - vi håndterer alt det komplicerede så du kan fokusere på din forretning",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Ingen overraskelser",
    description:
      "Klar kommunikation, faste priser og du ved altid præcis hvor vi er i processen",
  },
];
