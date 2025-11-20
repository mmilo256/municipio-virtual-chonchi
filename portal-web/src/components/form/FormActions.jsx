import Button from '../ui/buttons/Button';

const FormActions = ({
  onPrev,
  onNext,
  isLastStep = false,
  prevLabel = 'Atrás',
  nextLabel = 'Siguiente',
  submitLabel = 'Enviar solicitud',
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="flex justify-end gap-4">
      <Button onClick={onPrev} label={prevLabel} variant="primaryGhost" />
      <Button
        isLoading={isLoading}
        onClick={isLastStep ? onSubmit : onNext}
        label={isLastStep ? submitLabel : nextLabel}
      />
    </div>
  );
};

export default FormActions;
