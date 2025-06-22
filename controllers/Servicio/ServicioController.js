import ServicioService from "../../services/Servicio/ServicioService.js";

class ServicioController {
    constructor() {
        this.servicioService = new ServicioService();
    }
    
    async getServicios(req, res){
        try {
            const servicios = await this.servicioService.getServicios();
            if(!servicios.ok) throw servicios

            return res.status(servicios?.statusCode).json({
                ok: servicios?.ok,
                message: servicios?.message,
                data: servicios?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Obtener Servicios",
                error: error?.error
            });
        }
    };
}

export default ServicioController