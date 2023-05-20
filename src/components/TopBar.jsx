import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

export default function TopBar() {
  return (
    <div className='fixed  h-16 w-full pl-20 bg-[#FFFFFF] flex items-center justify-between pr-5 border-b-2'>
        <div className="flex px-5 items-center font-bold font-Mulish text-2xl">
        sdls
        </div>
        <div className="flex items-center">
            <IoIosNotificationsOutline size={30}  className='cursor-pointer mr-3'/>
            <h3 className="font-bold cursor-pointer p-1 mr-2 hover:bg-slate-100 rounded-lg">
              {localStorage.getItem("username")}
            </h3>
        </div>
    </div>
  )
}
