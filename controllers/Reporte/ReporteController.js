import AtencionService from "../../services/Atencion/AtencionService.js";
import CitaService from "../../services/Cita/CitaService.js";
import ClienteService from "../../services/Cliente/ClienteService.js";

class ReporteController {
    constructor() {
        this.citaService = new CitaService();
        this.clienteService = new ClienteService();
        this.atencionService = new AtencionService();
    }
    
    async getDataReporte(req, res){
        try {
            const { reporte } = req.query;
            const page = 1;
            const size = 10000;
            let data = {
                ok: true,
                statusCode: 201,
                data: {},
                message: 'Información Obtenida',
                columns: []
            };

            if(reporte == 'Clientes por Cita'){
                const citas = await this.citaService.getCitas(page, size);
                if(!citas.ok) throw citas
                
                const columns = [
                    {title: "#", key: "index", align: 'center', sortable: false, width:"100px"},
                    {title: "Cliente", key: "cliente", align: 'center', sortable: false, width:"400px"},
                    {title: "Fecha Cita", key: 'fecha', align: 'center', sortable: false, width:"150px"},
                    {title: "Hora Cita", key: 'hora', align: 'center', sortable: false, width:"150px"},
                    {title: "Estado Cita", key: "estado", align: 'center', sortable: false, width:"200px"},
                ]

                data = citas;
                data.data.columns = columns;            
                data.data.info = data.data.citas;
                
            }else if(reporte == 'Clientes, Citas y Servicios' || reporte == 'Valores por citas de clientes'){
                const clientesResult = await this.clienteService.getClientes(null, page, size);
                if (!clientesResult.ok) throw clientesResult;

                const dataClientes = clientesResult.data.clientes;
                const structuredReport = [];

                for (const cliente of dataClientes) {
                    const clienteReporte = {
                        id_cliente: cliente.id_cliente,
                        cliente: cliente.nombre + ' ' + cliente.apellido,
                        identificacion: cliente.identificacion,
                        telefono: cliente.telefono,
                        email: cliente.email,
                        direccion: cliente.direccion,
                        citas: []
                    };

                    const citasResult = await this.citaService.getCitasByCliente(cliente.id_cliente);
                    if (!citasResult.ok) throw citasResult;

                    const citasCompletadas = citasResult.data.filter((cita) => cita.estado === 'Completada' || cita.estado === 'En Proceso');

                    if (citasCompletadas.length > 0) {
                        for (const cita of citasCompletadas) {
                            const citaReporte = {
                                id_cita: cita.id_cita,
                                fecha: cita.fecha,
                                hora: cita.hora,
                                costo: cita.costo,
                                estado: cita.estado,
                                atenciones: []
                            };

                            const atencionesResult = await this.atencionService.getAtencionesByCita({id_cita: cita.id_cita}, page, size);
                            if (!atencionesResult.ok) throw atencionesResult;

                            if (atencionesResult.data.atenciones && atencionesResult.data.atenciones.length > 0) {
                                atencionesResult.data.atenciones.forEach((atencion, index) => {
                                    citaReporte.atenciones.push({
                                        index: index + 1,
                                        id_servicio: atencion.id_servicio || 'N/A',
                                        servicio: atencion.dataValues?.servicio || 'N/A',
                                        precio: '$'+parseFloat(atencion.precio || 0)
                                    });
                                });
                            }

                            if (citaReporte.atenciones.length > 0) {
                                clienteReporte.citas.push(citaReporte);
                            }
                        }
                    }

                    if (clienteReporte.citas.length > 0) {
                        structuredReport.push(clienteReporte);
                    }
                }

                if(structuredReport.length <= 0){
                    throw {ok: false, statusCode: 500, message: 'No hay información disponible', error: 'No hay información disponible'}
                }

                const columns = [
                    {title: "#", key: "index", align: 'center', sortable: false, width:"100px"},
                    {title: "Cliente", key: "cliente", align: 'center', sortable: false, width:"400px"},
                    {title: "Identificacion", key: "identificacion", align: 'center', sortable: false, width:"400px"},
                    {title: "Teléfono", key: "telefono", align: 'center', sortable: false, width:"400px"},
                    {title: "Email", key: "email", align: 'center', sortable: false, width:"400px"},
                    {title: "Dirección", key: "direccion", align: 'center', sortable: false, width:"400px"}
                ];

                const nestedColumns = [
                    {title: "#", key: "index", align: 'center', sortable: false, width:"100px"},
                    {title: "Servicio", key: "servicio", align: 'center', sortable: false, width:"400px"},
                    {title: "Precio", key: "precio", align: 'center', sortable: false, width:"400px"}
                ]
                
                data.data.columns = columns
                data.data.nestedColumns = nestedColumns
                data.data.info = structuredReport;
            }else if(reporte == 'Servicios por Cita'){
                const citasResult = await this.citaService.getCitas(page, size);
                if (!citasResult.ok) throw citasResult;

                const citasCompletadas = citasResult.data.citas.filter((cita) => cita.estado === 'Completada' || cita.estado === 'En Proceso');
                const structuredReport = [];

                if (citasCompletadas.length > 0) {
                    for (const cita of citasCompletadas) {
                        const citaReporte = {
                            id_cita: cita.id_cita,
                            fecha: cita.fecha,
                            hora: cita.hora,
                            costo: '$'+parseFloat(cita.costo),
                            estado: cita.estado,
                            atenciones: []
                        };

                        const atencionesResult = await this.atencionService.getAtencionesByCita({id_cita: cita.id_cita}, page, size);
                        if (!atencionesResult.ok) throw atencionesResult;

                        if (atencionesResult.data.atenciones && atencionesResult.data.atenciones.length > 0) {
                            atencionesResult.data.atenciones.forEach((atencion, index) => {
                                citaReporte.atenciones.push({
                                    index: index + 1,
                                    id_servicio: atencion.id_servicio || 'N/A',
                                    servicio: atencion.dataValues?.servicio || 'N/A',
                                    precio: '$'+parseFloat(atencion.precio || 0)
                                });
                            });
                        }

                        if (citaReporte.atenciones.length > 0) {
                            structuredReport.push(citaReporte);
                        }
                    }
                }

                if(structuredReport.length <= 0){
                    throw {ok: false, statusCode: 500, message: 'No hay información disponible', error: 'No hay información disponible'}
                }

                const columns = [
                    {title: "#", key: "index", align: 'center', sortable: false, width:"100px"},
                    {title: "Fecha Cita", key: "fecha", align: 'center', sortable: false, width:"400px"},
                    {title: "Hora Cita", key: "hora", align: 'center', sortable: false, width:"400px"},
                    {title: "Estado", key: "estado", align: 'center', sortable: false, width:"400px"},
                    {title: "Costo Total Cita", key: "costo", align: 'center', sortable: false, width:"400px"}
                ];

                const nestedColumns = [
                    {title: "#", key: "index", align: 'center', sortable: false, width:"100px"},
                    {title: "Servicio", key: "servicio", align: 'center', sortable: false, width:"400px"},
                    {title: "Precio", key: "precio", align: 'center', sortable: false, width:"400px"}
                ]
                
                data.data.columns = columns
                data.data.nestedColumns = nestedColumns
                data.data.info = structuredReport;
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