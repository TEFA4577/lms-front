export const MENU_DOCENTE = [
  {
    grupo: 'Incio',
    contenido: [
      {
        titulo: 'Volver a Inicio',
        link: ''
      }
    ]
  },
  {
    grupo: 'Cursos',
    contenido: [
      {
        titulo: 'Mis Cursos',
        link: './curso/mis-cursos',
      },
      {
        titulo: 'Mis Cursos Adquiridos',
        link: '/estudiante/mis-cursos-adquiridos'
      },
    ]
  }
];
export const MENU_ADMIN = [
  {
    grupo: 'Usuarios',
    contenido: [
      {
        titulo: 'Administrar Usuarios',
        link: './cursos/lista',
      },
    ]
  },
  {
    grupo: 'Cursos',
    contenido: [
      {
        titulo: 'Administrar Cursos',
        link: './cursos/lista',
      },
      {
        titulo: 'Solicitudes de Compra',
        link: './cursos/solicitudes',
      }
    ]
  },
  {
    grupo: 'Etiquetas',
    contenido: [
      {
        titulo: 'Administrar Etiquetas',
        link: './etiquetas'
      }
    ]
  },
  {
    grupo: 'Preguntas',
    contenido: [
      {
        titulo: 'Preguntas Frecuentas',
        link: './preguntas-frecuentes'
      }
    ]
  },
  {
    grupo: 'Encuestas',
    contenido: [
      {
        titulo: 'Realiza tus encuestas',
        link: './preguntas-frecuentes'
      }
    ]
  }
];
