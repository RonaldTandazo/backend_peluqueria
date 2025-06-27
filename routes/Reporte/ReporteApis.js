import { Router } from 'express';
import ReporteController from '../../controllers/Reporte/ReporteController.js';

const ReporteApis = Router();
const reporteController = new ReporteController();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

ReporteApis.get('/all', asyncHandler(reporteController.getDataReporte.bind(reporteController)));

export default ReporteApis;
