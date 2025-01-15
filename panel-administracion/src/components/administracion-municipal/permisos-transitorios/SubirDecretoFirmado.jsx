import { useNavigate, useParams } from 'react-router-dom'
import Upload from '../../ui/Upload'
import { useState } from 'react'
import { uploadSignedDocument } from '../../../services/permisosTransitoriosServices'
import { updateRequestStatus } from '../../../services/requestsServices'
import Button from '../../ui/Button'

const SubirDecretoFirmado = () => {

    const { id } = useParams()

    const [signedDoc, setSignedDoc] = useState(null)

    const navigate = useNavigate()

    // Subir decreto firmado a la base de datos después de cargarlo en el cliente
    const uploadSignedDoc = async () => {
        if (signedDoc) {
            const data = new FormData()
            data.append('signedDoc', signedDoc)
            try {
                await uploadSignedDocument(id, data)
                await updateRequestStatus(id, 'aprobada')
                alert("Archivo subido correctamente")
                navigate(`../${id}`)
            } catch (error) {
                alert("No se pudo subir el documento firmado")
                console.log(error.message)
            }
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Subir decreto firmado para la solicitud #{id}</h1>
            <form className="bg-[#fff] p-4 shadow rounded mb-4" action="">
                <Upload files={signedDoc} setFiles={setSignedDoc} />
                <div className='mt-5 flex justify-end'>
                    <Button variant="secondary" text="Subir decreto" onClick={uploadSignedDoc} />
                </div>
            </form>

        </div>
    )
}

export default SubirDecretoFirmado