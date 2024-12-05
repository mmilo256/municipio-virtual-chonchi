const Button = ({ text, type = "button", variant, wFull = false }) => {

    // Color del botón
    let buttonVariant = ""
    switch (variant) {
        case "primary":
            buttonVariant = "bg-primary hover:bg-primaryHover"
            break;
        case "secondary":
            buttonVariant = "bg-secondary hover:bg-secondaryHover"
            break;
        default:
            break;
    }

    return (
        <button className={`block p-2 rounded ${wFull && "w-full"} text-white ${buttonVariant}`} type={type}>{text}</button>
    )
}

export default Button