import { ResearchPaper, Soundscape, Photo, Profile } from './types';

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

export const SOUNDSCAPES: Soundscape[] = [
  {
    id: 's1',
    title: 'Metrópolis Líquida',
    description: 'Grabaciones de campo procesadas de las alcantarillas de Berlín.',
    duration: '12:45',
    type: 'soundscape'
  },
  {
    id: 's2',
    title: 'Ecos del Silencio (Piano & Granular)',
    description: 'Composición para piano preparado y síntesis granular.',
    duration: '06:12',
    type: 'music'
  }
];

export const PHOTOS: Photo[] = [
  { id: 'p1', url: 'https://picsum.photos/800/600?random=1', caption: 'Luz y Sombra' },
  { id: 'p2', url: 'https://picsum.photos/600/800?random=2', caption: 'Geometría Urbana' },
  { id: 'p3', url: 'https://picsum.photos/800/1200?random=3', caption: 'Textura del Olvido' },
  { id: 'p4', url: 'https://picsum.photos/1200/800?random=4', caption: 'Reflejos' },
  { id: 'p5', url: 'https://picsum.photos/1000/1000?random=5', caption: 'Minimalismo Natural' },
];