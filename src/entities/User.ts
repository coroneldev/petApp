export interface Usuario {
  id: number;
  apellido_paterno: string;
  apellido_materno: string;
  nombres: string;
  cedula_identidad: string;
  expedicion_ci: string;
  fecha_nacimiento: string;      // YYYY-MM-DD
  sexo: string;
  celular: string;
  email: string;
  email_verified_at?: string | null;
  estado: string;
  user_creador_id?: number | null;
  user_modificador_id?: number | null;
  user_eliminador_id?: number | null;
  fecha_creacion?: string | null;
  fecha_modificacion?: string | null;
  fecha_eliminacion?: string | null;
  rol_id: number;
}
