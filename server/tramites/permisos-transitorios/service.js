import dayjs from 'dayjs'

export const generarDecretoService = async (data) => {
    const { numDecreto, actividad, ubicacion, organizacion, rutOrganizacion, presidente, rutPresidente, fechaInicio, horaInicio, fechaTermino, horaTermino } = data
    const formattedData = {
        numDecreto: Number(numDecreto),
        actividad,
        ubicacion,
        organizacion,
        rutOrganizacion,
        presidente,
        rutPresidente,
        fechaInicio: dayjs(fechaInicio).format("")
    }
    return formattedData

}