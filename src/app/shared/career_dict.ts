export const career_path_info = {
  INCO: [
    {
      name: 'Desarrollador de microcontroladores',
      afinitty: undefined,
      salary: 37000,
      href: 'microcontroller',
    },
    {
      name: 'Desarrollador web',
      afinitty: undefined,
      salary: 25343,
      href: 'web_developer',
    },
    {
      name: 'Cientifico de Datos',
      afinitty: undefined,
      salary: 40499,
      href: 'data_scientist',
    },
    {
      name: 'Administrador de servidores',
      afinitty: undefined,
      salary: 27350,
      href: 'sysadmin',
    },
    {
      name: 'Desarrollador de videojuegos',
      afinitty: undefined,
      salary: 29600,
      href: 'game_dev',
    },
    {
      name: 'Project Manager',
      afinitty: undefined,
      salary: 38337,
      href: 'project_manager',
    },
  ],
  ICOM: [],
  INNI: [
    [
      {
        name: 'Administrador de Bases de datos',
        afinitty: undefined,
        salary: 37000,
        href: 'dba',
      },
      {
        name: 'Desarrollador web',
        afinitty: undefined,
        salary: 25343,
        href: 'web_developer',
      },
      {
        name: 'Cientifico de Datos',
        afinitty: undefined,
        salary: 40499,
        href: 'data_scientist',
      },
      {
        name: 'Administrador de servidores',
        afinitty: undefined,
        salary: 27350,
        href: 'sysadmin',
      },
      {
        name: 'Desarrollador de videojuegos',
        afinitty: undefined,
        salary: 29600,
        href: 'game_dev',
      },
      {
        name: 'Project Manager',
        afinitty: undefined,
        salary: 38337,
        href: 'project_manager',
      },
    ],
  ],
  INFO: [],
  INRO: [],
  INCE: [],
  INBI: [],
};

