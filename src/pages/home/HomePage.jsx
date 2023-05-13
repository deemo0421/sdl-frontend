import React from 'react'
import TopBar from '../../components/TopBar';
import SideBar from '../../components/Sidebar';
import { FaSortDown } from "react-icons/fa";
import { BsBoxArrowInRight } from "react-icons/bs";

export default function HomePage({userInfo}) {

  return (
    <div  className='min-w-full min-h-screen h-screen overflow-hidden overflow-x-scroll'>
      <TopBar />
      <SideBar />
      <div className='flex flex-col my-5 pl-20 pr-5 sm:px-20 pt-16 w-full h-screen justify-start items-center'>
        <div className=' flex flex-row justify-between items-center w-full sm:w-2/3 mb-5'>
          <div className='flex'>
            <button className=" bg-customgreen hover:bg-customgreen/80 text-white font-semibold rounded-2xl p-1 mr-1 sm:px-4 sm:mr-4 sm:py-1 text-base">建立專案</button>
            <button className=" bg-customgreen hover:bg-customgreen/80 text-white font-semibold rounded-2xl p-1 sm:px-4 sm:py-1 text-base">加入專案</button>
          </div>
          <div className='flex'>
            <span className=' text-sm mr-3 font-bold cursor-pointer'>已開啟</span>
            <span className=' text-sm mr-3 font-bold cursor-pointer'>已開啟</span>
            <span className=' text-sm font-bold cursor-pointer'>日期</span>
            <FaSortDown size={15} className=' cursor-pointer'/>
          </div>
        </div>
        {/* item */}
        <div className=' rounded-lg border-2 w-full sm:w-2/3 h-1/4 bg-white'>
          <div className='flex flex-row  w-full h-full'>
            <div className='flex w-1/4 justify-center items-center text-lg'>ProjectName</div> 
            <div className='flex w-1/2 justify-center items-center text-lg'>ProjectDiscribe</div>
            <div className='flex w-1/4 justify-center items-center'>
                <BsBoxArrowInRight size={30} className=' cursor-pointer'/>
            </div> 
          </div>
        </div>
      </div> 
    </div>
  )
}

