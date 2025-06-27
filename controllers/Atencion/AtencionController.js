import AtencionServices from "../../services/Atencion/AtencionService.js";

class AtencionController {
    constructor() {
        this.atencionService = new AtencionServices();
    }
    
    async getAtencionesByCita(req, res){
        try {          
            const { page, size, ...filtros } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = parseInt(size, 10) || 10;
            
            const atenciones = await this.atencionService.getAtencionesByCita(filtros, pageNumber, pageSize);
            if(!atenciones.ok) throw atenciones

            return res.status(atenciones?.statusCode).json({
                ok: atenciones?.ok,
                message: atenciones?.message,
                data: atenciones?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Obtener Atenciones",
                error: error?.error
            });
        }
    };
    
    async store(req, res){
        try {
            const { data_atencion } = req.body;
            const { id_cita, id_servicio, precio } = data_atencion;

            if (!id_cita) throw new Error("Debe indicar la cita");
            if (!id_servicio) throw new Error("La servicio es requerido")
            if (!precio) throw new Error("El precio del servicio requerida")
            
            const newAtencion = await this.atencionService.store(id_cita, id_servicio, precio);
            if(!newAtencion.ok) throw newAtencion

            return res.status(newAtencion?.statusCode).json({
                ok: newAtencion?.ok,
                message: newAtencion?.message,
                data: newAtencion?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Guardar Atención",
                error: error?.error
            });
        }
    };

    async delete(req, res){
        try {
            const { id_atencion: id_atencion } = req.params            
            
            const remove = await this.atencionService.delete(id_atencion);
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
                message: error?.message || "Error al Eliminar Atención",
                error: error?.error
            });
        }
    };
}

export default AtencionController