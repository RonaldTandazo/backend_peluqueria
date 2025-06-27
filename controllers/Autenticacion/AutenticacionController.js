import AutenticacionService from '../../services/Autenticacion/AutenticacionService.js';

class AutenticacionController {
    constructor() {
        this.autenticacionService = new AutenticacionService();
    }
    
    async login(req, res){
        try {
            const { email, password } = req.body;
            if (!email) throw new Error("El email es requerido");
            if (!password) throw new Error("La contraseña es requerido")
            
            const token = await this.autenticacionService.login(email.toLowerCase(), password);
            if(!token.ok) throw token

            return res.status(token?.statusCode).json({
                ok: token?.ok,
                message: token?.message,
                data: token?.data
            })
        } catch (error) {
            console.log(error);
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error en Login",
                error: error?.error
            });
        }
    };
    
    async register(req, res){
        try {
            const { username, nombre, apellido, email, password } = req.body;
            if (!username) throw new Error("El usuario es requerido");
            if (!nombre) throw new Error("El nombre es requerido");
            if (!apellido) throw new Error("El apellido es requerido");
            if (!email) throw new Error("El email es requerido")
            if (!password) throw new Error("La contraseña es requerido")
            
            const newUser = await this.autenticacionService.register(username.toUpperCase(), nombre.toUpperCase(), apellido.toUpperCase(), email.toLowerCase(), password);
            if(!newUser.ok) throw newUser

            return res.status(newUser?.statusCode).json({
                ok: newUser?.ok,
                message: newUser?.message,
                data: newUser?.data
            })
        } catch (error) {
            console.log(error);
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Registrar",
                error: error?.error
            });
        }
    };
    
    async verifyEmail(req, res){
        try {
            const { email } = req.body;
            if (!email) throw new Error("El email es requerido");

            const verify = await this.autenticacionService.verifyEmail(email.toLowerCase());
            if(!verify.ok) throw verify

            return res.status(verify?.statusCode).json({
                ok: verify?.ok,
                message: verify?.message,
                data: verify?.data
            })
        } catch (error) {
            console.log(error);
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al Verificar Email",
                error: error?.error
            });
        }
    };

    async loginClientes(req, res){
        try {
            const { identificacion } = req.body;
            if (!identificacion) throw new Error("La cedula es requerida");
            
            const token = await this.autenticacionService.loginClientes(identificacion);
            if(!token.ok) throw token

            return res.status(token?.statusCode).json({
                ok: token?.ok,
                message: token?.message,
                data: token?.data
            })
        } catch (error) {
            console.log(error);
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error al validar",
                error: error?.error
            });
        }
    };
}

export default AutenticacionController