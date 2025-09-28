export interface Usuario {
  id: number;
  apellido_paterno: string;
  apellido_materno: string;
  nombres: string;
  cedula_identidad: string;
  expedicion_ci: string;
  fecha_nacimiento: string;
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

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  documento: string;
  telefono: string;
  direccion: string;
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Mascota {
  id: number;
  codigo: string;
  nombre: string;
  edad: number;
  peso: string;
  foto: string;
  especie: string;
  raza: string;
  sexo: string;
  detalles: string;
  cliente_id: number;
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
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
}

export interface Control {
  id: number;
  mascota_id: number;
  vacuna_id: number;
  user_id: number;
  cliente_id: number;
  fecha_aplicacion: string;   // YYYY-MM-DD
  proxima_aplicacion: string; // YYYY-MM-DD
  observaciones: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;

  // Relaciones opcionales
  usuario?: Usuario;
  cliente?: Cliente;
  mascota?: Mascota;
  vacuna?: Vacuna;
}

export interface ControlApiResponse {
  status: boolean;
  message: string;
  data: Control;
}
