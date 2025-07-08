import { Link } from "react-router-dom";

const Card = ({ title, desc, href, icon, direccion }) => {

    return (
        <Link to={href} className="relative shadow hover:-translate-y-1 shadow-slate-600 group p-5 text-center bg-white hover:text-white transition-all duration-300 hover:bg-secondary group">
            <div className="flex justify-center transition-all group-hover:text-white text-slate-500">{icon}</div>
            <p className="group-hover:text-white transition-all text-primary text-xl font-semibold mb-1 mt-1">{title}</p>
            <p className="group-hover:text-white transition-all text-slate-600 mb-3">{desc}</p>
            <span className="absolute -top-3 -right-3 text-xs bg-blue-600 font-bold text-white rounded-full px-2 py-1">{direccion}</span>
        </Link>
    );
};

export default Card;
