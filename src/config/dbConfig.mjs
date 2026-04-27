import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://grupo-06:grupo-06@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}


