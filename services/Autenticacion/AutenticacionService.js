import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Response from "../../utils/Response.js";
import Usuario from "../../models/Usuario/Usuario.js"

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
            return Response.error(error?.message || "Error en el login", error?.error || error?.message);
        }
    };
    
    async register(username, email, password){
        try {
            const user = await Usuario.findOne({ where: { email, estado: 'A' } });
            if (user) {
                throw new Error('El usuario ya está registrado');
            }

            const newUser = await Usuario.create({
                username,
                email,
                password,
                estado: 'A'
            });
        
            await newUser.save();
        
            return Response.success("Registro Exitoso", newUser, 201);
        }catch (error) {
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
            return Response.error(error?.message || "Error al verificar Email", error?.error || error?.message);
        }
    };
}

export default AutenticacionService
