const Button = ({ isLoading, text, type = "button", variant, wFull = false, onClick }) => {

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
        <button onClick={onClick} className={`block ${isLoading && "cursor-wait"} p-2 rounded ${wFull && "w-full"} ${buttonVariant}`} disabled={isLoading} type={type}>{text}</button>
    )
}

export default Button