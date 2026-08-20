# Municipio Virtual Chonchi

Plataforma para gestionar trámites municipales en línea. El repositorio contiene:

- `portal-web`: portal ciudadano (React + Vite), disponible localmente en `http://localhost:5173`.
- `panel-administracion`: panel de funcionarios (React + Vite), en `http://localhost:5174/admin`.
- `server`: API HTTP (Express + Sequelize + MySQL), en `http://localhost:10000`.

## Requisitos

- Node.js 20 LTS o superior y npm 10 o superior.
- MySQL 8 o superior.
- Credenciales de ClaveÚnica para probar el inicio de sesión ciudadano.
- Una cuenta SMTP para probar el envío de correos.

Comprueba las herramientas con `node --version` y `npm --version`.

## Instalación local

1. Instala todas las dependencias con `npm run install:all`.
2. Copia `server/.env.example`, `portal-web/.env.example` y
   `panel-administracion/.env.example` como `.env` dentro de cada directorio. No reemplaces un
   archivo `.env` existente.
3. Crea una base de datos MySQL y completa `server/.env`. Usa secretos propios; nunca confirmes
   archivos `.env` en Git.
4. Desde la raíz, ejecuta `npm run dev` para iniciar las tres aplicaciones.

También se pueden iniciar por separado con `npm run dev:server`, `npm run dev:portal` y
`npm run dev:admin`.

## Configuración

- `server/.env.example`: servidor, MySQL, SMTP, sesiones y ClaveÚnica.
- `portal-web/.env.example`: API, URL del portal y cierre de sesión de ClaveÚnica.
- `panel-administracion/.env.example`: API y URL base del servidor.

Las variables `VITE_*` son visibles en el navegador y nunca deben contener secretos.

## Comprobaciones

Ejecuta `npm run lint`, `npm run build` y `npm run check:format`. El backend requiere MySQL para
arrancar. ClaveÚnica y SMTP solo son necesarios para probar sus flujos correspondientes.

Por seguridad, el backend no modifica automáticamente el esquema de MySQL. `DB_SYNC=false` debe
mantenerse en los ambientes normales. `DB_SYNC=true` conserva temporalmente el comportamiento
antiguo para una base local desechable; nunca debe utilizarse en producción.

Los cambios de esquema se administran mediante migraciones numeradas en `server/migrations`. El
backend ejecuta solamente las migraciones pendientes al arrancar. También pueden ejecutarse de
forma explícita con `npm run db:migrate`. La tabla `schema_migrations` registra cuáles ya fueron
aplicadas.

`npm run check` ejecuta lint y compila ambos frontends. GitHub Actions realiza esta misma
comprobación automáticamente en cada push y pull request.

Con el backend iniciado, `GET http://localhost:10000/health` comprueba la disponibilidad de la API
y su conexión con MySQL.

La guía de despliegue, respaldos, monitoreo, recuperación y pruebas de humo está en
`docs/PRODUCTION.md`. Los archivos de `deploy` son ejemplos para Nginx y systemd; deben adaptarse a
la infraestructura real.

## Problemas frecuentes

- `Cannot find module ... npm-cli.js`: la instalación de npm está dañada. Reinstala Node.js LTS o
  corrige la ruta de npm antes de instalar dependencias.
- Error de CORS: agrega el origen exacto, sin ruta, a `CORS_ORIGINS` en `server/.env`.
- Error de conexión MySQL: verifica todas las variables `DB_*`.
- El panel abre sin recursos: debe visitarse bajo `/admin`, su prefijo de compilación.
