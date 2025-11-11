import BaseTable from '../ui/BaseTable';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import TableButton from '../ui/TableButton';
import { useState } from 'react';
import Modal from '../ui/Modal';
import { deleteDocumentService, downloadDocumentService } from '../../services/documents.service';
import { toast } from 'react-toastify';
import { API_URL } from '../../../config';

const DocumentosSubidos = ({ docs = [], setRefresh, status }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});

  const navigate = useNavigate();
  const columns = ['Documento', 'Acciones'];

  const [loading, setLoading] = useState(false);

  // Borrar un documento
  const onDeleteDocument = async () => {
    setLoading(true);
    try {
      await deleteDocumentService(selectedDocument.id);
      setRefresh((prev) => !prev);
      toast.success('Documento borrado exitosamente');
    } catch (error) {
      console.log(error);
      toast.error('No se pudo borrar el documento seleccionado');
    } finally {
      setDeleteModal(false);
      setLoading(false);
    }
  };

  const toggleDeleteModal = (doc) => {
    setSelectedDocument(doc);
    setDeleteModal(!deleteModal);
  };

  // Descargar documento
  const onDownloadDocument = (id) => {
    try {
      downloadDocumentService(id);
    } catch (error) {
      console.log(error);
      alert('No se pudo descargar el documento');
    }
  };

  const openDocument = (id) => {
    window.open(`${API_URL}/documents/${id}/view`);
  };

  const data = docs.map((doc) => {
    return {
      document: (
        <button
          type="button"
          target="_blank"
          className="text-blue-500 underline"
          onClick={() => {
            openDocument(doc.id);
          }}
        >
          {doc.nombre}
        </button>
      ),
      actions: (
        <div className="flex gap-2">
          <TableButton
            onClick={() => {
              toggleDeleteModal(doc);
            }}
            color="red"
            text="Borrar"
          />
          <TableButton
            onClick={() => {
              onDownloadDocument(doc.id);
            }}
            color="blue"
            text="Descargar"
          />
        </div>
      ),
    };
  });

  const onNavigate = () => {
    navigate('subir-documento');
  };

  return (
    <>
      {status && (
        <div className="flex flex-col items-start gap-4 mb-4">
          {status !== 'rechazada' && status !== 'finalizada' && (
            <Button onClick={onNavigate} variant="secondary" text="Subir documento" />
          )}
          {docs.length === 0 ? (
            <p>No hay documentos subidos</p>
          ) : (
            <BaseTable columns={columns} data={data} />
          )}
        </div>
      )}
      <Modal
        loading={loading}
        onClick={onDeleteDocument}
        btnText="Borrar documento"
        title="Borrar documento"
        toggleModal={toggleDeleteModal}
        modal={deleteModal}
      >
        <p>
          ¿Seguro que desea borrar el documento <strong>{selectedDocument?.nombre}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default DocumentosSubidos;
