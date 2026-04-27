import { obtenerSuperheroePorid, obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,
    crearSuperheroe, actualizarSuperheroe,
    eliminarSuperheroe, eliminarPorNombre }
from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes }
from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorid(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroresController(req, res) {
    try {
        const heroes = await obtenerTodosLosSuperheroes();
        if (heroes.length === 0) {
            return res.status(404).json(
                { mensaje: 'No se encontraron superhéroes' });
        }
        // Renderizar con dashboard.ejs pasándole el array de héroes
        res.render('dashboard', { heroes });
    } catch (error) {
        res.status(500).json(
            { mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

////////////////////////////////////////////////
////// Funcionalidades TP 1 - Sprint 3//////////
////////////////////////////////////////////////

//Crear nuevo superhéroe
export async function crearSuperheroeController (req, res) {
    try {
        const nuevoHeroe = await crearSuperheroe(req.body);
        res.status(201).send(nuevoHeroe);
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

//Actualizar superhéroe en DB y mostrar todos actualizados
export async function actualizarSuperheroeController (req, res) {
    try {
        const heroeActualizado = await actualizarSuperheroe(req.body);
        res.status(201).send(heroeActualizado);
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

//Eliminar superhéroe por id en DB y mostrar todos actualizados
export async function eliminarHeroeController (req, res) {
    try {
        const { id } = req.params;
        const heroeEliminado = await eliminarSuperheroe(id);
        res.status(201).send(heroeEliminado);
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al eliminar el superhéroe de DB', error: error.message });
    }
}

//Eliminar superhéroe por nombre en DB y mostrar eliminado
export async function eliminarPorNombreController(req, res) {
    try {
        const { nombreSuperHeroe } = req.params;
        const superheroeEliminado = await eliminarPorNombre(nombreSuperHeroe);
        res.status(201).send(superheroeEliminado);
        
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al eliminar el superhéroe de DB', error: error.message });
    }

}

////////////////////////////////////////////////
//Nuevas funcionalidades - TP 3 - Sprint 3//////
////////////////////////////////////////////////

// Mostrar formulario
export async function mostrarFormularioAgregarController(req, res) {
    res.render('addSuperhero', {
        errors: [],
        success: false,
        nombreSuperHeroe: '',
        nombreReal: '',
        edad: '',
        planetaOrigen: '',
        poderes: '',
        aliados: '',
        enemigos: '',
        creador: ''
    });
}

// Procesar datos ingresados en el formulario y guardar en DB
export async function agregarSuperheroeController(req, res) {
    try {
        const datos = {
            ...req.body,
            poderes: req.body.poderes
                ? req.body.poderes.split(',').map(p => p.trim()).filter(p => p !== '')
                : [],
            aliados: req.body.aliados
                ? req.body.aliados.split(',').map(a => a.trim()).filter(a => a !== '')
                : [],
            enemigos: req.body.enemigos
                ? req.body.enemigos.split(',').map(e => e.trim()).filter(e => e !== '')
                : []
        };

        await crearSuperheroe(datos);

        // Volver al dashboard
        res.redirect('/api/heroes');

    } catch (error) {
        console.error(error);
        res.status(500).render('addSuperhero', {
            errors: [{ msg: 'Error interno al guardar el superhéroe' }],
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
}

// Mostrar el formulario con datos del héroe
export async function mostrarFormularioEditarController(req, res) {
    try {
        const { id } = req.params;
        const hero = await obtenerSuperheroePorid(id);
        if (!hero) {
            return res.status(404).send('Superhéroe no encontrado');
        }
        res.render('editSuperhero', {
            hero,
            errors: [],
            success: false,
            nombreSuperHeroe: hero.nombreSuperHeroe,
            nombreReal:       hero.nombreReal,
            edad:             hero.edad,
            planetaOrigen:    hero.planetaOrigen,
            poderes:          hero.poderes.join(', '),
            aliados:          hero.aliados.join(', '),
            enemigos:         hero.enemigos.join(', '),
            creador:          hero.creador
        });
    } catch (error) {
        console.error('Error en mostrarFormularioEditarController:', error.message);
        res.status(500).send('Error al cargar el formulario de edición');
    }
}

// Procesar el formulario y actualizar DB
export async function editarSuperheroeController(req, res) {
    try {
        const { id } = req.params;

        const datosActualizados = {
            ...req.body,
            poderes: req.body.poderes
                ? req.body.poderes.split(',').map(p => p.trim()).filter(p => p !== '')
                : [],
            aliados: req.body.aliados
                ? req.body.aliados.split(',').map(a => a.trim()).filter(a => a !== '')
                : [],
            enemigos: req.body.enemigos
                ? req.body.enemigos.split(',').map(e => e.trim()).filter(e => e !== '')
                : []
        };

        await actualizarSuperheroe(id, datosActualizados);

        // Volver al dashboard
        res.redirect('/api/heroes');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el superhéroe');
    }
}

// Eliminar superhéroe desde el tablero
export async function eliminarSuperheroeDesdeTableroController(req, res) {
    try {
        const { id } = req.params;
        const heroeEliminado = await eliminarSuperheroe(id);
        if (!heroeEliminado) {
            return res.status(404).send('Superhéroe no encontrado');
        }
        // Volver al dashboard
        res.redirect('/api/heroes');
    } catch (error) {
        console.error('Error al eliminar:', error.message);
        res.status(500).send('Error al eliminar el superhéroe');
    }
}