import { Link } from "react-router-dom"
import { MdNavigateNext } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

const Breadcrumbs = ({ breadcrumbs }) => {

    return (
        <div className="text-slate-600 flex flex-wrap gap-1 mt-6 text-sm">
            <Link className="flex items-center gap-1 font-medium hover:text-black" to="/"><IoMdHome /> Inicio</Link>
            {breadcrumbs?.map((item, index) => (
                <div key={index} className="flex items-center gap-1" >
                    <MdNavigateNext />
                    <Link className="hover:text-black whitespace-nowrap" to={item?.href}>{item?.label}</Link>
                </div>
            ))}
        </div>
    )
}

export default Breadcrumbs