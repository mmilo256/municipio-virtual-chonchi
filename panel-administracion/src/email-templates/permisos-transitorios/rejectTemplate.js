export const rejectTemplate = (userFullName, reason, title) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
      border-bottom: 2px solid #007bff;
    }
    .header h1 {
      margin: 0;
      color: #007bff;
      font-size: 24px;
    }
    .content {
      padding: 20px 0;
    }
    .content p {
      margin: 10px 0;
      color: #333333;
      line-height: 1.5;
    }
    .footer {
      text-align: center;
      padding: 10px 0;
      font-size: 12px;
      color: #777777;
    }
    .btn {
      display: inline-block;
      margin: 10px 0;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Municipalidad de Chonchi</h1>
    </div>
    <div class="content">
      <p>Estimado/a ${userFullName},</p>
      <p>Lamentamos informarle que su solicitud para un permiso transitorio ha sido <strong>rechazada</strong>.</p>
      <p>Motivo del rechazo:</p>
      <p><em>${reason}</em></p>
      <p>Si tiene alguna duda o desea más información, no dude en ponerse en contacto con nosotros.</p>
      <p>Atentamente,</p>
      <p><strong>Municipalidad de Chonchi</strong></p>
    </div>
    <div class="footer">
      <p>Este es un mensaje automático, por favor no responda a este correo.</p>
      <p>&copy; 2024 Municipalidad de Chonchi. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
`
}