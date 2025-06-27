import CitaService from "../../services/Cita/CitaService.js";

class CitaController {
    constructor() {
        this.citaService = new CitaService();
    }
    
    async getCitas(req, res){
        try {
            const { page, size } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = parseInt(size, 10) || 10;
            
            const citas = await this.citaService.getCitas(pageNumber, pageSize);
            if(!citas.ok) throw citas

            return res.status(citas?.statusCode).json({
                ok: citas?.ok,
                message: citas?.message,
                data: citas?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Obtener Citas",
                error: error?.error
            });
        }
    };
    
    async store(req, res){
        try {
            const { data_cita } = req.body;
            const { id_cliente, fecha, hora } = data_cita;
            if (!id_cliente) throw new Error("El cliente es requerido");
            if (!fecha) throw new Error("La fecha de la cita es requerida")
            if (!hora) throw new Error("El hora de la cita es requerida")
            
            const newCita = await this.citaService.store(id_cliente, fecha, hora);
            if(!newCita.ok) throw newCita

            return res.status(newCita?.statusCode).json({
                ok: newCita?.ok,
                message: newCita?.message,
                data: newCita?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Guardar Cita",
                error: error?.error
            });
        }
    };

    async update(req, res){
        try {
            const { id_cita: id_cita } = req.params
            const { id_cliente, fecha, hora, estado } = req.body;
            if (!id_cliente) throw new Error("El cliente es requerido");
            if (!fecha) throw new Error("La fecha de la cita es requerida")
            if (!hora) throw new Error("El hora de la cita es requerida")
            if (!estado) throw new Error("El estado de la cita es requerido")
            
            const updateCita = await this.citaService.update(id_cita, id_cliente, fecha, hora, estado);
            if(!updateCita.ok) throw updateCita

            return res.status(updateCita?.statusCode).json({
                ok: updateCita?.ok,
                message: updateCita?.message,
                data: updateCita?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Actualizar Cita",
                error: error?.error
            });
        }
    };

    async delete(req, res){
        try {
            const { id_cita: id_cita } = req.params            
            
            const remove = await this.citaService.delete(id_cita);
            if(!remove.ok) throw remove

            return res.status(remove?.statusCode).json({
                ok: remove?.ok,
                message: remove?.message,
                data: remove?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Eliminar Cita",
                error: error?.error
            });
        }
    };

    async getCitasByCliente(req, res){
        try {

            const {  id_cliente: id_cliente } = req.params;
        
            const citas = await this.citaService.getCitasByCliente(id_cliente);
            if(!citas.ok) throw citas

            return res.status(citas?.statusCode).json({
                ok: citas?.ok,
                message: citas?.message,
                data: citas?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Obtener Citas",
                error: error?.error
            });
        }
    };
}

export default CitaController