import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import { IoBulbOutline } from 'react-icons/io5';
import { AiOutlineProject } from "react-icons/ai";
import { BsBezier2, BsChatText, BsJournalText } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import Modal from './Modal';


export default function SideBar() {
    const [open, setOpen] = useState(false);
    const [ chatroomModalOpen, setChatroomModalOpen ] = useState(false);
    const { projectId } = useParams();
    const menus = [
        { name: "專案", link: `/project/${projectId}/kanban`, icon: AiOutlineProject, margin:"true"},
        { name: "想法牆", link: `/project/${projectId}/ideaWall`, icon: IoBulbOutline },
        { name: "管理階段", link: `/project/${projectId}/managePhase`, icon: BsBezier2 },
        { name: "聊天室", icon: BsChatText},
        { name: "繳交任務", link: `/project/${projectId}/task`, icon: GrCompliance },
        { name: "撰寫日誌", link: `/project/${projectId}/reflection`, icon: BsJournalText },
    ]

    const handleOpenChatRoom = (menu) => {
        if(menu.name === "聊天室"){
            setChatroomModalOpen(true)
        }
    }

    return (
        <div className={` bg-[#FFF] fixed inset-y-0 left-0 min-h-screen duration-500 border-r-2 ${open ? "w-40" : "w-16"}`}>
            <div className='mt-2 py-3 pl-3 flex justify-start'>
                <FaBars size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
            </div>
            <div className='mt-4 flex flex-col gap-4 relative'>
            {
                projectId === undefined ? <></> :
                menus?.map((menu, i) => (
                <Link to={menu?.link} key={i} onClick={(menu)=>handleOpenChatRoom()} className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-3 hover:bg-slate-100 rounded-sm`}>
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
            <Modal open={chatroomModalOpen} onClose={() => setChatroomModalOpen(false)} opacity={true} position={"justify-center items-center"}> 
                <div className='flex flex-col p-3'>
                    <h3 className=' font-bold text-base mb-3'>專案邀請碼</h3>
                    <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3 " 
                        type="text" 
                        minLength="6"
                        placeholder="輸入專案邀請碼..."
                        name='referral_Code'
                        required
                        />
                </div>
            </Modal>
        </div>
    )
}
