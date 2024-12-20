import { useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"

const Accordion = ({ title, children }) => {

    const [open, setOpen] = useState("false")

    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <button onClick={toggleOpen} className="bg-slate-50 hover:bg-sky-100 w-full shadow rounded-t text-left p-2 flex items-center gap-2">
                <span className={` transition-all ${open ? "rotate-0" : "-rotate-90"}`}><IoMdArrowDropdown size={20} /></span>
                <span className="font-black">{title}</span>
            </button>
            <div className={`bg-[#fff] ${open ? "p-2 h-auto" : "h-0"} shadow mb-4 border-t rounded-b overflow-hidden`}>
                {children}
            </div>
        </>
    )
}

export default Accordion