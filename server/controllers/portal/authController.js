import axios from 'axios'
import 'dotenv/config'
import crypto from 'node:crypto'
import Jwt from 'jsonwebtoken'
import logger from '../../config/winston.js'
import User from '../../models/userModel.js'

// Cerrar sesión
export const logout = async (req, res) => {
    res.clearCookie('jwt', {
        secure: false, // Cambiar a true en producción para usar HTTPS
        httpOnly: true // Impide acceso al cookie desde JavaScript en el navegador
    })
    req.session.destroy((err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: "No se pudo destruir la sesión" })
        }
    })
    res.send("Se ha destruido la sesión")
}

// Función para ingresar credenciales en ClaveÚnica
export const login = async (req, res) => {
    try {
        // Crear un token anti-falsificación único para proteger el proceso de login
        const csrfToken = crypto.randomBytes(30).toString('hex');
        req.session.csrfToken = csrfToken;

        // Construir la URL para solicitar autorización de ClaveÚnica
        const params = {
            client_id: process.env.CLIENT_ID,
            response_type: "code",
            scope: "openid run name", // Solicitando acceso a la información personal del usuario
            redirect_uri: process.env.REDIRECT_URI,
            state: csrfToken // Incluir el token CSRF para proteger la solicitud
        };

        const queryString = new URLSearchParams(params).toString();
        const authURL = `https://accounts.claveunica.gob.cl/openid/authorize/?${queryString}`;

        // Redirigir al usuario al login de ClaveÚnica para la autenticación
        logger.info("Redirigiendo al login de ClaveÚnica...")
        res.redirect(authURL);
    } catch (error) {
        // Manejo de errores en el proceso de login
        logger.error(`No se pudo iniciar sesión en ClaveÚnica. ${error.message}`)
        console.error('Error en el proceso de login:', error);
        res.status(500).send('Error al procesar la solicitud de login');
    }
};

// Función callback para el entorno de desarrollo (solo con fines de prueba)
export const callbackDev = async (req, res) => {
    const { code, state } = req.query
    if (!code || !state) {
        return res.send('No funcionó...')
    }
    res.send('¡Funcionó!')
}

// Función callback para cuando el usuario autoriza la aplicación en ClaveÚnica
export const callback = async (req, res) => { // Cambiar nombre a callback en producción
    const { code, state } = req.query

    // Verificar que se hayan recibido correctamente los parámetros de código y estado
    if (!code || !state) {
        console.log(error)
        logger.error("Faltan parámetros código o estado")
        return res.json({ message: "Faltan parámetros", error })
    }

    // Confirmar que el token anti-falsificación es válido
    const csrfToken = req.session.csrfToken
    if (state !== csrfToken) {
        logger.error("El token anti-falsificación no es válido.")
        return res.json({ message: "El token anti-falsificación no es válido." })
    }

    // Intercambiar el código de autorización por un token de acceso
    const authData = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
        code,
        state
    }
    try {
        // Solicitar el token de acceso
        const response = await axios.post('https://accounts.claveunica.gob.cl/openid/token', authData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const { access_token } = response.data
        if (!access_token) {
            logger.error("No se pudo obtener el token de acceso")
            return res.send("No se pudo obtener el token de acceso")
        }

        // Obtener los datos del usuario utilizando el token de acceso
        const userDataResponse = await axios.post('https://accounts.claveunica.gob.cl/openid/userinfo', null, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const userData = userDataResponse.data

        if (!userData) {
            logger.error("No se pudo obtener la información del usuario.")
            return res.send("No se pudo obtener la información del usuario.")
        }

        // Procesar y almacenar la información del usuario si es la primera vez que ingresa
        let userNames = ""
        let userLastNames = ""
        userData.name.nombres.map(name => {
            userNames += `${name} `
        })
        userData.name.apellidos.map(lastName => {
            userLastNames += `${lastName} `
        })
        const userRut = `${userData.RolUnico.numero}-${userData.RolUnico.DV}`

        const newUserData = {
            nombres: userNames,
            apellidos: userLastNames,
            run: userRut
        }

        // Verificar si el usuario ya existe en la base de datos, si no, agregarlo
        const userExists = await User.findOne({ where: { run: userRut } })

        if (!userExists) {
            await User.create(newUserData)
            logger.info("Se ha agregado el usuario a la base de datos")
        }

        // Crear el JSON Web Token (JWT) con los datos del usuario
        const payload = {
            run: userData.RolUnico,
            name: userData.name
        }
        const jwt = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        // Enviar el JWT en una cookie
        res.cookie('jwt', jwt, {
            secure: false, // Cambiar a true en producción para usar HTTPS
            httpOnly: true // Impide acceso al cookie desde JavaScript
        })
        logger.info("Se creo el token JWT")
        res.redirect(process.env.HOME_URL) // Redirigir al usuario a la página principal
    } catch (error) {
        console.log(error)
        logger.error("No se pudo generar el token JWT.", error.message)
        res.send("No se pudo generar el token JWT.")
    }
}

// Comprobación de sesión para acceder a rutas protegidas
export const getSessionData = (req, res) => {
    const jwt = req.cookies.jwt
    if (!jwt) {
        return res.status(400).json({ message: "Sin token." })
    }
    const decoded = Jwt.decode(jwt, process.env.JWT_SECRET)
    const sessionData = {
        run: decoded.run,
        name: decoded.name
    }
    console.log(sessionData)
    res.status(200).json({ jwt }) // Responde con los datos del usuario si está autenticado
}
