import http from "@/http-common";
import { Vacuna } from "@/entities/Vacuna";

// Tipado de la respuesta de la API
interface VacunasApiResponse {
    status: boolean;
    message: string;
    data: Vacuna[];
}

class ControlService {

    /**
     * Obtener todas las vacunas de una mascota por su código
     * @param codigo Código de la mascota
     * @returns Lista de vacunas tipadas
     */
    async getVacunasByCodigo(codigo: string): Promise<Vacuna[]> {
        try {
            const res = await http.get<VacunasApiResponse>(`/mascota/codigo/${codigo}/vacunas`);
            console.log("Vacunas obtenidas del API:", res.data);

            return res.data.data;
        } catch (error) {
            console.error(`Error al obtener las vacunas de la mascota con código ${codigo}:`, error);
            throw error;
        }
    }

}

export default new ControlService();
