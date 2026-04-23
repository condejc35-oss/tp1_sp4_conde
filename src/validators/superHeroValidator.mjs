import { body } from 'express-validator';

////////////////
//Validaciones//
////////////////

//nombreSuperheroe debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud minima de 3 caracteres y una longitud maxima de 60
export const validarSuperHeroe = () => 
    [
        body('nombreSuperHeroe')
            .trim()
            .notEmpty()
            .withMessage('Se requiere nombre del superhéroe')
            .isLength({ min:3 })
            .withMessage('Se requiere un mínimo de 6 caracteres')
            .isLength({ max:60 })
            .withMessage('No puede tener más de 60 caracteres'),

//nombreReal debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud minima de 3 caracteres y una longitud maxima de 60
        body('nombreReal')
            .trim()
            .notEmpty()
            .withMessage('El nombre real es requerido')
            .isLength({ min: 3 })
            .withMessage('3 caracteres como mínimo')
            .isLength({ max: 60 })
            .withMessage('No puede tener más de 60 caracteres'),

//edad debe validarse que sea requerido, que sea un numero, no tenga espacios en blanco(trim), valor minimo 0 (no admite edad negativa)
        body('edad')
            .trim()
            .notEmpty()
            .withMessage('La edad es requerida')
            .isNumeric()
            .withMessage('Se requiere un número')
            .isInt({ min: 0 })
            .withMessage('Ingrese edad correcta'),

//poderes debe validarse que sea requerido, que sea un array de string cuyo tamaño no sea 0, cada elemento no tenga espacios en blanco, cada elemento una longitud minima de 3 caracteres y una longitud maxima de 60
        body('poderes')
            .isArray({ min: 1 })
            .withMessage('Poderes debe ser un array con al menos un elemento'),

        // Valida cada elemento del array
        body('poderes.*')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Cada poder debe tener al menos 3 caracteres')
            .isLength({ max: 60 })
            .withMessage('Cada poder no puede superar los 60 caracteres')
            .isString()
            .withMessage('Cada poder debe ser un string')
    ];


