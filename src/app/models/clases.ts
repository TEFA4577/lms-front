/**
 * interface para tipado de clases
 */
export interface Clases {
  id_clase: number;
  id_modulo: number;
  titulo_clase: string;
  descripcion_clase: string;
  estado_clase: number;
  created_at: Date;
  updated_at: Date;
}
