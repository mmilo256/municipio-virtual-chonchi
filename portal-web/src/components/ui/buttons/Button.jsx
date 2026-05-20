import { FaSpinner } from 'react-icons/fa';

// Componente Button que puede ser un botón o un enlace estilizado
const Button = ({
  label,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  fullWidth,
  isLoading,
}) => {
  // Determina los estilos del botón según el tipo de variante
  let buttonStyles;
  switch (variant) {
    case 'primary':
      buttonStyles = `text-white shadow bg-orange-600 hover:bg-orange-500 disabled:bg-primaryDisabled`;
      break;
    case 'secondary':
      buttonStyles = `text-white shadow bg-sky-900 hover:bg-sky-700 disabled:bg-secondaryDisabled`;
      break;
    case 'primaryGhost':
      buttonStyles = `text-customBlack hover:bg-secondary/5 bg-none py-3 w-36 text-black`;
      break;
  }

  // Renderiza un enlace o un botón según el tipo especificado
  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      className={`text-base transition-colors font-medium rounded disabled:cursor-not-allowed py-3 w-36 flex justify-center text-center ${fullWidth && 'w-full'} ${buttonStyles}`}
    >
      <span>{isLoading ? <FaSpinner className="animate-spin" /> : label}</span>
    </button>
  );
};

export default Button;
