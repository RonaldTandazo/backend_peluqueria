import { Router } from 'express';
import AutenticacionController from '../../controllers/Autenticacion/AutenticacionController.js';

const AutenticacionApis = Router();
const autenticacionController = new AutenticacionController();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

AutenticacionApis.post('/login', asyncHandler(autenticacionController.login.bind(autenticacionController)));
AutenticacionApis.post('/register', asyncHandler(autenticacionController.register.bind(autenticacionController)));
AutenticacionApis.post('/verifyEmail', asyncHandler(autenticacionController.verifyEmail.bind(autenticacionController)));
AutenticacionApis.post('/login_clientes', asyncHandler(autenticacionController.loginClientes.bind(autenticacionController)));

export default AutenticacionApis;
