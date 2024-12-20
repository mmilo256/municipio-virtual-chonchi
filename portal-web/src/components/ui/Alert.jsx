import { useEffect } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

const Alert = ({ variant, text, visible, setVisible }) => {

    let buttonStyles = ""
    let icon

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setVisible(false)
            }, 10000);
        }
    })

    switch (variant) {
        case "warning":
            buttonStyles = "border-orange-600 bg-orange-50"
            icon = <IoAlertCircleOutline className="text-3xl text-orange-600" />
            break;
        case "success":
            buttonStyles = "border-green-600 bg-green-50"
            icon = <FaRegCheckCircle className="text-3xl text-green-600" />
            break;
        default:
            buttonStyles = "border-slate-400 bg-slate-50"
            break;
    };

    const onClose = () => {
        setVisible(false)
    }

    return (
        visible && <div className={`shadow-lg border fixed right-10 top-10 pl-2 pr-8 py-3 ${buttonStyles}`}>
            <div className="flex items-center gap-2">
                {icon}
                <p className="text-slate-900">{text}</p>
            </div>
            <button onClick={onClose} className="absolute right-1 top-0 text-2xl">&times;</button>
        </div>
    )
}

export default Alert