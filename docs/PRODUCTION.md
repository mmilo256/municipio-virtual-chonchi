# Preparación para producción

Esta guía cubre el despliegue técnico. La aprobación legal, las credenciales definitivas y la
infraestructura deben ser validadas por responsables de la municipalidad.

## 1. Infraestructura mínima

- Node.js 20 LTS o superior, MySQL 8 y un proxy HTTPS como Nginx.
- Un usuario de sistema exclusivo, sin acceso interactivo, para ejecutar la API.
- Un usuario MySQL exclusivo. En operación necesita acceso a la base de la aplicación; las
  migraciones deben ejecutarse con una cuenta autorizada para modificar el esquema.
- Almacenamiento persistente y respaldado para `server/uploads` y `server/documents`.
- Certificados TLS válidos y renovación automática.

Los archivos de `deploy` son ejemplos y deben adaptarse a los dominios y rutas reales.

## 2. Variables

Parte desde `server/.env.example`, pero guarda la configuración real fuera del repositorio. En
producción son obligatorios:

- `NODE_ENV=production`, `COOKIE_SECURE=true`, `DB_SYNC=false` y `TRUST_PROXY=1` cuando exista un
  único proxy inverso.
- `CORS_ORIGINS` con los orígenes HTTPS exactos del portal y el panel, sin rutas ni comodines.
- `SESSION_SECRET` y `JWT_SECRET` diferentes, aleatorios y de al menos 32 caracteres.
- URLs públicas, callback de ClaveÚnica y credenciales SMTP correspondientes al dominio real.
- Credenciales MySQL y SMTP administradas mediante el almacén de secretos de la infraestructura.

Las variables `VITE_*` se incorporan al JavaScript durante la compilación y son públicas. Nunca
deben contener contraseñas o secretos.

## 3. Entrega

1. Ejecuta `npm ci` en la raíz y en cada una de las tres aplicaciones.
2. Ejecuta `npm run check` y `npm run audit`.
3. Crea y verifica un respaldo con `npm run db:backup`.
4. Ejecuta `npm run db:migrate` una sola vez antes de activar la nueva API.
5. Compila los frontends con las variables de producción mediante `npm run build`.
6. Publica `portal-web/dist` y `panel-administracion/dist` en el servidor web.
7. Reinicia la API y comprueba `/health/live` y `/health/ready`.
8. Realiza las pruebas de humo indicadas abajo antes de abrir el servicio al público.

Nunca actives `DB_SYNC` para sustituir migraciones.

## 4. Pruebas de humo

- Inicio y cierre de sesión de ClaveÚnica; expiración de sesión.
- Inicio y cierre de sesión del panel con un funcionario activo.
- Creación de una solicitud con y sin documentos.
- Consulta de solicitudes propias y rechazo al intentar consultar las de otro usuario.
- Corrección, aprobación y rechazo; verificación del historial.
- Descarga de documentos por su dueño y por un funcionario; rechazo para usuarios ajenos.
- Envío SMTP y comportamiento cuando SMTP no está disponible.
- Creación de respaldo y restauración en una base temporal, nunca directamente sobre producción.

## 5. Operación y recuperación

- Ejecuta respaldos automáticos de MySQL y de las carpetas de documentos. Cifra los respaldos,
  cópialos fuera del servidor y define su retención con la municipalidad.
- Prueba una restauración completa periódicamente. Un respaldo no probado no garantiza
  recuperación.
- Conserva logs JSON de la salida estándar en una plataforma con acceso restringido, rotación y
  alertas. No registres tokens, contraseñas, contenido de documentos ni RUN completos.
- Monitoriza `/health/live` para el proceso y `/health/ready` para proceso más base de datos.
- Alerta por errores 5xx, caídas, disco próximo a llenarse, fallas de respaldo y fallas SMTP.
- Para volver atrás, restaura la versión anterior del código. Si una migración cambió datos, usa
  un procedimiento de reversión probado o restaura el respaldo en una ventana controlada.

## 6. Controles organizacionales pendientes

Antes de abrir el servicio, la municipalidad debe definir responsable del sistema, contacto de
incidentes, tiempos de retención, política de privacidad, base jurídica del tratamiento, acceso a
datos personales, revisión de accesibilidad y procedimiento de eliminación o entrega de datos.
También debe confirmar con ClaveÚnica que callback, logout y credenciales estén habilitados para
los dominios definitivos.
