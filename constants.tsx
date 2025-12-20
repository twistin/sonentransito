import { ResearchPaper, Profile } from './types';

export const PROFILE_DATA: Profile = {
  name: "Silvino Díaz Carreras",
  role: "Investigador Doctoral & Artista Sonoro",
  bio: "Mi práctica se sitúa en la intersección de la fenomenología del sonido, los estudios de migración y la creación algorítmica. Exploro cómo el tiempo kairológico y los espacios liminales configuran nuestra percepción de la realidad. A través de la captura binaural y la síntesis granular, busco traducir lo inefable en experiencias sonoras que inviten a la revelación y al tránsito consciente.",
  focus: [
    "identidad",
    "música y migración",
    "Escenas musicales",
    "Música algoritmica",
    "Live Coding",
    "IA",
    "EdTech",
    "Tecnología"
  ],
  education: [
    {
      degree: "Doctorando en Música e Identidad",
      institution: "UNED · Línea: Comunidades Migrantes · Título: 'Cantando en tierra ajena'",
      year: "En curso"
    },
    {
      degree: "Diploma de Estudios Avanzados (DEA)",
      institution: "Programa: Música en la España Contemporánea",
      year: "Postgrado"
    },
    {
      degree: "Licenciado en Historia y CC de la Música",
      institution: "Facultad de Geografía e Historia",
      year: "Licenciatura"
    },
    {
      degree: "Profesor Superior de Música",
      institution: "Conservatorio Superior de Música",
      year: "Título Superior"
    }
  ]
};

export const RESEARCH_DATA: ResearchPaper[] = [
  {
    id: '1',
    title: 'Intersticialidad Sonora: Fenomenología de la Escucha en Espacios Liminales',
    abstract: 'Esta investigación doctoral explora cómo los sonidos en los límites de la percepción consciente moldean nuestra experiencia del espacio urbano y la memoria colectiva.',
    date: '2023',
    category: 'Doctoral Thesis'
  },
  {
    id: '2',
    title: 'Algoritmos y Estética: Hacia una Epistemología de lo Incalculable',
    abstract: 'Un análisis crítico sobre el papel de la IA en la creación artística y su impacto en la definición de originalidad en la era del post-humanismo.',
    date: '2022',
    category: 'Journal Article'
  }
];
