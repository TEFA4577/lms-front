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
        titulo: '¿Como subir un curso?',
        link: 'cursos/tutoriales'
      },
      {
        titulo: 'Mis Cursos Adquiridos',
        link: '/estudiante/mis-cursos-adquiridos'
      },
      {
        titulo: 'Mis Estudiantes',
        link: 'cursos/estudiantes'
      }
    ]
  },
  {
    grupo: 'Membresias',
    contenido: [
      {
        titulo: 'Adquirir Membresia',
        link: './membresias/docente-membresia'
      }
    ]
  }
];
export const MENU_ADMIN = [
  {
    grupo: 'Usuarios',
    contenido: [
      {
        titulo: 'Administrar Usuarios',
        link: './usuarios/administrar',
      }
    ]
  },
  {
    grupo: 'Membresia',
    contenido: [
      {
        titulo: 'Administrar Membresia',
        link: './membresias'
      },
      {
        titulo: 'Solicitud de Membresia',
        link: './membresias/solicitudes',
      }
    ]
  },
  {
    grupo: 'Cursos',
    contenido: [
      {
        titulo: 'Administrar Cursos',
        link: './cursos/administar-cursos',
      },
      {
        titulo: 'Solicitudes de Cursos',
        link: './cursos/lista',
      },
      {
        titulo: 'Solicitudes de Compra',
        link: './cursos/solicitudes',
      },
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
    grupo: 'Preguntas y encuestas',
    contenido: [
      {
        titulo: 'Preguntas Frecuentas',
        link: './preguntas-frecuentes'
      },
      {
        titulo: 'Realiza tus encuestas',
        link: './encuestas'
      }
    ]
  }
];
