import AutenticacionService from '../../services/Autenticacion/AutenticacionService.js';

class AutenticacionController {
    constructor() {
        this.autenticacionService = new AutenticacionService();
    }

    async perfiles_usuario(req, res){
        try {
            const { username } = req.query;
            if (!username) {
                return res.status(400).json({ error: 'El campo username es requerido' });
            }
    
            const perfiles = await this.autenticacionService.perfiles_usuario(username);
            if(!perfiles.ok) throw perfiles
            
            return res.status(perfiles?.statusCode).json({
                ok: perfiles?.ok,
                message: perfiles?.message,
                data: perfiles?.data
            })
        } catch (error) {
            return res.status(error?.statusCode || 500).json({
                ok: error?.ok || false,
                message: error?.message || "Error inesperado",
                error: error?.error
            });
        }
    }
    
    async login(req, res){
        try {
            const { username, password, id_perfil } = req.body;
            if (!username) throw new Error("El Usuario es requerido");
            if (!password) throw new Error("La clave es requerido")
            if (!id_perfil) throw new Error("Debe escoger el perfil")
            
            const token = await this.autenticacionService.login(username, password, id_perfil);
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
            const { username, email, password, perfil } = req.body;
            if (!username) throw new Error("El Usuario es requerido");
            if (!email) throw new Error("El email es requerido")
            if (!password) throw new Error("La clave es requerido")
            if (!perfil) throw new Error("Debe indicar el perfil")
            
            const newUser = await this.autenticacionService.register(username, email, password, perfil);
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