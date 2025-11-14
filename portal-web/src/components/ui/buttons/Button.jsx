import { NavLink } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

// Componente Button que puede ser un botón o un enlace estilizado
const Button = ({
  label,
  variant = 'primary',
  type = 'button',
  href,
  onClick,
  disabled,
  fullWidth,
  isLoading,
}) => {
  // Determina los estilos del botón según el tipo de variante
  let buttonStyles;
  switch (variant) {
    case 'primary':
      buttonStyles = `text-white shadow bg-primary hover:bg-primaryHover disabled:bg-primaryDisabled`;
      break;
    case 'secondary':
      buttonStyles = `text-white shadow bg-secondary hover:bg-secondaryHover disabled:bg-secondaryDisabled`;
      break;
    case 'primaryGhost':
      buttonStyles = `text-customBlack hover:bg-secondary/5 bg-none py-3 w-36 text-black`;
      break;
  }

  // Renderiza un enlace o un botón según el tipo especificado
  return type === 'link' ? (
    <NavLink
      disabled={disabled || isLoading}
      to={href}
      className={`transition-colors font-medium rounded disabled:cursor-not-allowed py-3 w-36 flex justify-center text-center ${fullWidth && 'w-full'} ${buttonStyles}`}
    >
      <span>{isLoading ? <FaSpinner /> : label}</span>
    </NavLink>
  ) : (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      className={`transition-colors font-medium rounded disabled:cursor-not-allowed py-3 w-36 flex justify-center text-center ${fullWidth && 'w-full'} ${buttonStyles}`}
    >
      <span>{isLoading ? <FaSpinner className="animate-spin" /> : label}</span>
    </button>
  );
};

export default Button;
