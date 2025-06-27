import Response from "../../utils/Response.js";
import { Servicio, Usuario, Atencion } from '../../models/index.js';
import { Sequelize, where } from 'sequelize';

class AtencionService {
    async getAtencionesByCita(filtros, pageNumber, pageSize){
        try {
            const whereClause = {
                id_cita: filtros.id_cita,
                estado: 'A'
            };

            const offset = (pageNumber - 1) * pageSize;

            const { count, rows } = await Atencion.findAndCountAll({
                where: whereClause,
                limit: pageSize,
                offset: offset,
                include: [
                    {
                        model: Servicio,
                        as: 'servicioCita',
                        attributes: [],
                        required: true
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('servicioCita.descripcion'), 'servicio']
                    ]
                }
            });
            
            const data = {
                atenciones: rows,
                total: count,
                page: pageNumber,
                pageSize: pageSize,
                totalPages: Math.ceil(count / pageSize)
            }

            return Response.success("Atenciones Obtenidos", data, 201);
        } catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Obtener Atenciones", error?.error || error?.message);
        }
    };
    
    async store(id_cita, id_servicio, precio){
        try {
            const newAtencion= await Atencion.create({
                id_cita,
                id_servicio,
                precio,
                estado: 'A'
            });
        
            await newAtencion.save();
        
            return Response.success("Atención Registrada", newAtencion, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Registrar", error?.error || error?.message);
        }
    };

    async delete(id_atencion){
        try {
            const atencion = await Atencion.findOne({ where: { id_atencion } });
            if (!atencion) {
                throw new Error('No se encontró la atención');
            }

            atencion.estado = 'E';
            await atencion.save();
        
            return Response.success("Atención Eliminada", atencion, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Eliminar", error?.error || error?.message);
        }
    };
}

export default AtencionService
