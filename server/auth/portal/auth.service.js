import axios from "axios";
import { config } from "../../config/config.js"
import User from "../../models/userModel.js";

const { clientId, clientSecret, redirectUri } = config.oauth

// Crear URL para ir al login de ClaveÚnica
export const getAuthUrl = (csrfToken) => {

    const params = {
        client_id: clientId,
        response_type: "code",
        scope: "openid run name",
        redirect_uri: redirectUri,
        state: csrfToken // Incluir el token CSRF para proteger la solicitud
    };

    const queryString = new URLSearchParams(params).toString();
    const authUrl = `https://accounts.claveunica.gob.cl/openid/authorize/?${queryString}`;

    return authUrl
}

// Solicitar token de acceso ClaveÚnica
export const getAccessToken = async (code, state) => {
    try {
        const data = {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
            code,
            state
        }
        const url = "https://accounts.claveunica.gob.cl/openid/token"
        const response = await axios.post(url, new URLSearchParams(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const { access_token } = response.data
        return access_token
    } catch (error) {
        console.log(error.message)
        return null
    }
}

// Obtener información del usuario usando el token de acceso
export const getUserData = async (accessToken) => {
    try {
        const url = 'https://accounts.claveunica.gob.cl/openid/userinfo'
        const response = await axios.post(url, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}


// Agregar usuario a la base de datos si inicia sesión por primera vez
export const insertUser = async (userData) => {
    try {
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

        let userId

        if (!userExists) {
            const newUser = await User.create(newUserData)
            userId = newUser.id
        } else {
            userId = userExists.id
        }
        return {
            id: userId,
            ...newUserData
        }
    } catch (error) {
        console.log(error)
        return null
    }
}