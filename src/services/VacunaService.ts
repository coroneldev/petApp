// src/services/VacunaService.ts
import http from "@/http-common";  // Importa la configuración de axios
import { Vacuna } from "@/entities/Vacuna";

class VacunaService {

  // Método para obtener la Vacuna por código id
  async getByCodigo(id: number): Promise<Vacuna | null> {
    try {
      const res = await http.get(`/vacunas/${id}`);
       console.log("Realizando solicitud GET de vacunas:", res);  
        return res.data
    } catch (error) {
      console.error(`Error al buscar la vacuna con código ${id}:`, error);
      throw error;
    }
  }
}

export default new VacunaService();
