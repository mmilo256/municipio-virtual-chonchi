import { FaSpinner } from "react-icons/fa";

const Button = ({ isLoading, text, type = "button", variant, wFull = false, onClick, isValid = true }) => {

    // Color del botón
    let buttonVariant = ""
    switch (variant) {
        case "primary":
            buttonVariant = "bg-primary hover:bg-primaryHover text-white"
            break;
        case "secondary":
            buttonVariant = "bg-secondary hover:bg-secondaryHover disabled:bg-secondaryDisabled text-white"
            break;
        case "tertiary":
            buttonVariant = "bg-[#fff] text-black hover:bg-[#eee]"
            break;
        default:
            break;
    }

    return (
        <button onClick={onClick} className={`block ${isLoading && "cursor-wait"} flex justify-center p-2 rounded ${wFull && "w-full"} ${buttonVariant}`} disabled={isLoading || !isValid} type={type}>{isLoading ? <FaSpinner className="animate-spin" /> : text}</button>
    )
}

export default Button