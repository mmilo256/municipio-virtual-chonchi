import { useEffect, useState } from 'react';
import BaseTable from '../../ui/BaseTable';
import TableButton from '../../ui/TableButton';
// import { useEffect } from 'react';
import { downloadDocumentService } from '../../../services/documents.service';
import { API_URL } from '../../../../config';

const DocsPermisosTransitorios = ({ docs = [] }) => {
  const columns = ['Documento', 'Acciones'];
  const [data, setData] = useState([]);

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

  /* const labels = [
    'Cédula de identidad',
    'RUT Tributario',
    'Vigencia de Persona Jurídica',
    'Documento de ocupación legal del recinto',
    'Declaración Jurada',
    'Certificado de antecedentes',
    'Firma del presidente',
  ]; */

  useEffect(() => {
    (async () => {
      const reqDocs = [
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[0].id);
              }}
            >
              Cédula de identidad
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[0].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[1].id);
              }}
            >
              RUT Tributario
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[1].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[2].id);
              }}
            >
              Vigencia de Persona Jurídica
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[2].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[3].id);
              }}
            >
              Documento de ocupación legal del recinto
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[3].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[4].id);
              }}
            >
              Declaración Jurada
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[4].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[5].id);
              }}
            >
              Certificado de antecedentes
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[5].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[6].id);
              }}
            >
              Firma del presidente
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[6].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
        {
          link: (
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                openDocument(docs[7].id);
              }}
            >
              Formulario Autoridad Sanitaria
            </button>
          ),
          href: (
            <TableButton
              onClick={() => {
                onDownloadDocument(docs[7].id);
              }}
              color="blue"
              text="Descargar"
            />
          ),
        },
      ];
      await setData(reqDocs);
    })();
  }, [docs]);

  return <BaseTable data={data} columns={columns} />;
};

export default DocsPermisosTransitorios;
