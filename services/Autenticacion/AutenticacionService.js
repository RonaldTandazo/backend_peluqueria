import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Response from "../../utils/Response.js";

class AutenticacionService {
    async perfiles_usuario(username){
        try{
            const perfiles = []
        
            return Response.success("Perfiles Obtenidos", perfiles, 200)
        }catch(error){
            return Response.internalServerError(error?.message || "Error al obtener los perfiles", error?.error || error?.message);
        }
    }
    
    async login(username, password, perfil_id){
        try {
            const token = '';

            return Response.success("Login Exitoso", token, 201);
        } catch (error) {
            return Response.error(error?.message || "Error en el login", error?.error || error?.message);
        }
    };
    
    async register(username, email, password, perfiles){
        try {
            const newUser = {};
        
            return Response.success("Registro Exitoso", newUser, 201);
        }catch (error) {
            return Response.error(error?.message || "Error al Registrar", error?.error || error?.message);
        }
    };
}

export default AutenticacionService
