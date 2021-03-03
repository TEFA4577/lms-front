/**
 * interface para tipado de docentes
 */
export interface Docentes {
  id_docente: number;
  id_usuario: number;
  telefono_docente: number;
  estado_docente: number;
  descripcion_docente: null | string;
  video_presentacion: null | string;
  cv_docente: null | string;
  experiencia_docente: null | string;
  created_at: Date;
  updated_at: Date;
}
