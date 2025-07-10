import { useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"

const Accordion = ({ title, children, init = false }) => {

    const [open, setOpen] = useState(init)

    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className="mb-2">
            <button onClick={toggleOpen} className="bg-[#fff] hover:bg-sky-100 w-full shadow rounded-t text-left p-2 flex items-center gap-2">
                <span className={` transition-all ${open ? "rotate-0" : "-rotate-90"}`}><IoMdArrowDropdown size={20} /></span>
                <span className="font-black">{title}</span>
            </button>
            <div className={`bg-[#fff] ${open ? "p-2 h-auto" : "h-0"} shadow border-t rounded-b overflow-hidden`}>
                {children}
            </div>
        </div>
    )
}

export default Accordion