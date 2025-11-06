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
      console.log("Intentando conectar al backend con código:", codigo);

      const res = await http.get<MascotaApiResponse>(`/mascotas/codigo/${codigo}`, {
        timeout: 10000, // Timeout opcional de 10 segundos
        validateStatus: (status) => status < 500, // No lanzar excepción por errores < 500
      });

      console.log("HTTP status:", res.status);
      console.log("Respuesta completa del API:", res.data);

      if (res.data && res.data.status) {
        return res.data.data; // Todo OK
      } else {
        console.warn("API respondió status false o sin data:", res.data);
        return null;
      }

    } catch (error: any) {
      if (error.response) {
        console.error("Error HTTP:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No hay respuesta del servidor:", error.request);
      } else {
        console.error("Error inesperado:", error.message);
      }
      throw error;
    }
  }

  // Método para obtener las vacunas de la mascota por código
  async getVacunasByCodigo(codigo: string): Promise<Vacuna[]> {
    try {
      console.log("Solicitando vacunas para código:", codigo);

      const res = await http.get<VacunasApiResponse>(`/mascotas/codigo/${codigo}/vacunas`, {
        timeout: 10000,
        validateStatus: (status) => status < 500,
      });

      console.log("HTTP status vacunas:", res.status);
      console.log("Vacunas obtenidas del API:", res.data);

      if (res.data && res.data.status) {
        return res.data.data;
      } else {
        console.warn("API vacunas respondió status false o sin data:", res.data);
        return [];
      }

    } catch (error: any) {
      if (error.response) {
        console.error("Error HTTP vacunas:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No hay respuesta del servidor vacunas:", error.request);
      } else {
        console.error("Error inesperado vacunas:", error.message);
      }
      throw error;
    }
  }

}

export default new MascotaService();
