import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
let io;
export function setupSocket(server) {
    io = new Server(server, {
        cors: { origin: '*' }
    });

    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);
        const token = socket.handshake.auth?.token;
        if (!token) {
            console.log(`Socket ${socket.id} sin token. Conexión rechazada.`);
            socket.disconnect(true);
            return;
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            const userId = decoded.id_usuario.toString();
             socket.join(userId);

        } catch (error) {
            console.log(`Token inválido para socket ${socket.id}:`, error.message);
            socket.disconnect(true);
            return;
        }

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
}
export function getIO() {
    if (!io) throw new Error("Socket.IO no está inicializado");
    return io;
}