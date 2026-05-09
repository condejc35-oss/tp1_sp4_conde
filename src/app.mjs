import express from 'express';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import expressLayouts from 'express-ejs-layouts';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


//MIDDLEWEARES

// Middleware para parsear JSON
app.use(express.json());
// Middleware para parsear datos de formularios HTML
app.use(express.urlencoded({ extended: true }));
// PUT y DELETE desde formularios HTML
app.use(methodOverride('_method'));

//Configuración de motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views')); // indica dónde están las vistas

// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // usar views/layout.ejs como base

// Servir archivos estáticos
app.use(express.static(resolve(__dirname, 'public')));


// Rutas estáticas
app.get('/', (req, res) => {
    res.render('index', { title: 'Página Principal' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca de' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contacto' });
});


// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});