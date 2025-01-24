import e from "express";
import portalAuthRouter from './routes/portal/authRoutes.js'  // Rutas para autenticación del portal
import portalProceduresRouter from './routes/portal/proceduresRoutes.js'  // Rutas para procedimientos del portal
import portalRequestsRouter from './routes/portal/requestsRoutes.js'  // Rutas para solicitudes del portal
import adminRequestsRouter from './routes/admin/requestsRoutes.js'  // Rutas para solicitudes del panel de administración
import portalUsersRouter from './routes/portal/usersRoutes.js'  // Rutas para usuarios del portal
import adminEmailRouter from './routes/admin/emailRoutes.js'  // Rutas para emails del panel de administración
import adminAuthRouter from './routes/admin/authRoutes.js'  // Rutas para autenticación del panel de administración
import session from "express-session";  // Middleware para sesiones
import cors from 'cors';  // Middleware para configurar CORS
import cookieParser from "cookie-parser";  // Middleware para parsear cookies
import 'dotenv/config';  // Cargar variables de entorno
import logger from "./config/winston.js";  // Logger para registrar logs
import initializeDB from "./config/db/init.js";  // Inicializar la base de datos
import { fileURLToPath } from 'node:url';  // Utilidad para trabajar con rutas de archivos en módulos ES6
import path from 'path';  // Utilidad para manipular rutas de archivos
import { verifyAdminToken } from "./middlewares/admin/authMiddleware.js";
// import { verifyToken } from "./middlewares/authMIddleware.js";

const port = 10000;  // Definir puerto para el servidor
const app = e();  // Crear la instancia de la aplicación Express

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);  // Obtener la ruta del archivo actual
export const __dirname = path.dirname(__filename);  // Obtener el directorio del archivo actual

// Configuración para servir archivos estáticos
// Se define que los archivos en 'uploads' y 'decretos/permisos-transitorios' se sirvan como archivos estáticos
app.use('/uploads', e.static(path.join(__dirname, 'uploads')));
app.use('/documents/permisos-transitorios', e.static(path.join(__dirname, 'documents/permisos-transitorios')));
app.use('/documents/documentos-asociados', e.static(path.join(__dirname, 'documents/documentos-asociados')));

// Inicializar base de datos (esto se realiza de forma asíncrona)
await initializeDB();

// Middleware para registrar solicitudes HTTP
// Este middleware registra todas las solicitudes HTTP que llegan al servidor
app.use((req, res, next) => {
    const { method, url } = req;  // Obtener método HTTP y URL de la solicitud
    let message = `${method} ${url}`;  // Crear mensaje con el método y URL
    logger.info(`Solicitud HTTP: ${message}`);  // Registrar la solicitud en los logs
    next();  // Continuar con la ejecución del siguiente middleware o ruta
});

app.use(e.json());  // Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(cookieParser());  // Middleware para parsear las cookies de las solicitudes

// Configuración del CORS (Cross-Origin Resource Sharing)
// Definir los orígenes permitidos para acceder a la API (en producción y desarrollo)
app.use(cors({
    origin: [
        'https://municipio-virtual.onrender.com',
        'https://municipio-virtual-chonchi.onrender.com',
        'http://localhost:10000',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://accounts.claveunica.gob.cl/'
    ],
    credentials: true,  // Permitir el envío de cookies y credenciales en solicitudes
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE']  // Métodos HTTP permitidos
}));

// Configuración del middleware de sesión
// Esto gestiona las sesiones del usuario utilizando cookies
app.use(session({
    secret: process.env.SESSION_SECRET,  // Clave secreta para firmar las cookies de sesión
    resave: false,  // No volver a guardar la sesión si no ha habido cambios
    saveUninitialized: false,  // No guardar sesiones sin inicializar
    cookie: {
        secure: false,  // Cambiar a true en producción para forzar conexiones seguras (HTTPS)
        httpOnly: true  // Hacer que las cookies no sean accesibles por JavaScript (mejor seguridad)
    }
}));

// Rutas del portal web
// Se definen las rutas para el portal con sus respectivos middleware de autenticación
app.use('/portal/auth', portalAuthRouter);
app.use("/portal/procedures", portalProceduresRouter);  // Ruta protegida por el middleware verifyToken
app.use("/portal/requests", portalRequestsRouter);
app.use("/portal/users", portalUsersRouter);

// Rutas del panel de administración
// Se definen las rutas para el panel de administración con sus respectivos middleware de autenticación
app.use("/admin/auth", adminAuthRouter);
app.use("/admin/email", verifyAdminToken, adminEmailRouter);
app.use("/admin/requests", verifyAdminToken, adminRequestsRouter);

// Inicializar el servidor y escuchar en el puerto configurado
app.listen(port, () => {
    console.log("Servidor levantado...");
});
