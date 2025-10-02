// src/components/Heading.jsx
const Heading = ({ children, level = 1, className, darkMode }) => {
    const Tag = `h${level}`; // Determina la etiqueta (h1, h2, etc.) según el nivel


    let size
    switch (level) {
        case 1:
            size = "text-3xl md:text-4xl my-4"
            break;
        case 2:
            size = "text-2xl md:text-3xl my-3"
            break;
        case 3:
            size = "text-xl md:text-2xl my-2"
            break;
        case 4:
            size = "text-lg md:text-xl my-1"
            break;
        default:
            break;
    }

    return (
        <Tag className={`font-semibold ${darkMode ? "text-white" : "text-primary"} ${size} ${className}`}>
            {children}
        </Tag>
    );
};

export default Heading;
