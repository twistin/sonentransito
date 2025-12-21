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
    title: 'Proyecto Educativo ABP Etnomusicológico para Conservatorios',
    abstract: 'Propuesta de proyecto educativo basado en el Aprendizaje Basado en Proyectos (ABP) aplicado a la etnomusicología en el contexto de los conservatorios de música.',
    date: '2025',
    category: 'Educational Research',
    url: 'https://www.academia.edu/144692894/Proyecto_Educativo_ABP_Etnomusicologico_para_conservatorios',
    tags: ['Etnomusicología', 'ABP', 'Educación Musical', 'Conservatorios']
  },
  {
    id: '2',
    title: 'SuperCollider: Un Análisis de la Computación Sonora en el Live Coding, la Composición Electroacústica y la Pedagogía Académica',
    abstract: 'Análisis profundo sobre el uso de SuperCollider como herramienta para la computación sonora, explorando sus aplicaciones en live coding, composición electroacústica y su integración en la pedagogía musical académica.',
    date: '2025',
    category: 'Journal Article',
    url: 'https://www.academia.edu/145039636/SuperCollider_Un_An%C3%A1lisis_de_la_Computaci%C3%B3n_Sonora_en_el_Live_Coding_la_Composici%C3%B3n_Electroac%C3%BAstica_y_la_Pedagog%C3%ADa_Acad%C3%A9mica',
    tags: ['SuperCollider', 'Live Coding', 'Arte Sonoro', 'Composición Electroacústica']
  },
  {
    id: '3',
    title: 'La Escena Musical como Crisol Dinámico: Articulaciones, Luchas y Transformaciones en la Música Popular',
    abstract: 'Estudio sobre las escenas musicales como espacios dinámicos donde se articulan identidades culturales, luchas sociales y transformaciones en el contexto de la música popular y la globalización.',
    date: '2025',
    category: 'Cultural Studies',
    url: 'https://www.academia.edu/129268840/La_Escena_Musical_como_Crisol_Din%C3%A1mico_Articulaciones_Luchas_y_Transformaciones_en_la_M%C3%BAsica_Popular',
    tags: ['Cultural Studies', 'Globalización', 'Identidad Cultural', 'Escenas Musicales']
  }
];

