import { Router } from 'express';
import ServicioController from '../../controllers/Servicio/ServicioController.js';

const ServicioApis = Router();
const servicioController = new ServicioController();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

ServicioApis.get('/all', asyncHandler(servicioController.getServicios.bind(servicioController)));

export default ServicioApis;
