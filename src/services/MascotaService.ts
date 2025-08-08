// src/services/MascotaService.ts
import http from "@/http-common";  // Importa la configuración de axios
import { Mascota } from "@/entities/Mascota";

class MascotaService {

  // Método para obtener la mascota por código
  async getByCodigo(codigo: string): Promise<Mascota | null> {
    try {
      // Usamos la ruta relativa '/mascotas/verificar/codigo'
      const res = await http.get(`/mascotas/codigo/${codigo}`);
       console.log("Realizando solicitud GET a:", res);  
      const data = res.data;

      // Comprobamos si la respuesta contiene la mascota
      if (data && data.exito && data.mascota) {
        console.log("Mascota obtenida:", data.mascota);
        return data.mascota as Mascota;
      }

      return null;
    } catch (error) {
      console.error(`Error al buscar la mascota con código ${codigo}:`, error);
      throw error;
    }
  }
}

export default new MascotaService();
