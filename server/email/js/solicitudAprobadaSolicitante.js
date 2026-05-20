export const plantillaSolicitudAprobadaSolicitante = (data) => {
  return `
  <!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solicitud aprobada - Municipio Virtual Chonchi</title>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f1f5f9">
    <div style="width: 100%; padding: 32px 16px; box-sizing: border-box">
      <div style="max-width: 560px; margin: 0 auto">
        <div
          style="
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
          "
        >
          <!-- Header -->
          <div style="padding: 32px 24px 16px 24px">
            <div style="text-align: center">
              <img
                style="width: 60%; margin-bottom: 20px"
                src="https://municipalidadchonchi.cl/web/wp-content/uploads/2020/07/logo-municipalidad-de-chonchi.png"
                alt="Municipalidad de Chonchi"
              />

              <div style="font-family: Arial, Helvetica, sans-serif">
                <div style="margin-top: 4px; font-size: 20px; font-weight: 700; color: #3b4a6d">
                  Municipio Virtual Chonchi
                </div>
              </div>
            </div>
          </div>

          <!-- Body -->
          <div style="padding: 0 24px 32px 24px; font-family: Arial, Helvetica, sans-serif">
            <!-- Saludo -->
            <div style="font-size: 18px; font-weight: 700; color: #0f172a">
              Estimada/o ${data.nombreUsuario},
            </div>

            <!-- Texto principal -->
            <div style="margin-top: 12px; font-size: 14px; line-height: 1.6; color: #334155">
              Le informamos que su solicitud correspondiente al trámite
              <strong>${data.nombreTramite}</strong> ha sido <strong>aprobada</strong> por la Ilustre
              Municipalidad de Chonchi.
            </div>

            <!-- Estado -->
            <div
              style="
                margin-top: 20px;
                background-color: #ecfdf5;
                border: 1px solid #a7f3d0;
                border-radius: 12px;
                padding: 16px;
              "
            >
              <div
                style="font-size: 12px; font-weight: 700; letter-spacing: 0.04em; color: #065f46"
              >
                SOLICITUD APROBADA
              </div>

              <div style="margin-top: 8px; font-size: 14px; color: #065f46; line-height: 1.6">
                Su solicitud fue revisada y aprobada correctamente. Si corresponde, en este correo
                se adjuntan los documentos emitidos por la municipalidad como respaldo de la
                aprobación.
              </div>
            </div>

            <!-- Info solicitud -->
            <div
              style="
                margin-top: 20px;
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 16px;
              "
            >
              <div
                style="font-size: 12px; font-weight: 700; letter-spacing: 0.04em; color: #475569"
              >
                INFORMACIÓN DE LA SOLICITUD
              </div>

              <!-- Key/Value table -->
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="width: 100%; margin-top: 12px; border-collapse: separate"
              >
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b; width: 45%">
                    Trámite
                  </td>
                  <td
                    style="
                      padding: 8px 0;
                      font-size: 14px;
                      color: #0f172a;
                      font-weight: 700;
                      text-align: right;
                    "
                  >
                    ${data.nombreTramite}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">ID</td>
                  <td
                    style="
                      padding: 8px 0;
                      font-size: 14px;
                      color: #0f172a;
                      font-family:
                        ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
                        'Courier New', monospace;
                      text-align: right;
                    "
                  >
                    ${data.codigo}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">
                    Fecha de solicitud
                  </td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.fechaSolicitud}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">Estado</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.estado}
                  </td>
                </tr>

                <tr style="display: block; margin-top: 20px; margin-bottom: 10px">
                  <td
                    style="
                      font-size: 12px;
                      font-weight: 700;
                      letter-spacing: 0.04em;
                      color: #475569;
                    "
                  >
                    DATOS DEL SOLICITANTE
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">Nombre</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.nombreUsuario}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">
                    Correo electrónico
                  </td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.correoUsuario}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">Teléfono</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.telefonoUsuario}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">Domicilio</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.domicilioUsuario}
                  </td>
                </tr>
              </table>
            </div>

            <!-- Información importante -->
            <div
              style="
                margin-top: 24px;
                background-color: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 16px;
              "
            >
              <div style="font-size: 14px; font-weight: 700; color: #0f172a">
                Información importante
              </div>

              <ul
                style="
                  margin: 10px 0 0 18px;
                  padding: 0;
                  color: #334155;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                <li style="margin: 0 0 6px 0">
                  Conserve este correo y los documentos adjuntos como respaldo de la aprobación.
                </li>
                <li style="margin: 0 0 6px 0">
                  La aprobación queda sujeta a las condiciones, plazos o restricciones indicadas en
                  los documentos emitidos, cuando corresponda.
                </li>
                <li style="margin: 0">
                  Puede revisar el estado y detalle de su solicitud ingresando a Municipio Virtual
                  Chonchi.
                </li>
              </ul>
            </div>

            <!-- CTA -->
            <div style="margin-top: 24px">
              <a
                href="https://municipiovirtualchonchi.cl/"
                target="_blank"
                style="
                  display: block;
                  width: 100%;
                  text-align: center;
                  background-color: #0f172a;
                  color: #ffffff;
                  text-decoration: none;
                  font-weight: 700;
                  font-size: 14px;
                  padding: 12px 16px;
                  border-radius: 12px;
                  box-sizing: border-box;
                "
              >
                Ver detalle de la solicitud
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div
            style="
              background-color: #f8fafc;
              padding: 20px 24px;
              text-align: center;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <div style="font-size: 12px; color: #64748b">
              Ilustre Municipalidad de Chonchi · Municipio Virtual Chonchi
            </div>

            <div style="margin-top: 8px; font-size: 11px; color: #94a3b8">
              Este es un correo electrónico generado automáticamente. Por favor, no responder a este
              mensaje.
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
  `;
};
