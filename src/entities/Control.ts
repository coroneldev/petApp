export interface VacunaMascota {
  id: number;
  vacuna_id: number;
  vacuna_nombre: string;
  fecha_aplicacion: string;      // fecha en formato ISO
  proxima_aplicacion: string;    // fecha en formato ISO
  observaciones: string;
  usuario_id: number | null;     // puede ser null según la API
  usuario_nombre: string | null; // puede ser null según la API
}