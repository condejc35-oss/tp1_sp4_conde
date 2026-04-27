import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si la petición viene de un formulario, renderiza la vista con errores
        if (req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
            return res.status(400).render('addSuperhero', {
                errors: errors.array(),
                success: false,
                nombreSuperHeroe: '',
                nombreReal: '',
                edad: '',
                planetaOrigen: '',
                poderes: '',
                aliados: '',
                enemigos: '',
                creador: '',
                ...req.body
            });
        }
        // Si viene de Postman o API, responde con JSON
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg
            }))
        });
    }
    next();
};