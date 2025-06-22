import { Router } from 'express';
import AtencionesController from '../../controllers/Atencion/AtencionController.js';

const AtencionesApis = Router();
const atencionesController = new AtencionesController();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

AtencionesApis.get('/all', asyncHandler(atencionesController.getAtencionesByCita.bind(atencionesController)));
AtencionesApis.post('/store', asyncHandler(atencionesController.store.bind(atencionesController)));
AtencionesApis.delete('/delete/:id_atencion', asyncHandler(atencionesController.delete.bind(atencionesController)));

export default AtencionesApis;
