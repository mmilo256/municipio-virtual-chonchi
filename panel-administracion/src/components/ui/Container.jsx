const Container = ({ children, className }) => {
    return (
        <div className={`w-full max-w-[98%] mx-auto ${className}`}>{children}</div>
    )
}

export default Container