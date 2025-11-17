const FormStepper = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isPending = index > currentStep;

        const circleClasses = [
          'w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold',
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
          <div className="flex items-center gap-4 w-72 text-sm md:text-base" key={step.id}>
            {/* <span className="flex font-medium text-sm items-center justify-center bg-secondary text-white w-8 h-8 rounded-full">
              {index + 1}
            </span> */}
            <span className={circleClasses}>{index + 1}</span>
            <div className="text-slate-600">
              <p className={titleClasses}>{step.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormStepper;
