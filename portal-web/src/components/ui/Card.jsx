import { Link } from "react-router-dom";

const Card = ({ title, desc, href, direccion }) => {

    return (
        <Link to={href} className="relative flex flex-col gap-4 shadow hover:-translate-y-0.5 p-5 shadow-slate-600 group text-center bg-white hover:text-white transition-all duration-300 hover:bg-secondary group">
            <p className="group-hover:text-white transition-all h-8 flex items-center justify-center text-primary text-xl font-semibold">{title}</p>
            <p className="group-hover:text-white transition-all h-8 flex items-center justify-center text-slate-600">{desc}</p>
            <span className="absolute -top-1 -left-1 text-xs bg-blue-600 font-bold text-white rounded-full px-2 py-1">{direccion}</span>
        </Link>
    );
};

export default Card;
