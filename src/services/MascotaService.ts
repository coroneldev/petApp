import http from "@/http-common";
import { Mascota } from "@/entities/Mascota";
import { Vacuna } from "@/entities/Vacuna";

interface MascotaApiResponse {
  status: boolean;
  message: string;
  data: Mascota;
}

interface VacunasApiResponse {
  status: boolean;
  message: string;
  data: Vacuna[];
}

class MascotaService {

  // Método para obtener la mascota por código
  async getByCodigo(codigo: string): Promise<Mascota | null> {
    try {
      const res = await http.get<MascotaApiResponse>(`/mascotas/codigo/${codigo}`);
      console.log("Respuesta completa del API:", res.data);

      // Retornamos solo el objeto Mascota
      return res.data.data;

    } catch (error) {
      console.error(`Error al buscar la mascota con código ${codigo}:`, error);
      throw error;
    }
  }

  // Método para obtener las vacunas de la mascota por código
  async getVacunasByCodigo(codigo: string): Promise<Vacuna[]> {
    try {
      const res = await http.get<VacunasApiResponse>(`/mascotas/codigo/${codigo}/vacunas`);
      console.log("Vacunas obtenidas del API:", res.data);

      return res.data.data;
    } catch (error) {
      console.error(`Error al obtener las vacunas de la mascota con código ${codigo}:`, error);
      throw error;
    }
  }

}

export default new MascotaService();
