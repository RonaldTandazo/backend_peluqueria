import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Response from "../../utils/Response.js";
import { Cliente, Usuario } from '../../models/index.js';

class AutenticacionService {
    async login(email, password){
        try {
            const user = await Usuario.findOne({ where: { email, estado: 'A' } });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }

            const token = jwt.sign(
                { id_usuario: user.id_usuario, email: user.email, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '3h' }
            );

            return Response.success("Login Exitoso", token, 201);
        } catch (error) {
            console.log(error);
            return Response.error(error?.message || "Error en el login", error?.error || error?.message);
        }
    };
    
    async register(username, nombre, apellido, email, password){
        try {
            const user = await Usuario.findOne({ where: { email, estado: 'A' } });
            if (user) {
                throw new Error('El usuario ya está registrado');
            }

            const newUser = await Usuario.create({
                username,
                nombre,
                apellido,
                email,
                password,
                estado: 'A'
            });
        
            await newUser.save();
        
            return Response.success("Registro Exitoso", newUser, 201);
        }catch (error) {
            console.log(error);
            return Response.error(error?.message || "Error al Registrar", error?.error || error?.message);
        }
    };

    async verifyEmail(email){
        try {
            const user = await Usuario.findOne({ where: { email, estado: 'A' } });
            if (user) {
                throw new Error('Email ya registrado');
            }

            return Response.success("Email no registrado", user, 201);
        } catch (error) {
            console.log(error);
            return Response.error(error?.message || "Error al verificar Email", error?.error || error?.message);
        }
    };

    async loginClientes(identificacion){
        try {
            const cliente = await Cliente.findOne({ where: { identificacion, estado: 'A' } });
            if (!cliente) {
                throw new Error('Cliente no encontrado. Debe ser registrado primero desde el portal web.');
            }
        
            const token = jwt.sign(
                { id_cliente: cliente.id_cliente, nombre: cliente.nombre, apellido: cliente.apellido, identificacion: identificacion },
                process.env.JWT_SECRET,
                { expiresIn: '3h' }
            );

            return Response.success("Cliente Encontrado. Redirigiendo...", token, 201);
        } catch (error) {
            console.log(error);
            return Response.error(error?.message || "Error al validar", error?.error || error?.message);
        }
    };
}

export default AutenticacionService
