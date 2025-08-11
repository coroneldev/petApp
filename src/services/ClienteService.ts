// src/services/ClienteService.ts
import http from "@/http-common";  // Importa la configuración de axios
import { Cliente } from "@/entities/Cliente";

class ClienteService {

  // Método para obtener el cliente por código id
  async getByCodigo(id: number): Promise<Cliente | null> {
    try {
      const res = await http.get(`/clientes/${id}`);
       console.log("Realizando solicitud GET de clientes:", res);  
        return res.data
    } catch (error) {
      console.error(`Error al buscar la cliente con código ${id}:`, error);
      throw error;
    }
  }
}

export default new ClienteService();
