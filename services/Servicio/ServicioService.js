import Response from "../../utils/Response.js";
import { Servicio } from '../../models/index.js';

class ServicioService {
    async getServicios(){
        try {
            const servicios = await Servicio.findAll({ where: { estado: 'A' }});

            return Response.success("Servicios Obtenidos", servicios, 201);
        } catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al obtener servicios", error?.error || error?.message);
        }
    };
}

export default ServicioService
