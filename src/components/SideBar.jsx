import React, {useState} from 'react'
import {FaBars} from 'react-icons/fa'
import { IoBulbOutline } from 'react-icons/io5'
import { AiOutlineProject } from "react-icons/ai"
import { BsBezier2, BsChatText, BsJournalText } from "react-icons/bs"
import { GrCompliance } from "react-icons/gr"
import { Link } from 'react-router-dom'

export default function SideBar() {
    const [open, setOpen] = useState(false);
    const menus = [
        { name: "專案", link: "/", icon: AiOutlineProject, margin:"true"},
        { name: "想法牆", link: "/", icon: IoBulbOutline },
        { name: "管理階段", link: "/", icon: BsBezier2 },
        { name: "聊天室", link: "/", icon: BsChatText},
        { name: "繳交任務", link: "/", icon: GrCompliance },
        { name: "撰寫日誌", link: "/", icon: BsJournalText },
    ]
    return (
        <div className={` bg-[#FFF] fixed inset-y-0 left-0 min-h-screen duration-500 ${open ? "w-35" : "w-16"}`}>
            <div className='py-3 pl-3 flex justify-start'>
            <FaBars size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
            </div>
            <div className='mt-4 flex flex-col gap-4 relative'>
            {
                menus?.map((menu, i) => (
                <Link to={menu?.link} key={i} className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-3 hover:bg-slate-100 rounded-sm`}>
                    <div>{React.createElement(menu?.icon, { size: "26" })}</div>
                    <h2 style={{transitionDelay: `${i + 1}00ms`,}} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    {menu?.name}
                    </h2>
                    <h2 className= {`${ open && 'hidden'} absolute left-14 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg p-0 w-0  overflow-hidden group-hover:p-1  group-hover:w-fit`}>
                    {menu?.name}
                    </h2>
                </Link>
                ))
            }
            </div>    
        </div>
    )
}
