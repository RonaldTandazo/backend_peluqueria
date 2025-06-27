import express, {json} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';
import { setupSocket } from './socket.js';
import cors from 'cors';
import AutenticacionApis from './routes/Autenticacion/AutenticacionApis.js';
import ClienteApis from './routes/Cliente/ClienteApis.js';
import CitaApis from './routes/Cita/CitaApis.js';
import ServicioApis from './routes/Servicio/ServicioApis.js';
import AtencionesApis from './routes/Atencion/AtencionApis.js';
import ReporteApis from './routes/Reporte/ReporteApis.js';

dotenv.config();

const createApp = () => {
    const app = express();
    app.use(json());
    app.use(helmet());
    app.use(compression());
    app.disable('x-powered-by');

    app.use(cors({
        origin: 'http://192.168.100.61:3000', //Colocar IP y puerto donde está levantado el frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.get('/', (req, res) => res.send('¡Backend activo!'));
    app.use('/api/auth', AutenticacionApis);
    app.use('/api/clientes', ClienteApis);
    app.use('/api/citas', CitaApis);
    app.use('/api/servicios', ServicioApis);
    app.use('/api/atenciones', AtencionesApis);
    app.use('/api/reportes', ReporteApis);

    return app;
};

try {
    const app = createApp();

    const server = http.createServer(app);
    setupSocket(server);

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
}