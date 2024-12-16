import e from "express";
import authRouter from './auth/authRoutes.js'
import proceduresRouter from './Routes/proceduresRoutes.js'
import requestsRouter from './Routes/requestsRoutes.js'
import usersRouter from './Routes/usersRoutes.js'
import session from "express-session";
import cors from 'cors'
import cookieParser from "cookie-parser";
import 'dotenv/config'
import logger from "./config/winstonConfig.js";
import initializeDB from "./config/db/init.js";
import { verifyToken } from "./auth/authMIddleware.js";
import multer from "multer";

const port = 10000
const app = e()

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

app.use(cors({
    origin: [
        'https://municipio-virtual.onrender.com',
        'https://municipio-virtual-chonchi.onrender.com',
        'http://localhost:10000',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://accounts.claveunica.gob.cl/'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
}))

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// Instanciar Multer
export const upload = multer({ storage })

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

app.use('/', authRouter)
app.use("/procedures", verifyToken, proceduresRouter)
app.use("/requests", upload.any('requestDoc', 8), requestsRouter)
app.use("/users", usersRouter)

app.listen(port, () => {
    console.log("Servidor levantado...")
})