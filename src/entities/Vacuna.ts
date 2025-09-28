export interface Veterinario {
  id: number;
  apellido_paterno: string;
  apellido_materno: string;
  nombres: string;
  cedula_identidad: string;
  expedicion_ci: string;
  fecha_nacimiento: string; // formato YYYY-MM-DD
  sexo: string;
  celular: string;
  email: string;
  email_verified_at: string | null;
  estado: string;
  user_creador_id: number | null;
  user_modificador_id: number | null;
  user_eliminador_id: number | null;
  fecha_creacion: string | null;
  fecha_modificacion: string | null;
  fecha_eliminacion: string | null;
  rol_id: number;
}

export interface Vacuna {
  id: number;
  nombre: string;
  descripcion: string;
  numero_dosis_requeridas: number;
  intervalo_dosis: number;
  especie_destinada: string;
  estado: boolean;
  veterinario_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  veterinario: Veterinario;
}

export interface VacunaApiResponse {
  status: boolean;
  message: string;
  data: Vacuna;
}
