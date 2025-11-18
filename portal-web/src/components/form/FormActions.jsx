import Button from '../ui/buttons/Button';

const FormActions = ({
  onPrev,
  onNext,
  isFirstStep = false,
  isLastStep = false,
  isSubmitting = false,
  prevLabel = 'Atrás',
  nextLabel = 'Siguiente',
  submitLabel = 'Enviar solicitud',
  onSubmit,
}) => {
  return (
    <div className="flex justify-end gap-4">
      <Button onClick={onPrev} label={prevLabel} variant="primaryGhost" />
      <Button
        onClick={isLastStep ? onSubmit : onNext}
        label={isLastStep ? submitLabel : nextLabel}
      />
    </div>
  );
};

export default FormActions;
