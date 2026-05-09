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
    eliminarPorNombreController,
    mostrarFormularioAgregarController,
    agregarSuperheroeController,
    mostrarFormularioEditarController,
    editarSuperheroeController,
    eliminarSuperheroeDesdeTableroController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Método: ${req.method} | Ruta: ${req.path}`);
    next();
});

// Página de inicio
router.get('/', (req, res) => {
    res.render('index', { title: 'Inicio' });
});

// ─────────
// RUTAS GET
// ─────────

// Rutas fijas
router.get('/heroes', obtenerTodosLosSuperheroresController);
router.get('/heroes/agregar', mostrarFormularioAgregarController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);


// Rutas con parámetros dinámicos
router.get('/heroes/:id/editar', mostrarFormularioEditarController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);


// ──────────
// RUTAS POST
// ──────────
router.post('/heroes/agregar', validarSuperHeroe(), handleValidationErrors, agregarSuperheroeController);
router.post('/superHeroe', validarSuperHeroe(), handleValidationErrors, crearSuperheroeController);


// ──────────
// RUTAS PUT
// ──────────
router.put('/heroes/:id', validarSuperHeroe(), handleValidationErrors, editarSuperheroeController);
router.put('/superHeroe/actualizar', actualizarSuperheroeController);


// ────────────
// RUTAS DELETE
// ────────────
router.delete('/superHeroe/nombre/:nombreSuperHeroe', eliminarPorNombreController);
router.delete('/superHeroe/eliminar/:id', eliminarHeroeController);
// Eliminar héroe por ID desde el dashboard
router.delete('/heroes/:id', eliminarSuperheroeDesdeTableroController);


export default router;

