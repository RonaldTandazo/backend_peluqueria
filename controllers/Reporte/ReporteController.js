import CitaService from "../../services/Cita/CitaService.js";

class ReporteController {
    constructor() {
        this.citaService = new CitaService();
    }
    
    async getDataReporte(req, res){
        try {
            const { page, size, reporte } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = parseInt(size, 10) || 10;
            let data = {};

            if(reporte == 'Clientes por Cita'){
                const citas = await this.citaService.getCitas(pageNumber, pageSize);
                if(!citas.ok) throw citas
                
                const columns = [
                    {title: "#", key: "index", align: 'center', sortable: false, width:"100px"},
                    {title: "Cliente", key: "cliente", align: 'center', sortable: false, width:"400px"},
                    {title: "Fecha", key: 'fecha', align: 'center', sortable: false, width:"150px"},
                    {title: "Hora", key: 'hora', align: 'center', sortable: false, width:"150px"},
                    {title: "Estado", key: "estado", align: 'center', sortable: false, width:"200px"},
                ]

                data = citas;
                data.data.columns = columns;            
                data.data.data = data.data.citas;          
            }else{
                throw {ok: false, statusCode: 500, message: 'Error al obtener la información solicitada', error: 'Error al obtener la información solicitada'}
            }

            return res.status(data?.statusCode).json({
                ok: data?.ok,
                message: data?.message,
                data: data?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Obtener el Reporte",
                error: error?.error
            });
        }
    };
}

export default ReporteController