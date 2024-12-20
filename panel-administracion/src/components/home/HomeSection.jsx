
const HomeSection = ({ title = "[TÍTULO]", children }) => {
    return (
        <section className="bg-[#fff] shadow p-4">
            <h2 className="font-bold text-xl">{title}</h2>
            <hr className="my-4" />
            {children}
        </section>
    )
}

export default HomeSection