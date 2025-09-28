import http from "@/http-common";
import { Vacuna } from "@/entities/Vacuna";

interface VacunasControlApiResponse {
  status: boolean;
  message: string;
  data: Vacuna[]; // O VacunaControl[] si quieres diferenciar de la entidad Vacuna
}

class ControlService {

  // Obtener controles/vacunas de una mascota por código
  async getVacunasByCodigo(codigo: string): Promise<Vacuna[]> {
    try {
      const res = await http.get<VacunasControlApiResponse>(`/mascota/codigo/${codigo}/vacunas`);
      console.log("Vacunas obtenidas del API:", res.data);

      return res.data.data;
    } catch (error) {
      console.error(`Error al obtener las vacunas de la mascota con código ${codigo}:`, error);
      throw error;
    }
  }

}

export default new ControlService();
