import e from "express";
import initializeDB from "./config/db/init.js";
import cors from 'cors'
import requestsRouter from './Routes/requestsRoutes.js'

const port = 10001
const app = e()

app.use(cors())

// Inicializar base de datos
await initializeDB()

//Mostrar algo
app.use("/solicitudes", requestsRouter)

app.listen(port, () => {
    console.log("listening...")
})