import express from 'express';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formularios HTML
app.use(express.urlencoded({ extended: true }));

// PUT y DELETE desde formularios HTML
app.use(methodOverride('_method'));

//Configuración de motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views')); // indica dónde están las vistas

// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});