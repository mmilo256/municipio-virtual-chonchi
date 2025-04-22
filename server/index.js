import e from "express";
import session from "express-session";  // Middleware para sesiones
import cors from 'cors';  // Middleware para configurar CORS
import cookieParser from "cookie-parser";  // Middleware para parsear cookies
import initializeDB from "./config/db/init.js";  // Inicializar la base de datos
import { fileURLToPath } from 'node:url';  // Utilidad para trabajar con rutas de archivos en módulos ES6
import path from 'path';  // Utilidad para manipular rutas de archivos

import portalApi from './api/portal.js'
import adminApi from './api/admin.js'
import { config } from "./config/config.js";

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

const { sessionSecret } = config

app.use(session({
    secret: sessionSecret,  // Clave secreta para firmar las cookies de sesión
    resave: false,  // No volver a guardar la sesión si no ha habido cambios
    saveUninitialized: false,  // No guardar sesiones sin inicializar
    cookie: {
        secure: false,  // Cambiar a true en producción para forzar conexiones seguras (HTTPS)
        httpOnly: true  // Hacer que las cookies no sean accesibles por JavaScript (mejor seguridad)
    }
}));

// Rutas del panel de administración
// Se definen las rutas para el panel de administración con sus respectivos middleware de autenticación
/* app.use("/admin/auth", adminAuthRouter);
app.use("/admin/email", verifyAdminToken, adminEmailRouter);
app.use("/admin/requests", verifyAdminToken, adminRequestsRouter);
app.use("/admin/procedures", verifyAdminToken, adminProceduresRouter); */

app.use("/api/portal", portalApi)
app.use("/api/admin", adminApi)

// Inicializar el servidor y escuchar en el puerto configurado
app.listen(port, () => {
    console.log("Servidor levantado...");
});
