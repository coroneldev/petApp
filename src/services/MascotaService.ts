// src/services/MascotaService.ts
import http from "@/http-common";  // Importa la configuración de axios
import { Mascota } from "@/entities/Mascota";

class MascotaService {

  // Método para obtener la mascota por código
  async getByCodigo(codigo: string): Promise<Mascota | null> {
    try {
      const res = await http.get(`/mascotas/codigo/${codigo}`);
       console.log("Realizando solicitud GET a:", res);  
        return res.data
    } catch (error) {
      console.error(`Error al buscar la mascota con código ${codigo}:`, error);
      throw error;
    }
  }
}

export default new MascotaService();
