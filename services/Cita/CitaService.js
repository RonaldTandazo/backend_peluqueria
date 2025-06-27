import Response from "../../utils/Response.js";
import { Cita, Cliente, Usuario } from '../../models/index.js';
import { Sequelize } from 'sequelize';

class CitaService {
    async getCitas(pageNumber, pageSize){
        try {
            const offset = (pageNumber - 1) * pageSize;

            const { count, rows } = await Cita.findAndCountAll({
                limit: pageSize,
                offset: offset,
                include: [
                    {
                        model: Cliente,
                        as: 'clienteCita',
                        attributes: [],
                        required: true
                    }
                ],
                attributes: {
                    include: [
                        [
                            Sequelize.fn('CONCAT', Sequelize.col('clienteCita.nombre'), ' ', Sequelize.col('clienteCita.apellido')),
                            'cliente'
                        ]
                    ]
                },
                order: [
                    ['fecha', 'ASC'],
                    ['hora', 'ASC']
                ],
            });
            
            const data = {
                citas: rows,
                total: count,
                page: pageNumber,
                pageSize: pageSize,
                totalPages: Math.ceil(count / pageSize)
            }

            return Response.success("Citas Obtenidos", data, 201);
        } catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al obtener citas", error?.error || error?.message);
        }
    };
    
    async store(id_cliente, fecha, hora){
        try {
            const cita = await Cita.findOne({ where: { id_cliente, fecha, hora, estado: 'Agendada' } });
            if (cita) {
                throw new Error('Ya hay una cita registrada para este cliente en esta fecha y hora');
            }

            const newCita = await Cita.create({
                id_cliente,
                fecha,
                hora,
                estado: 'Agendada'
            });
        
            await newCita.save();
        
            return Response.success("Cita Registrada", newCita, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Registrar", error?.error || error?.message);
        }
    };

    async update(id_cita, id_cliente, fecha, hora, estado){
        try {
            const cita = await Cita.findOne({ where: { id_cita } });
            if (!cita) {
                throw new Error('No se encontró la cita');
            }

            cita.id_cliente = id_cliente;
            cita.fecha = fecha;
            cita.hora = hora;
            cita.estado = estado;
            await cita.save();
        
            return Response.success("Información Actualizada", null, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Actualizar", error?.error || error?.message);
        }
    };

    async updateCostoCita(id_cita, precio, tipo){
        try {
            const cita = await Cita.findOne({ where: { id_cita } });
            if (!cita) {
                throw new Error('No se encontró la cita');
            }

            if(tipo == 'suma'){
                cita.costo = cita.costo ? parseFloat(cita.costo) + precio:precio;
            }else if(tipo == 'resta'){
                cita.costo = cita.costo - precio;
            }

            await cita.save();
        
            return Response.success("Información Actualizada", null, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Actualizar", error?.error || error?.message);
        }
    };

    async delete(id_cita){
        try {
            const cita = await Cita.findOne({ where: { id_cita } });
            if (!cita) {
                throw new Error('No se encontró la cita');
            }

            cita.estado = 'Cancelada';
            await cita.save();
        
            return Response.success("Cita Eliminada", null, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Eliminar", error?.error || error?.message);
        }
    };

    async getCitasByCliente(id_cliente){
        try {
            const citas = await Cita.findAll({ where: { id_cliente } });

            return Response.success("Citas Obtenidos", citas, 201);
        } catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al obtener citas", error?.error || error?.message);
        }
    };
}

export default CitaService
