import { Router } from 'express';
import CitaController from '../../controllers/Cita/CitaController.js';

const CitaApis = Router();
const citaController = new CitaController();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

CitaApis.get('/all', asyncHandler(citaController.getCitas.bind(citaController)));
CitaApis.post('/store', asyncHandler(citaController.store.bind(citaController)));
CitaApis.put('/update/:id_cita', asyncHandler(citaController.update.bind(citaController)));
CitaApis.delete('/delete/:id_cita', asyncHandler(citaController.delete.bind(citaController)));

export default CitaApis;
