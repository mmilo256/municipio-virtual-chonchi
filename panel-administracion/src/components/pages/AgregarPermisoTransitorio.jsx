import { useState } from 'react';
import Breadcrumbs from '../ui/Breadcrumbs';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { crearSolicitud } from '../../services/requestsServices';
import SelectInput from '../ui/SelectInput';
import { useNavigate } from 'react-router-dom';

const AgregarPermisoTransitorio = () => {
  const [orgNameInput, setOrgNameInput] = useState('');
  const [orgRutInput, setOrgRutInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [statusInput, setStatusInput] = useState('');

  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Autorización Especial Transitoria', href: '/permisos-transitorios' },
    { label: `Agregar solicitud`, href: '/permisos-transitorios/agregar' },
  ];

  /* const onSubmit = async () => {
    const formData = new FormData();
    formData.append('nombre', filename);
    formData.append('uploadedDoc', file);
    const data = {
      ...formData,
      type: 'subido',
    };
    try {
      await subirDocumentoAsociado(id, data);
      alert('Documento subido correctamente');
      navigate(`../${id}`);
    } catch (error) {
      alert('No se ha podido subir el documento');
      console.log(error);
    }
  }; */

  const onSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      estado: statusInput,
      respuestas: { orgName: orgNameInput, orgRut: orgRutInput, date: dateInput },
      tramite_id: 1,
      usuario_id: null,
      funcionario_id: 1,
      origen: 'fisico',
    };

    try {
      const response = await crearSolicitud(requestData);
      const requestId = response.request.id;
      if (!requestId) {
        throw new Error('No se recibió un ID de solicitud válido');
      }
      navigate(`../${requestId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const statusOptions = ['pendiente', 'finalizada', 'rechazada'];

  return (
    <div className="w-[60rem] mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">
        Agregar solicitud de Autorización Especial Transitoria
      </h1>
      <form onSubmit={onSubmit} className="bg-[#fff] p-8 rounded border" action="">
        <div className="grid grid-cols-2 gap-4 ">
          <Input
            placeholder="Ej: Junta de vecinos 254"
            label="Nombre organización"
            value={orgNameInput}
            onChange={setOrgNameInput}
          />
          <div className="relative">
            <Input
              label="RUT organización"
              placeholder="Ej: 12345678-9"
              value={orgRutInput}
              onChange={setOrgRutInput}
            />
            <p className="text-xs absolute -bottom-1">El RUT debe ser sin puntos y con guión</p>
          </div>
          <Input type="date" label="Fecha de solicitud" value={dateInput} onChange={setDateInput} />
          <SelectInput
            options={statusOptions}
            label="Estado"
            name="orgDate"
            value={statusInput}
            onChange={setStatusInput}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" text="Agregar solicitud" variant="secondary" />
        </div>
      </form>
    </div>
  );
};

export default AgregarPermisoTransitorio;
