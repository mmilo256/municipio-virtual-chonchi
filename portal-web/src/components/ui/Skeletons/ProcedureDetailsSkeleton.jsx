const ProcedureDetailsSkeleton = () => {
    return (
        <Container className="text-sm">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="mb-4">
                <h1 className="text-center md:text-left p-0 h-18 text-2xl md:text-2xl"></h1>
            </div>
            <div className="block md:hidden mb-2">
                <Button href="formulario" type="link" variant="secondary" fullWidth>Iniciar trámite</Button>
            </div>
            <div className="grid md:grid-cols-9 gap-5 text-slate-700">
                <main className="md:col-span-6 pr-10">
                    <article className="mb-4">
                        <h1 >Descripción</h1>
                        <p className="text-justify">{procedure?.descripcion}</p>
                    </article>
                    <article className="mb-4">
                        <h1 >Requisitos</h1>
                        <p className="text-justify">{procedure?.requisitos}</p>
                    </article>
                    <article className="mb-4">
                        <h1 >Costo</h1>
                        <p>{procedure?.costo || "No tiene costo"}</p>
                    </article>
                    {procedure?.costo !== 0 && <article className="mb-4">
                        <h1 >Modalidad de pago</h1>
                        <p>{procedure?.modaldad_pago}</p>
                    </article>}
                </main>
                <div className="md:col-span-3 max-h-min shadow-lg rounded p-5 shadow-slate-400">
                    <h1 align="center" >Contacto y atención</h1>
                    <h1 >Dirección</h1>
                    <p className="break-words">{procedure?.direccion}</p>
                    <h1 >Horario de atención</h1>
                    <p className="break-words">{procedure?.horario_atencion}</p>
                    <h1 >Correo electrónico</h1>
                    <p className="break-words">{procedure?.email}</p>
                    <h1 >Teléfono(s)</h1>
                    <p className="break-words">{procedure?.telefono}</p>
                    <div className="mt-4 hidden md:block">
                        <Button href="formulario" type="link" variant="secondary" fullWidth>Iniciar trámite</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProcedureDetailsSkeleton