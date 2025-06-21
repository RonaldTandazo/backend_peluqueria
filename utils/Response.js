class Response {
    static send(ok, message, dataOrError = null, statusCode = 200) {
        return {
            ok,
            message,
            ...(ok ? { data: dataOrError } : { error: dataOrError }),
            statusCode,
        };
    }

    static success(message = 'Operación exitosa', data = null, statusCode = 200) {
        return Response.send(true, message, data, statusCode);
    }
    
    static error(message = 'Error en la operación', error = null, statusCode = 400) {
        const errorMessage = error instanceof Error ? error.message : error;
        return Response.send(false, message, errorMessage, statusCode);
    }
    
    static notFound(message = 'Recurso no encontrado') {
        return Response.send(false, message, null, 404);
    }
    
    static unauthorized(message = 'No autorizado') {
        return Response.send(false, message, null, 401);
    }
    
    static internalServerError(message = 'Error interno del servidor', error = null) {
        const errorMessage = error instanceof Error ? error.message : error;
        return Response.send(false, message, errorMessage, 500);
    }
}
  
export default Response;