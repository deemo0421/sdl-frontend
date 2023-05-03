import React from 'react'
import { GrFormClose } from "react-icons/gr"

export default function Modal({ open, onClose, opacity, position, children }) {
    return (
    <div className={` fixed inset-0 flex transition-colors ${open ? "visible" : "invisible"} ${opacity ? "bg-black/50" : ""} ${position}`}>
        {/* modal */}
        <div onClick={(e) => e.stopPropagation()} className={` bg-white rounded-xl shadow p-4 transition-all duration-300 w-3/4 sm:w-1/3 ${open ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} >
            {/* <button onClick={onClose} className=' absolute top-2 right-2 rounded-lg bg-white hover:bg-slate-200'>
                <GrFormClose  className=' w-6 h-6'/>
            </button> */}
            {children}
        </div>
    </div>
    )
}
