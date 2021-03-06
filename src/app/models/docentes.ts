import { Usuarios } from './usuarios';
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
  nombre_banco: string;
  numero_cuenta: number;
  tipo_cuenta: string;
  carnet_identidad: number;
  created_at: Date;
  updated_at: Date;
}

export interface DocentesUsuarios {
  usuario: Usuarios;
  docente: Docentes;
}
