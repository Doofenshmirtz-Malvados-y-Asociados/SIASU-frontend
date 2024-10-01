export const career_path_info = {
  INCO: [
    {
      name: 'Desarrollador de microcontroladores',
      afinitty: undefined,
      salary: 37000,
      href: '#',
    },
    {
      name: 'Desarrollador web',
      afinitty: undefined,
      salary: 25343,
      href: '#',
    },
    {
      name: 'Cientifico de Datos',
      afinitty: undefined,
      salary: 40499,
      href: '#',
    },
    {
      name: 'Administrador de servidores',
      afinitty: undefined,
      salary: 27350,
      href: '#',
    },
    {
      name: 'Desarrollador de videojuegos',
      afinitty: undefined,
      salary: 29600,
      href: '#',
    },
    {
      name: 'Project Manager',
      afinitty: undefined,
      salary: 38337,
      href: '#',
    },
  ],
  ICOM: [],
  INNI: [
    [
      {
        name: 'Administrador de Bases de datos',
        afinitty: undefined,
        salary: 37000,
        href: '#',
      },
      {
        name: 'Desarrollador web',
        afinitty: undefined,
        salary: 25343,
        href: '#',
      },
      {
        name: 'Cientifico de Datos',
        afinitty: undefined,
        salary: 40499,
        href: '#',
      },
      {
        name: 'Administrador de servidores',
        afinitty: undefined,
        salary: 27350,
        href: '#',
      },
      {
        name: 'Desarrollador de videojuegos',
        afinitty: undefined,
        salary: 29600,
        href: '#',
      },
      {
        name: 'Project Manager',
        afinitty: undefined,
        salary: 38337,
        href: '#',
      },
    ],
  ],
  INFO: [],
  INRO: [],
  INCE: [],
  INBI: []
};

export function getCareerProfessionalProfiles(career_id: number) {
    if (career_id === 1) {
        return career_path_info.INCO
    }

    return []
}