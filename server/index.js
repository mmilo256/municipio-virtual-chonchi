import e from "express";
import portalAuthRouter from './routes/portal/authRoutes.js'
import portalProceduresRouter from './routes/portal/proceduresRoutes.js'
import portalRequestsRouter from './routes/portal/requestsRoutes.js'
import adminRequestsRouter from './routes/admin/requestsRoutes.js'
import portalUsersRouter from './routes/portal/usersRoutes.js'
import adminEmailRouter from './routes/admin/emailRoutes.js'
import adminAuthRouter from './routes/admin/authRoutes.js'
import adminDocumentsRouter from './routes/admin/documentsRoutes.js'
import session from "express-session";
import cors from 'cors'
import cookieParser from "cookie-parser";
import 'dotenv/config'
import logger from "./config/winston.js";
import initializeDB from "./config/db/init.js";
import { verifyAdminToken, verifyToken } from "./middlewares/authMIddleware.js";
import { fileURLToPath } from 'node:url'
import path from 'path'

const port = 10000
const app = e()

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

// Configuración para servir archivos estáticos
app.use('/uploads', e.static(path.join(__dirname, 'uploads')));
app.use('/decretos/permisos-transitorios', e.static(path.join(__dirname, 'decretos/permisos-transitorios')));

// Inicializar base de datos
await initializeDB()

// Middleware para registrar solicitudes HTTP
app.use((req, res, next) => {
    const { method, url } = req;
    let message
    message = `${method} ${url}`;
    logger.info(`Solicitud HTTP: ${message}`);
    next();
});

app.use(e.json())
app.use(cookieParser())

app.use(cors({ // Modificar origenes permitidos en producción
    origin: [
        'https://municipio-virtual.onrender.com',
        'https://municipio-virtual-chonchi.onrender.com',
        'http://localhost:10000',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://accounts.claveunica.gob.cl/'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH']
}))

// Configuración del middleware de sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambiar a true en producción
        httpOnly: true
    }
}));

// Endpoints para el portal web
app.use('/portal/auth', portalAuthRouter)
app.use("/portal/procedures", verifyToken, portalProceduresRouter)
app.use("/portal/requests", portalRequestsRouter)
app.use("/portal/users", portalUsersRouter)

// Endpoints para el panel de administración
app.use("/admin/auth", adminAuthRouter)
app.use("/admin/email", adminEmailRouter)
app.use("/admin/documents", verifyAdminToken, adminDocumentsRouter)
app.use("/admin/requests", verifyAdminToken, adminRequestsRouter)

app.listen(port, () => {
    console.log("Servidor levantado...")
})