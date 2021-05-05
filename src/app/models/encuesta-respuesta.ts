export interface EncuestaRespuesta {
  id_encuesta_respuesta: number;
  id_encuesta_pregunta: number;
  id_usuario: number;
  texto_encuesta_respuesta: string;
  estado_encuesta_respuesta: number;
  created_at: Date;
  updated_at: Date;
}
