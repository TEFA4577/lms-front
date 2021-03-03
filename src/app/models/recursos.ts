/**
 * interface para tipado de recursos
 */
export interface Recursos {
  id_recurso: number;
  id_clase: number;
  id_recurso_tipo: number;
  nombre_recurso: string;
  link_recurso: string;
  created_at: Date;
  updated_at: Date;
}
