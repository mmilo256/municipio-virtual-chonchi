import { MdFirstPage } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdLastPage } from "react-icons/md";

const Pagination = () => {

    const buttonStyles = "bg-primary hover:bg-blue-700 text-white text-lg rounded p-1"

    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <button className="bg-primary hover:bg-slate-300 text-white text-lg rounded p-1"><MdFirstPage /></button>
            <button className={buttonStyles}><MdNavigateBefore /></button>
            <p>1 / 2</p>
            <button className={buttonStyles}><MdNavigateNext /></button>
            <button className={buttonStyles}><MdLastPage /></button>
        </div>
    )
}

export default Pagination