import ClienteService from "../../services/Cliente/ClienteService.js";

class ClienteController {
    constructor() {
        this.clienteService = new ClienteService();
    }
    
    async getClientes(req, res){
        try {
            const { page, size, ...filtros } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = parseInt(size, 10) || 10;
            
            const clientes = await this.clienteService.getClientes(filtros, pageNumber, pageSize);
            if(!clientes.ok) throw clientes

            return res.status(clientes?.statusCode).json({
                ok: clientes?.ok,
                message: clientes?.message,
                data: clientes?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al obtener clientes",
                error: error?.error
            });
        }
    };
    
    async store(req, res){
        try {
            const { data_cliente } = req.body;
            const { nombre, apellido, identificacion, telefono, direccion, email } = data_cliente;
            if (!nombre) throw new Error("El nombre del cliente es requerido");
            if (!apellido) throw new Error("El apellido del cliente es requerido")
            if (!identificacion) throw new Error("La CI del cliente es requerida")
            if (!telefono) throw new Error("El telefono del cliente es requerido")
            if (!direccion) throw new Error("La dirección del cleinte es requerida")
            if (!email) throw new Error("El email del cliente es requerido")
            
            const newCliente = await this.clienteService.store(nombre, apellido, identificacion, telefono, direccion, email);
            if(!newCliente.ok) throw newCliente

            return res.status(newCliente?.statusCode).json({
                ok: newCliente?.ok,
                message: newCliente?.message,
                data: newCliente?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Guardar Cliente",
                error: error?.error
            });
        }
    };

    async update(req, res){
        try {
            const { id_cliente: id_cliente } = req.params
            const { nombre, apellido, identificacion, telefono, direccion, email } = req.body;            

            if (!nombre) throw new Error("El nombre del cliente es requerido");
            if (!apellido) throw new Error("El apellido del cliente es requerido")
            if (!identificacion) throw new Error("La CI del cliente es requerida")
            if (!telefono) throw new Error("El telefono del cliente es requerido")
            if (!direccion) throw new Error("La dirección del cleinte es requerida")
            if (!email) throw new Error("El email del cliente es requerido")
            
            const updateCliente = await this.clienteService.update(id_cliente, nombre, apellido, identificacion, telefono, direccion, email);
            if(!updateCliente.ok) throw updateCliente

            return res.status(updateCliente?.statusCode).json({
                ok: updateCliente?.ok,
                message: updateCliente?.message,
                data: updateCliente?.data
            })
        } catch (error) {
            console.log(error)
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Actualizar Cliente",
                error: error?.error
            });
        }
    };

    async delete(req, res){
        try {
            const { id_cliente: id_cliente } = req.params            
            
            const remove = await this.clienteService.delete(id_cliente);
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
                message: error?.message || "Error al Eliminar Cliente",
                error: error?.error
            });
        }
    };
}

export default ClienteController