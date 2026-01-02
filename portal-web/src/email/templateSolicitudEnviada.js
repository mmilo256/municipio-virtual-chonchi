const templateSolicitudEnviada = (
  idTramite,
  nombreTramite,
  infoSolicitante = {},
  fechaSolicitud,
  portalUrl = 'https://municipiovirtualchonchi.cl',
) => {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Nueva solicitud recibida</title>
  </head>

  <body style="margin:0; padding:0; background:#f3f4f6;">
    <!-- Preheader (texto que se ve en la bandeja, oculto en el cuerpo) -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      Se recibió una nueva solicitud en Municipio Virtual Chonchi. ID ${idTramite} · Trámite: ${nombreTramite}.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f4f6; padding:24px 0;">
      <tr>
        <td align="center" style="padding:0 12px;">
          <!-- Contenedor -->
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:18px 22px; background:#0f172a;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      <div style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#cbd5e1; margin:0;">
                        Municipalidad de Chonchi
                      </div>
                      <div style="font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:700; color:#ffffff; margin:2px 0 0 0;">
                        Municipio Virtual Chonchi
                      </div>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <span style="display:inline-block; font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#0f172a; background:#e2e8f0; padding:6px 10px; border-radius:999px;">
                        Nueva solicitud
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Cuerpo -->
            <tr>
              <td style="padding:22px;">
                <h1 style="margin:0 0 10px 0; font-family:Arial, Helvetica, sans-serif; font-size:20px; line-height:1.2; color:#0f172a;">
                  Se ha recibido una nueva solicitud
                </h1>

                <p style="margin:0 0 16px 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.5; color:#334155;">
                  Un usuario completó y envió un formulario en <strong>Municipio Virtual Chonchi</strong>.
                  Revisa el detalle para gestionarla a la brevedad.
                </p>

                <!-- Resumen / tarjeta -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
                  <tr>
                    <td style="padding:14px 14px 6px 14px;">
                      <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#64748b; margin:0;">
                        Folio
                      </div>
                      <div style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:700; color:#0f172a; margin:2px 0 10px 0;">
                        ${idTramite}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 14px 14px 14px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding:8px 0; border-top:1px solid #e2e8f0;">
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#64748b;">Trámite</div>
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#0f172a; font-weight:600;">
                              ${nombreTramite}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; border-top:1px solid #e2e8f0;">
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#64748b;">Solicitante</div>
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#0f172a;">
                              ${infoSolicitante?.name} <span style="color:#64748b;">·</span> ${infoSolicitante?.rut}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; border-top:1px solid #e2e8f0;">
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#64748b;">Contacto</div>
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#0f172a;">
                              ${infoSolicitante?.email} <span style="color:#64748b;">·</span> ${infoSolicitante?.phone}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; border-top:1px solid #e2e8f0;">
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#64748b;">Fecha y hora</div>
                            <div style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#0f172a;">
                              ${fechaSolicitud}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Botón -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:18px 0 0 0;">
                  <tr>
                    <td>
                      <a
                        href="${portalUrl}"
                        style="display:inline-block; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:700; color:#ffffff; background:#2563eb; text-decoration:none; padding:12px 16px; border-radius:10px;"
                        target="_blank"
                        rel="noopener"
                      >
                        Ver solicitud en el panel
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Nota -->
                <p style="margin:16px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.5; color:#64748b;">
                  Si no puedes abrir el botón, copia y pega este enlace en tu navegador:<br />
                  <span style="word-break:break-all; color:#334155;">${portalUrl}</span>
                </p>

                <!-- Divider -->
                <div style="height:1px; background:#e2e8f0; margin:18px 0;"></div>

                <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.5; color:#64748b;">
                  Este es un correo automático. Por favor no respondas a este mensaje.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 22px; background:#f8fafc; border-top:1px solid #e2e8f0;">
                <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#64748b; line-height:1.5;">
                  Municipalidad de Chonchi · Municipio Virtual Chonchi<br />
                  Pedro Montt 254 · 652 671255
                </div>
              </td>
            </tr>
          </table>

          <!-- margen inferior -->
          <div style="height:24px;"></div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

export default templateSolicitudEnviada;
