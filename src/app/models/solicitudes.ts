import { Usuarios } from './usuarios';

export interface Solicitudes {
  id_usuario_curso: number;
  id_usuario: number;
  id_curso: number;
  progreso_curso: null;
  estado_usuario_curso: string;
  comprobante: null;
  curso_solicitado: CursoSolicitado;
  usuario: Usuarios;
}

export interface CursoSolicitado {
  id_curso: number;
  id_usuario: number;
  nombre_curso: string;
  descripcion_curso: string;
  imagen_curso: string;
  estado_curso: string;
  usuario_revisor: null;
  mensaje: null;
  precio: string;
  created_at: Date;
  updated_at: Date;
}

export interface SolicitudesMembresia {
  id_membresia_usuario: number;
  id_usuario: number;
  id_membresia: number;
  estado_membresia_usuario: string;
  comprobante: null;
  membresia_solicitada: MembresiaSolicitada;
  usuario: Usuarios;
}

export interface MembresiaSolicitada {
  id_membresia: number;
  nombre_membresia: string;
  texto_membresia: string;
  imagen_membresia: string;
  estado_membresia: string;
  precio_membresia: string;
  created_at: Date;
  updated_at: Date;
}
