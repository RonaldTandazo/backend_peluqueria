import express, {json} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';
import { setupSocket } from './socket.js';
import AutenticacionApis from './routes/Autenticacion/AutenticacionApis.js';
dotenv.config();

const createApp = () => {
    const app = express();
    app.use(json());
    app.use(helmet());
    app.use(compression());
    app.disable('x-powered-by');

    app.get('/', (req, res) => res.send('¡Backend activo!'));
    app.use('/api/auth', AutenticacionApis);

    return app;
};

try {
    const app = createApp();

    const server = http.createServer(app);
    setupSocket(server);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
}