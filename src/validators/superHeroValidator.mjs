import { body } from 'express-validator';

////////////////
//Validaciones//
////////////////

//nombreSuperheroe debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud minima de 3 caracteres y una longitud maxima de 60
export const validarSuperHeroe = () => [
    body('nombreSuperHeroe')
        .trim()
        .notEmpty()
        .withMessage('El nombre del superhéroe es requerido')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 60 })
        .withMessage('El nombre no puede superar los 60 caracteres'),

    body('nombreReal')
        .trim()
        .notEmpty()
        .withMessage('El nombre real es requerido')
        .isLength({ min: 3 })
        .withMessage('El nombre real debe tener al menos 3 caracteres')
        .isLength({ max: 60 })
        .withMessage('El nombre real no puede superar los 60 caracteres'),

    body('edad')
        .trim()
        .notEmpty()
        .withMessage('La edad es requerida')
        .isNumeric()
        .withMessage('La edad debe ser un número')
        .isInt({ min: 0 })
        .withMessage('La edad no puede ser negativa'),

    // Validr como string, no como array
    body('poderes')
        .trim()
        .notEmpty()
        .withMessage('Debe ingresar al menos un poder')
        .isLength({ max: 500 })
        .withMessage('Los poderes no pueden superar los 500 caracteres')
];


