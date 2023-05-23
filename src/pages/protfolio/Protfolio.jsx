import React from 'react';AiTwotoneFolderAdd
import { AiTwotoneFolderAdd } from "react-icons/ai";
export default function Protfolio() {
    return (
        <div  className='min-w-full min-h-screen h-screen'>
            <div className='flex flex-col my-5 pl-20 pr-5 sm:px-20 py-16 w-full h-screen justify-start items-start'>
                <h3 className='text-lg font-bold mb-4'>歷程檔案</h3>
                    <div className=' flex flex-wrap justify-start items-center w-full mb-5'>
                    
                        <div className='flex mx-3'>
                            <button className="inline-flex items-center bg-white hover:bg-slate-200/80 text-slate-400 border-2 border-slate-200 font-semibold rounded-md p-1  mr-1 sm:px-4 text-base min-w-[100px]">
                            <AiTwotoneFolderAdd size={32} className=" text-black" /> <span>1-1 決定研究主題</span>
                            </button>
                        </div>
                        <div className='flex mx-3'>
                            <button className="inline-flex items-center bg-white hover:bg-slate-200/80 text-slate-400 border-2 border-slate-200 font-semibold rounded-md p-1  mr-1 sm:px-4 text-base min-w-[100px]">
                            <AiTwotoneFolderAdd size={32} className=" text-black" /> <span>1-2 決定研究題目</span>
                            </button>
                        </div>
                        <div className='flex mx-3'>
                            <button className="inline-flex items-center bg-white hover:bg-slate-200/80 text-slate-400 border-2 border-slate-200 font-semibold rounded-md p-1  mr-1 sm:px-4 text-base min-w-[100px]">
                            <AiTwotoneFolderAdd size={32} className=" text-black" /> <span>想法牆</span>
                            </button>
                        </div>
                        <div className='flex mx-3'>
                            <button className="inline-flex items-center bg-white hover:bg-slate-200/80 text-slate-400 border-2 border-slate-200 font-semibold rounded-md p-1  mr-1 sm:px-4 text-base min-w-[100px]">
                            <AiTwotoneFolderAdd size={32} className=" text-black" /> <span>反思日誌</span>
                            </button>
                        </div>
                        <div className='flex mx-3'>
                            <button className="inline-flex items-center bg-white hover:bg-slate-200/80 text-slate-400 border-2 border-slate-200 font-semibold rounded-md p-1  mr-1 sm:px-4 text-base min-w-[100px]">
                            <AiTwotoneFolderAdd size={32} className=" text-black" /> <span>專題階段流程</span>
                            </button>
                        </div>
                    </div>
            </div> 
        </div>
    )
}
