import { Router } from 'express';
import ClienteController from '../../controllers/Cliente/ClienteController.js';

const ClienteApis = Router();
const clienteController = new ClienteController();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

ClienteApis.get('/all', asyncHandler(clienteController.getClientes.bind(clienteController)));
ClienteApis.post('/store', asyncHandler(clienteController.store.bind(clienteController)));
ClienteApis.put('/update/:id_cliente', asyncHandler(clienteController.update.bind(clienteController)));

export default ClienteApis;
