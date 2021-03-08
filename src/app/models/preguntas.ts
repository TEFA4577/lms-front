/**
 * interface para tipado de preguntas
 */
export interface Preguntas {
  id_pregunta: number;
  texto_pregunta: string;
  estado_clase: number;
  created_at: Date;
  updated_at: Date;
}
