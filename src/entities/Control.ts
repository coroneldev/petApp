import { Mascota } from "./Mascota";
import { Cliente } from "./Cliente";
import { Usuario } from "./User";
import { Vacuna } from "./Vacuna";

export interface Control {
  id: number;
  mascota_id: number;
  vacuna_id: number;
  user_id: number;
  cliente_id: number;
  fecha_aplicacion: string;   // YYYY-MM-DD
  proxima_aplicacion: string; // YYYY-MM-DD
  observaciones: string;
  deleted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;

  // Relaciones opcionales
  usuario?: Usuario;
  cliente?: Cliente;
  mascota?: Mascota;
  vacuna?: Vacuna;
}