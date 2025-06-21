import AutenticacionService from '../../services/Autenticacion/AutenticacionService.js';

class AutenticacionController {
    constructor() {
        this.autenticacionService = new AutenticacionService();
    }
    
    async login(req, res){
        try {
            const { username, password } = req.body;

            if (!username) throw new Error("El Usuario es requerido");
            if (!password) throw new Error("La clave es requerido")
            
            const token = await this.autenticacionService.login(username, password);
            if(!token.ok) throw token

            return res.status(token?.statusCode).json({
                ok: token?.ok,
                message: token?.message,
                data: token?.data
            })
        } catch (error) {
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error en Login",
                error: error?.error
            });
        }
    };
    
    async register(req, res){
        try {
            const { username, email, password } = req.body;
            if (!username) throw new Error("El Usuario es requerido");
            if (!email) throw new Error("El email es requerido")
            if (!password) throw new Error("La clave es requerido")
            
            const newUser = await this.autenticacionService.register(username, email, password);
            if(!newUser.ok) throw newUser

            return res.status(newUser?.statusCode).json({
                ok: newUser?.ok,
                message: newUser?.message,
                data: newUser?.data
            })
        } catch (error) {
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Registrar",
                error: error?.error
            });
        }
    };
}

export default AutenticacionController