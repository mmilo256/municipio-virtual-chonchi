import { MdFirstPage } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdLastPage } from "react-icons/md";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {

    const buttonStyles = "bg-primary hover:bg-slate-600 text-white text-lg rounded p-1"

    const onFirstPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(1)
        }
    }

    const onPrevPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }
    const onNextPage = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const onLastPage = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(totalPages)
        }
    }

    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={onFirstPage} className={buttonStyles}><MdFirstPage /></button>
            <button onClick={onPrevPage} className={buttonStyles}><MdNavigateBefore /></button>
            <p>{currentPage} / {totalPages}</p>
            <button onClick={onNextPage} className={buttonStyles}><MdNavigateNext /></button>
            <button onClick={onLastPage} className={buttonStyles}><MdLastPage /></button>
        </div>
    )
}

export default Pagination