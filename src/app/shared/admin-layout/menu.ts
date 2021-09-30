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
        titulo: 'Mi panel de cursos creados',
        link: './curso/mis-cursos',
      },
      {
        titulo: 'Tutoriales',
        link: 'cursos/tutoriales'
      },
      {
        titulo: 'Mis estudiantes',
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
    grupo: 'Reportes y Graficas',
    contenido: [
      {
        titulo: 'Encuestas',
        link: './preguntas-frecuentes'
      },
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
    grupo: 'Membresias',
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
    grupo: 'Preguntas y encuestas',
    contenido: [
      {
        titulo: 'Preguntas Frecuentes',
        link: './preguntas-frecuentes'
      },
      {
        titulo: 'Encuestas',
        link: './encuestas'
      }
    ]
  }, {
    grupo: 'Docentes',
    contenido: [
      {
        titulo: 'Solicitud Docente',
        link: './usuarios/administrar',
      }
    ]
  },
  {
    grupo: 'Categorias',
    contenido: [
      {
        titulo: 'Administrar Categorias',
        link: './etiquetas'
      }
    ]
  }
];
