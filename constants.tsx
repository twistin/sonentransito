import { ResearchPaper, Profile } from './types';

export const PROFILE_DATA: Profile = {
  name: "Silvino Díaz Carreras",
  role: "Guitarrista · Musicólogo · Creador de herramientas educativas",
  bio: "Llevo más de cuatro décadas con la guitarra entre las manos y 26 años enseñando en el Conservatorio de Ponteareas. Mi día a día mezcla la docencia —Historia de la Música, Nuevas Tecnologías, Guitarra— con la investigación y la programación creativa. Me apasiona explorar cómo el sonido, la tecnología y la identidad se entrelazan. Actualmente compagino las clases con mi proyecto de Live Coding, la composición algorítmica y el desarrollo de aplicaciones educativas. Creo que la música es un espacio de exploración, pensamiento crítico y creación constante.",
  focus: [
    "Live Coding & SuperCollider",
    "Composición algorítmica",
    "Escenas musicales e identidad",
    "Desarrollo de apps educativas",
    "Musicología & Etnomusicología",
    "Guitarra clásica y eléctrica",
    "IA aplicada a la música",
    "Pedagogía musical"
  ],
  education: [
    {
      degree: "Doctorando en Música e Identidad",
      institution: "UNED · 'Cantando en tierra ajena' - Comunidades Migrantes",
      year: "En curso"
    },
    {
      degree: "26 años de docencia",
      institution: "Conservatorio Profesional Reveriano Soutullo · Ponteareas",
      year: "Activo"
    },
    {
      degree: "Diploma de Estudios Avanzados (DEA)",
      institution: "Música en la España Contemporánea",
      year: "Postgrado"
    },
    {
      degree: "Licenciado en Historia y CC de la Música",
      institution: "Facultad de Geografía e Historia",
      year: "Licenciatura"
    },
    {
      degree: "Profesor Superior de Música (Guitarra)",
      institution: "Conservatorio Superior de Música",
      year: "Título Superior"
    }
  ]
};


export const RESEARCH_DATA: ResearchPaper[] = [
  {
    id: '1',
    title: 'El Estado del Arte Digital: Historia, Escenas, Pedagogía y Futuros de la Inteligencia Artificial',
    abstract: 'Exploración comprehensiva del arte digital y la inteligencia artificial, abarcando su evolución histórica, las escenas contemporáneas, implicaciones pedagógicas y proyecciones futuras en la composición algorítmica y la música electrónica.',
    date: '2025',
    category: 'Journal Article',
    url: 'https://www.academia.edu/145039301/El_Estado_del_Arte_Digital_Historia_Escenas_Pedagog%C3%ADa_y_Futuros_de_la_Inteligencia_Artificial',
    tags: ['Electronic Music', 'Live Coding', 'Composición Algorítmica', 'IA', 'Música Ambient']
  },
  {
    id: '2',
    title: 'Proyecto Educativo ABP Etnomusicológico para Conservatorios',
    abstract: 'Propuesta de proyecto educativo basado en el Aprendizaje Basado en Proyectos (ABP) aplicado a la etnomusicología en el contexto de los conservatorios de música.',
    date: '2025',
    category: 'Educational Research',
    url: 'https://www.academia.edu/144692894/Proyecto_Educativo_ABP_Etnomusicologico_para_conservatorios',
    tags: ['Etnomusicología', 'ABP', 'Educación Musical', 'Conservatorios']
  },
  {
    id: '3',
    title: 'SuperCollider: Un Análisis de la Computación Sonora en el Live Coding, la Composición Electroacústica y la Pedagogía Académica',
    abstract: 'Análisis profundo sobre el uso de SuperCollider como herramienta para la computación sonora, explorando sus aplicaciones en live coding, composición electroacústica y su integración en la pedagogía musical académica.',
    date: '2025',
    category: 'Journal Article',
    url: 'https://www.academia.edu/145039636/SuperCollider_Un_An%C3%A1lisis_de_la_Computaci%C3%B3n_Sonora_en_el_Live_Coding_la_Composici%C3%B3n_Electroac%C3%BAstica_y_la_Pedagog%C3%ADa_Acad%C3%A9mica',
    tags: ['SuperCollider', 'Live Coding', 'Arte Sonoro', 'Composición Electroacústica']
  },
  {
    id: '4',
    title: 'La Escena Musical como Crisol Dinámico: Articulaciones, Luchas y Transformaciones en la Música Popular',
    abstract: 'Estudio sobre las escenas musicales como espacios dinámicos donde se articulan identidades culturales, luchas sociales y transformaciones en el contexto de la música popular y la globalización.',
    date: '2025',
    category: 'Cultural Studies',
    url: 'https://www.academia.edu/129268840/La_Escena_Musical_como_Crisol_Din%C3%A1mico_Articulaciones_Luchas_y_Transformaciones_en_la_M%C3%BAsica_Popular',
    tags: ['Cultural Studies', 'Globalización', 'Identidad Cultural', 'Escenas Musicales']
  },
  {
    id: '5',
    title: 'A Escena Musical da Galiza Posmoderna',
    abstract: 'Capítulo del libro "40 anos da MODA en Galicia". Análisis de la escena musical gallega en el contexto posmoderno, explorando la Movida y su impacto en la identidad cultural de Galicia.',
    date: '2022',
    category: 'Capítulo de Libro',
    url: 'https://www.academia.edu/66848470/A_escena_musical_da_Galiza_posmoderna',
    tags: ['Escenas Musicales', 'Etnomusicología', 'Galicia', 'Movida']
  },
  {
    id: '6',
    title: 'Escenas Musicais Locais Hoxe en Día: Unha Ferramenta Válida',
    abstract: 'Investigación sobre la validez y relevancia de las escenas musicales locales como herramienta de análisis en los estudios culturales y la etnomusicología contemporánea.',
    date: '2017',
    category: 'Cultural Studies',
    url: 'https://www.academia.edu/34394791/Escenas_musicais_locais_hoxe_en_d%C3%ADa_Unha_ferramenta_v%C3%A1lida',
    tags: ['Cultural Studies', 'Popular Music', 'Etnomusicología', 'Escenas Musicales']
  },
  {
    id: '7',
    title: '4 Babys: Clasismo e Machismo, Dúas Caras da Mesma Moeda',
    abstract: 'Análisis crítico sobre las intersecciones entre clasismo y machismo en la música popular urbana, explorando narrativas de identidad y sexismo en el contexto de la musicología urbana.',
    date: '2017',
    category: 'Cultural Studies',
    url: 'https://www.academia.edu/33291183/4_Babys_Clasismo_e_machismo_d%C3%BAas_caras_da_mesma_moeda',
    tags: ['Popular Music', 'Identidad', 'Sexismo', 'Musicología Urbana']
  }
];
