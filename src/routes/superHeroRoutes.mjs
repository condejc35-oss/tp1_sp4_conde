import express from 'express';
import { validarSuperHeroe } from '../validators/superHeroValidator.mjs';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.mjs';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroresController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarHeroeController,
    eliminarPorNombreController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroresController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);

////////////////
//Nuevas rutas//
/////TP1-S3/////
////////////////

//Crear nuevo superheroe
router.post('superHeroe/name', validarSuperHeroe(), handleValidationErrors, crearSuperheroeController);

//Actualizar héroe y mostrar todos los héroes actualizados
router.put('/superHeroe/actualizar', actualizarSuperheroeController);

//Eliminar héroe por nombre y mostrar eliminado
router.delete('/superHeroe/nombre/:nombreSuperHeroe', eliminarPorNombreController);

//Eliminar héroe y mostrar todos los héroes actualizados
router.delete('/superHeroe/eliminar/:id', eliminarHeroeController);



export default router;