export const profession_data = {
  microcontroller: {
    name: 'Desarrollador de microcontroladores',
    salary: 37000,
    description: `La carrera de desarrollador de microcontroladores está orientada al diseño, programación y optimización de sistemas embebidos, los cuales utilizan microcontroladores para realizar tareas específicas en una amplia variedad de dispositivos electrónicos. Un microcontrolador es un pequeño sistema computacional en un solo chip que contiene un procesador, memoria y periféricos, y se usa para controlar procesos en tiempo real en dispositivos donde se requiere un alto grado de eficiencia y bajo consumo de energía. \n\nLos desarrolladores de microcontroladores trabajan con hardware y software para crear soluciones que permitan a los dispositivos ejecutar funciones automatizadas, como sensores en automóviles, sistemas de control en electrodomésticos, dispositivos médicos portátiles, sistemas de automatización industrial, entre otros. Parte fundamental del trabajo consiste en la programación a nivel bajo, utilizando lenguajes como C, C++, ensamblador y, en algunos casos, lenguajes específicos del hardware.`,
    companies: [
      {
        name: 'bosch',
        href: 'https://www.bosch.com.mx/carreras/',
      },
      {
        name: 'general_electric',
        href: 'https://jobs.gecareers.com/aviation/global/en/search-results',
      },
      { name: 'texas_instruments', href: 'https://careers.ti.com/' },
      { name: 'intel', href: 'https://jobs.intel.com/es' },
      {
        name: 'nxp_semiconductors',
        href: 'https://nxp.wd3.myworkdayjobs.com/careers',
      },
    ],
    courses: [
      {
        name: 'Introducción al software de sistemas empotrados y a los entornos de desarrollo',
        publisher: 'University of Colorado Boulder',
        href: 'https://www.coursera.org/learn/introduction-embedded-systems',
      },
      {
        name: 'Arquitectura de software y hardware integrado',
        publisher: 'University of Colorado Boulder',
        href: 'https://www.coursera.org/learn/embedded-software-hardware',
      },
      {
        name: 'Introducción al Internet de los objetos y los sistemas empotrados',
        publisher: 'University of California, Irvine',
        href: 'https://www.coursera.org/learn/iot',
      },
    ],
  },
  web_developer: {
    name: 'Desarrollador web',
    salary: 25343,
    description:
      'La carrera de desarrollador web se enfoca en la creación, diseño y mantenimiento de sitios y aplicaciones web. Los desarrolladores web utilizan lenguajes de programación como HTML, CSS y JavaScript para crear interfaces de usuario interactivas, así como lenguajes de backend como Python, Ruby o PHP para gestionar bases de datos y servidores. \n\nEstos profesionales pueden trabajar tanto en el front-end (lo que los usuarios ven y experimentan en una página) como en el back-end (la lógica y los datos que soportan el funcionamiento del sitio), o especializarse en ambos como desarrolladores full-stack. Además de la programación, los desarrolladores web deben asegurarse de que sus proyectos sean eficientes, rápidos, seguros y compatibles con diferentes dispositivos y navegadores. Esto implica optimizar el rendimiento web, gestionar bases de datos, y asegurar la correcta integración con APIs y otros servicios externos. A medida que la tecnología avanza, el desarrollo web también incluye nuevas tendencias como la creación de aplicaciones progresivas (PWA), la implementación de seguridad avanzada y la mejora de la accesibilidad web.',
    companies: [
      {
        name: 'google',
        href: 'https://www.google.com/about/careers/applications/',
      },
      { name: 'amazon', href: 'https://www.amazon.jobs/en' },
      { name: 'meta', href: 'https://www.metacareers.com/' },
      {
        name: 'microsoft',
        href: 'https://careers.microsoft.com/v2/global/en/home.html',
      },
      { name: 'oracle', href: 'https://www.oracle.com/careers/' },
    ],
    courses: [
      {
        name: 'HTML, CSS y Javascript para desarrolladores web',
        publisher: 'John Hopkins University',
        href: 'https://www.coursera.org/learn/html-css-javascript-for-web-developers',
      },
      {
        name: 'Introducción al desarrollo web con HTML, CSS, JavaScript',
        publisher: 'IBM',
        href: 'https://www.coursera.org/learn/introduction-to-web-development-with-html-css-javacript',
      },
      {
        name: 'Full-Stack Development',
        publisher: 'Meta',
        href: 'https://www.coursera.org/learn/the-full-stack',
      },
    ],
  },
  data_scientist: {
    name: 'Cientifico de Datos',
    salary: 40499,
    description:
      'La carrera de científico de datos se centra en la extracción de conocimientos e información útil a partir de grandes volúmenes de datos. Los científicos de datos combinan habilidades en matemáticas, estadística y programación para analizar datos complejos y obtener patrones que puedan guiar la toma de decisiones en las organizaciones. Utilizan herramientas como Python, R y SQL, junto con técnicas avanzadas de análisis, como machine learning, para modelar y predecir tendencias, optimizar procesos o descubrir nuevos conocimientos en áreas como el marketing, la salud, la ingeniería y las finanzas. Además de la habilidad técnica, los científicos de datos también deben tener una buena capacidad de comunicación para interpretar y presentar sus hallazgos de manera clara a equipos no técnicos. \n\nEl trabajo de un científico de datos va desde la recolección y limpieza de datos, hasta la construcción de modelos predictivos, la visualización de resultados y la toma de decisiones basada en datos. En un mundo donde el big data es fundamental para la mayoría de las industrias, la demanda de científicos de datos sigue creciendo.',
    companies: [
      { name: 'amazon', href: 'https://www.amazon.jobs/en' },
      { name: 'netflix', href: 'https://jobs.netflix.com/' },
      { name: 'citi', href: 'https://jobs.citi.com/' },
      {
        name: 'bbva',
        href: 'https://bbva.csod.com/ux/ats/careersite/15/home/?c=bbva',
      },
    ],
    courses: [
      {
        name: 'Programa especializado: Ciencia de Datos',
        publisher: 'John Hopkins University',
        href: 'https://www.coursera.org/specializations/jhu-data-science',
      },
      {
        name: 'Certificado profesional de Ciencia de datos de IBM',
        publisher: 'IBM',
        href: 'https://www.coursera.org/professional-certificates/ibm-data-science',
      },
    ],
  },
  sysadmin: {
    name: 'Administrador de servidores',
    salary: 27350,
    description:
      'La carrera de administrador de servidores se enfoca en la gestión, mantenimiento y optimización de servidores que son esenciales para el funcionamiento de redes y sistemas en organizaciones. Los administradores de servidores son responsables de instalar, configurar y supervisar servidores, asegurando que funcionen correctamente y estén disponibles en todo momento. Esto incluye la gestión de sistemas operativos, la seguridad de la red, las copias de seguridad, y la administración de usuarios y permisos. Además, estos profesionales deben asegurar que los servidores sean escalables y puedan manejar el tráfico y las demandas cambiantes del negocio. \n\nEl rol de un administrador de servidores también implica resolver problemas de hardware y software, monitorear el rendimiento, y aplicar actualizaciones o parches cuando sea necesario. Con el creciente uso de tecnologías en la nube, muchos administradores también deben manejar entornos de servidores virtuales y servicios en la nube como AWS, Azure y Google Cloud. Es crucial que estén al día con las últimas tecnologías y mejores prácticas en seguridad informática para proteger los sistemas de ataques y brechas de seguridad.',
    companies: [
      { name: 'ibm', href: 'https://www.ibm.com/careers/search' },
      { name: 'tcs', href: 'https://ibegin.tcs.com/iBegin/' },
      {
        name: 'deloitte',
        href: 'https://www.linkedin.com/company/deloitte/jobs/',
      },
    ],
    courses: [
      {
        name: 'Administración de sistemas y servicios de infraestructura de TI',
        publisher: 'Google',
        href: 'https://www.coursera.org/learn/system-administration-it-infrastructure-services',
      },
      {
        name: 'Gestión y seguridad de servidores Linux',
        publisher: 'University of Colorado',
        href: 'https://www.coursera.org/learn/linux-server-management-security',
      },
    ],
  },
  game_dev: {
    name: 'Desarrollador de videojuegos',
    salary: 29600,
    description:
      'La carrera de desarrollador de videojuegos se centra en la creación y diseño de juegos interactivos para plataformas como consolas, computadoras, dispositivos móviles y realidad virtual. Los desarrolladores de videojuegos trabajan en diversos aspectos del proceso de desarrollo, como la programación del motor del juego, la creación de mecánicas, la inteligencia artificial y la optimización del rendimiento. Utilizan herramientas y lenguajes de programación como C++, C#, Unity, Unreal Engine, y otros motores gráficos para dar vida a mundos virtuales. También colaboran con diseñadores gráficos, artistas y compositores para crear experiencias inmersivas y entretenidas. \n\nAdemás de las habilidades técnicas, los desarrolladores de videojuegos necesitan una gran creatividad para diseñar mecánicas innovadoras y equilibrar la jugabilidad. Deben comprender cómo mejorar la experiencia del jugador mediante la implementación de sistemas intuitivos y atractivos. A medida que la industria de los videojuegos sigue creciendo y evolucionando, las oportunidades en áreas como la realidad aumentada (AR), la realidad virtual (VR) y los juegos móviles presentan nuevos desafíos y oportunidades para los desarrolladores.',
    companies: [
      { name: 'electronic_arts', href: 'https://ea.gr8people.com/jobs' },
      {
        name: 'ubisoft',
        href: 'https://www.ubisoft.com/en-us/company/careers/search',
      },
      { name: 'activision', href: 'https://careers.activision.com/' },
    ],
    courses: [
      {
        name: 'Programa especializado: Diseño y desarrollo de juegos con Unity 2020',
        publisher: 'Michigan State University',
        href: 'https://www.coursera.org/specializations/game-design-and-development',
      },
      {
        name: 'Programa especializado: Programación en C# para el desarrollo de juegos Unity',
        publisher: 'University of Colorado',
        href: 'https://www.coursera.org/specializations/programming-unity-game-development',
      },
      {
        name: 'Fundamentos del motor Unreal',
        publisher: 'Epic Games',
        href: 'https://www.coursera.org/learn/unreal-engine-fundamentals',
      },
    ],
  },
  project_manager: {
    name: 'Project Manager',
    salary: 38337,
    description:
      'La carrera de Project Manager se enfoca en la planificación, ejecución y supervisión de proyectos para asegurar que se cumplan los objetivos dentro del plazo, presupuesto y alcance establecidos. Los Project Managers son responsables de coordinar equipos multidisciplinarios, gestionar recursos y riesgos, y comunicarse con las partes interesadas para garantizar el éxito de los proyectos. Utilizan metodologías como Agile, Scrum y PMI para organizar y controlar las fases de un proyecto, asegurando que cada tarea esté alineada con los objetivos estratégicos de la organización. \n\nAdemás de habilidades técnicas en gestión de proyectos, los Project Managers necesitan habilidades de liderazgo y comunicación para motivar equipos, resolver problemas y tomar decisiones bajo presión. A medida que las empresas se vuelven más complejas y globalizadas, la demanda de Project Managers crece en diversas industrias, como la tecnología, la construcción, la consultoría y la manufactura. Las certificaciones como PMP (Project Management Professional) o Scrum Master son altamente valoradas en el campo y ayudan a los profesionales a destacar en un entorno competitivo.',
    companies: [
      { name: 'ntt_data', href: 'https://www.nttdata.com/global/en/careers' },
      {
        name: 'deloitte',
        href: 'https://www.linkedin.com/company/deloitte/jobs/',
      },
      { name: 'globant', href: 'https://www.globant.com/careers' },
      { name: 'cognizant', href: 'https://careers.cognizant.com/global-en/' },
    ],
    courses: [
      {
        name: 'Iniciar y planificar proyectos',
        publisher: 'University of California, Irvine',
        href: 'https://www.coursera.org/learn/project-planning',
      },
      {
        name: 'Certificado profesional de Gestión de proyectos de Google',
        publisher: 'Google',
        href: 'https://www.coursera.org/professional-certificates/google-project-management',
      },
    ],
  },
  dba: {
    name: 'Administrador de Bases de datos',
    salary: 37000,
    description:
      'La carrera de Administrador de Bases de Datos (DBA, por sus siglas en inglés) se enfoca en la gestión, organización y mantenimiento de los sistemas de bases de datos de una empresa. Los DBAs son responsables de asegurar que los datos estén disponibles, sean seguros y se almacenen de manera eficiente. Esto incluye tareas como la instalación y configuración de software de bases de datos, la implementación de copias de seguridad y la recuperación ante desastres, así como la optimización del rendimiento de las consultas de bases de datos. Los administradores de bases de datos también implementan medidas de seguridad para proteger la información sensible contra accesos no autorizados o fallos del sistema. Además de la parte técnica, los DBAs trabajan estrechamente con los equipos de desarrollo y operaciones para garantizar que las bases de datos funcionen correctamente con las aplicaciones empresariales. Con el auge del big data, la computación en la nube y la inteligencia artificial, la administración de bases de datos ha evolucionado para incluir tecnologías modernas como bases de datos NoSQL, la automatización en la nube, y sistemas distribuidos, lo que aumenta la necesidad de que los profesionales en este campo se mantengan actualizados en las últimas herramientas y tendencias.',
    companies: [
      { name: 'oracle', href: 'https://www.oracle.com/careers/' },
      { name: 'ibm', href: 'https://www.ibm.com/careers/search' },
      { name: 'SAP', href: 'https://jobs.sap.com/' },
    ],
    courses: [
      {
        name: 'Aspectos esenciales de la gestión de bases de datos',
        publisher: 'University of California',
        href: 'https://www.coursera.org/learn/database-management',
      },
      {
        name: 'Programa especializado: Bases de datos SQL Oracle',
        publisher: 'LearnQuest',
        href: 'https://www.coursera.org/specializations/oracle-sql-databases',
      },
      {
        name: 'Administración de bases de datos relacionales (DBA)',
        publisher: 'IBM',
        href: 'https://www.coursera.org/learn/relational-database-administration',
      },
    ],
  },
};

export function getCareerProfessionalProfiles(career_id: number) {
  if (career_id === 1) {
    return career_path_info.INCO;
  } else if (career_id === 2) {
    return career_path_info.ICOM;
  } else if (career_id === 3) {
    return career_path_info.INNI;
  } else if (career_id === 4) {
    return career_path_info.INFO;
  } else if (career_id === 5) {
    return career_path_info.INRO;
  } else if (career_id === 6) {
    return career_path_info.INCE;
  } else if (career_id === 7) {
    return career_path_info.INBI;
  }

  return [];
}
