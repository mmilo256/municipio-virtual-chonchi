const FormStepper = ({ steps, currentStep = 0 }) => {
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

        return (
          <div className="flex items-center gap-4" key={step.id}>
            {/* <span className="flex font-medium text-sm items-center justify-center bg-secondary text-white w-8 h-8 rounded-full">
              {index + 1}
            </span> */}
            <span className={circleClasses}>{index + 1}</span>
            <div className="text-slate-600">
              <p className="text-sm font-medium">{step.label}</p>
              <p className="text-xs font-light">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormStepper;
