const validateStep = ({ stepIndex, values }) => {
  const errors = {};

  if (stepIndex === 0) {
    if (!values.name) errors.name = 'Este campo es obligatorio';
  }

  return errors;
};

export default validateStep;
