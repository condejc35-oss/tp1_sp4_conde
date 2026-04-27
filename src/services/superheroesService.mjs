import superHeroRepository from '../repositories/superHeroRepository.mjs';

export async function obtenerSuperheroePorid(id) {
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

//Crear superheroe
export async function crearSuperheroe(datos) {
    return await superHeroRepository.crear(datos);
}

//Actualizar superhéroe
export async function actualizarSuperheroe(id, datos) {
    return await superHeroRepository.actualizarHeroe(id, datos);
}

//Eliminar superhéroe por id en DB y mostrar todos actualizados
export async function eliminarSuperheroe(id) {
    return await superHeroRepository.eliminarHeroe(id);
}

//Eliminar superhéeroe por nombre en DB y msotrar eliminado
export async function eliminarPorNombre(nombreSuperHeroe) {
    return await superHeroRepository.eliminarSuperHeroePorNombre(nombreSuperHeroe);    
}

