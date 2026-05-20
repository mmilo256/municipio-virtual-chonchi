const FormStepper = ({ className, pasos = [{ id: 1, label: 'label' }], pasoActual = 0 }) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {pasos.map((paso, index) => {
        const isActive = index === pasoActual;
        const isCompleted = index < pasoActual;

        const circleClasses = [
          'w-8 min-w-8 h-8 min-h-8 flex items-center justify-center rounded-full text-sm font-semibold',
          isCompleted
            ? 'bg-[#0083F5] text-white' // azul
            : isActive
              ? 'bg-[#FF600A] text-white' // naranjo
              : 'bg-gray-200 text-gray-600', // pendiente
        ].join(' ');

        const titleClasses = [
          '',
          isCompleted
            ? 'font-medium' // azul
            : isActive
              ? 'font-black' // naranjo
              : 'font-light', // pendiente
        ].join(' ');

        return (
          <div className="flex gap-4 w-72 text-sm md:text-base items-center" key={paso.id}>
            <span className={circleClasses}>{index + 1}</span>
            <div className="text-slate-600">
              <p className={titleClasses}>{paso.titulo}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormStepper;
