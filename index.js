import express, {json} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';
import { setupSocket } from './socket.js';
import cors from 'cors';
import AutenticacionApis from './routes/Autenticacion/AutenticacionApis.js';
import ClienteApis from './routes/Cliente/ClienteApis.js';
dotenv.config();

const createApp = () => {
    const app = express();
    app.use(json());
    app.use(helmet());
    app.use(compression());
    app.disable('x-powered-by');

    app.use(cors({
        origin: 'http://192.168.100.61:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.get('/', (req, res) => res.send('¡Backend activo!'));
    app.use('/api/auth', AutenticacionApis);
    app.use('/api/clientes', ClienteApis);

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