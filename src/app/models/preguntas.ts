/**
 * interface para tipado de preguntas
 */
export interface Preguntas {
  id_pregunta: number;
  texto_pregunta: string;
  estado_pregunta: number;
  created_at: Date;
  updated_at: Date;
}

export interface Respuestas {
  id_respuesta_pregunta: number;
  id_pregunta: number;
  texto_respuesta_pregunta: string;
  estado_respuesta_pregunta: number;
  created_at: Date;
  updated_at: Date;
}
