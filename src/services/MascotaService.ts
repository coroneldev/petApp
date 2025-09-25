import http from "@/http-common";
import { Mascota } from "@/entities/Mascota";

interface MascotaApiResponse {
  status: boolean;
  message: string;
  data: Mascota;
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
  
}

export default new MascotaService();
