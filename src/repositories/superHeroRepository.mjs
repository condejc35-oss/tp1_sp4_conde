import superHero from '../models/superHero.mjs';
import SuperHero from '../models/superHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    /////////////////
    /////TP1-S3//////
    /////////////////

    //Crear superhéroe
    async crear(datos) {
    const nuevoHeroe = new SuperHero(datos);
    return await nuevoHeroe.save();
    }

    //Actualizar superhéroe y mostrar todos
    async actualizarHeroe(id, datos) {
        await SuperHero.findByIdAndUpdate(
            id,
            { $set: datos },
            { new: true, runValidators: true }
        );
        return await SuperHero.findById(id);
    }

    //Borrar superhéroe por id de DB y mostrar lista actulalizada
    async eliminarHeroe(id) {
        const result = await SuperHero.findByIdAndDelete({ _id: id });
        return await SuperHero.find({});
    }

    //Borrar superhéroe por nombre de DB y mostrr superhéroe borrado
    async eliminarSuperHeroePorNombre(nombreSuperHeroe) {
        const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
        return await result;
    }
}

export default new SuperHeroRepository();