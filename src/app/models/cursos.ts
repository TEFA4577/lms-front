/**
 * interface para tipado de cursos
 */
export interface Cursos {
  id_curso: number;
  id_usuario: number;
  nombre_curso: string;
  descripcion_curso: string;
  modulos_curso: number;
  imagen_curso: string;
  estado_curso: string;
  usuario_revisor: null;
  mensaje: null;
  precio: string;
  created_at: Date;
  updated_at: Date;
}
export interface EtiquetasCurso {
  id_etiqueta: number;
  nombre_etiqueta: string;
  descripcion_etiqueta: string;
  imagen_etiqueta: string;
  estado_etiqueta: number;
  pivot: Pivot;
}

export interface Pivot {
  id_curso: number;
  id_etiqueta: number;
}
