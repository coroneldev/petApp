import { Cliente } from "./Cliente"; // Asegúrate de tener esta interfaz

export interface Mascota {
  id: number;
  cliente_id: number;       // antes era id_cliente
  codigo: string;
  nombre: string;
  edad: number;             // edad es number en la API
  peso: string;             // peso es string en la API
  foto: string;
  especie: string;
  raza: string;
  sexo: string;
  detalles: string;
  cliente?: Cliente;        // relación opcional con el cliente
}
