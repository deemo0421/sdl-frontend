import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

export default function TopBar() {
  return (
    <div className='fixed  h-16 w-full pl-20 bg-[#FFFFFF] flex items-center justify-between pr-5 border-b-2'>
        <div className="flex pt-3 px-5 items-center font-bold">
        TopBar
        </div>
        <div className="flex items-center">
            <IoIosNotificationsOutline size={30}  className='cursor-pointer mr-3'/>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center text-center p-2 mr-3 shadow-xl text-xs overflow-hidden cursor-default">
                wuret
            </div>
            <h3 className="font-bold cursor-pointer p-1 mr-2 hover:bg-slate-100 rounded-lg">wuret</h3>
        </div>
    </div>
  )
}
