export const plantillaSolicitudCorregidaFuncionario = (data) => {
  return `
  <!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solicitud corregida - Municipio Virtual Chonchi</title>
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
            <div style="font-size: 18px; font-weight: 700; color: #0f172a">Solicitud corregida</div>

            <div style="margin-top: 12px; font-size: 14px; line-height: 1.6; color: #334155">
              Le informamos que el solicitante <strong>${data.nombreSolicitante}</strong> ha enviado la
              corrección de su solicitud correspondiente al trámite
              <strong>${data.nombreTramite}</strong>.
            </div>

            <!-- Estado -->
            <div
              style="
                margin-top: 20px;
                background-color: #ecfdf5;
                border: 1px solid #bbf7d0;
                border-radius: 12px;
                padding: 16px;
              "
            >
              <div
                style="font-size: 12px; font-weight: 700; letter-spacing: 0.04em; color: #166534"
              >
                SOLICITUD CORREGIDA
              </div>

              <div style="margin-top: 8px; font-size: 14px; color: #14532d; line-height: 1.6">
                La solicitud ya fue corregida por el solicitante y se encuentra disponible para una
                nueva revisión en el panel de administración.
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
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">Código</td>
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
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">Solicitante</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.nombreSolicitante}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">
                    Fecha de corrección
                  </td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.fechaCorreccion}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #64748b">Estado</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #0f172a; text-align: right">
                    ${data.estado}
                  </td>
                </tr>
              </table>
            </div>

            <!-- Instrucción -->
            <div
              style="
                margin-top: 24px;
                background-color: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 16px;
              "
            >
              <div style="font-size: 14px; font-weight: 700; color: #0f172a">¿Qué debe hacer?</div>

              <ul
                style="
                  margin: 10px 0 0 18px;
                  padding: 0;
                  color: #334155;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                <li style="margin: 0 0 6px 0">Ingrese al panel de administración.</li>
                <li style="margin: 0 0 6px 0">
                  Revise la información corregida por el solicitante.
                </li>
                <li style="margin: 0">
                  Continúe con la tramitación de la solicitud según corresponda.
                </li>
              </ul>
            </div>

            <!-- CTA -->
            <div style="margin-top: 24px">
              <a
                href="#"
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
                Revisar solicitud corregida
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
