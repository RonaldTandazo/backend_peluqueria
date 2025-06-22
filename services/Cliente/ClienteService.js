import Response from "../../utils/Response.js";
import Cliente from "../../models/Cliente/Cliente.js"
import { Op } from "sequelize";

class ClienteService {
    async getClientes(filtros, pageNumber, pageSize){
        try {
            const whereClause = {};

            if (filtros && filtros.identificacion && filtros.identificacion != 'null') {
                whereClause.identificacion = filtros.identificacion;
            }

            if (filtros && filtros.cliente && filtros.cliente != 'null') {
                const searchTerms = filtros.cliente.trim();

                whereClause[Op  .or] = [
                    { nombre: { [Op.like]: `%${searchTerms}%` } },
                    { apellido: { [Op.like]: `%${searchTerms}%` } }
                ];
            }

            whereClause.estado = 'A';

            const offset = (pageNumber - 1) * pageSize;

            const { count, rows } = await Cliente.findAndCountAll({
                where: whereClause,
                limit: pageSize,
                offset: offset
            });
            
            const data = {
                clientes: rows,
                total: count,
                page: pageNumber,
                pageSize: pageSize,
                totalPages: Math.ceil(count / pageSize)
            }

            return Response.success("Clientes Obtenidos", data, 201);
        } catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error en el login", error?.error || error?.message);
        }
    };
    
    async store(nombre, apellido, identificacion, telefono, direccion, email){
        try {
            const cliente = await Cliente.findOne({ where: { identificacion, estado: 'A' } });
            if (cliente) {
                throw new Error('El cliente ya está registrado');
            }

            const newCliente = await Cliente.create({
                nombre,
                apellido,
                identificacion,
                telefono,
                direccion,
                email,
                estado: 'A'
            });
        
            await newCliente.save();
        
            return Response.success("Cliente Registrado", newCliente, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Registrar", error?.error || error?.message);
        }
    };

    async update(id_cliente, nombre, apellido, identificacion, telefono, direccion, email){
        try {
            const cliente = await Cliente.findOne({ where: { id_cliente } });
            if (!cliente) {
                throw new Error('El cliente no está registrado');
            }

            cliente.nombre = nombre;
            cliente.apellido = apellido;
            cliente.identificacion = identificacion;
            cliente.telefono = telefono;
            cliente.direccion = direccion;
            cliente.email = email;
            await cliente.save();
        
            return Response.success("Información Actualizada", cliente, 201);
        }catch (error) {
            console.log(error)
            return Response.error(error?.message || "Error al Actualizar", error?.error || error?.message);
        }
    };
}

export default ClienteService
