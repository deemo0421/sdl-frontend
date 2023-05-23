import React from 'react'

export default function Task() {
    return (
        <div className='flex flex-col my-5 pl-20 pr-5 sm:px-20 py-16 w-full h-screen justify-center items-center'>
            <div className='flex flex-col w-1/3 p-3 bg-white border-2 border-gray-200 rounded-lg'>
                <h3 className=' font-bold text-base mb-3'>新增研究主題</h3>
                <p className=' font-bold text-base mb-3'>研究主題</p>
                <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3" 
                    type="text" 
                    placeholder="標題"
                    name='title'
                    />
                <p className=' font-bold text-base mb-3'>附加檔案</p>
                <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3" 
                    type="file" 
                    placeholder="上傳檔案"
                    name='title'
                    />
                <p className=' font-bold text-base mb-3'>研究員因</p>
                <textarea className=" rounded outline-none ring-2 ring-customgreen w-full p-1" 
                    rows={3} 
                    placeholder="輸入原因" 
                    name='content'
                    /> 
                <div className='flex justify-end m-2'>
                    <button  className="mx-auto w-full h-7 my-3 bg-customgreen rounded font-bold text-xs sm:text-sm text-white">
                        上傳
                    </button>
                </div> 
            </div>   
        </div> 
    )
}
