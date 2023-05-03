import React from 'react'

export default function TaskHint() {
    return (
        <div className='bg-gray-100 p-3 rounded-md shadow-md flex flex-col overflow-auto w-full h-fit max-h-[80vh]'>
            <h4 className=' flex mb-2 justify-center text-xl text-gray-600'>
                1-1決定研究主題
            </h4>
            <span className='flex text-lg'>任務說明</span>
            <span className=' text-md my-3 text-base leading-6 '>在 1-1 的階段中，提出你感興趣的主題，並提供完整資訊分享給通組的夥伴，並在與小組討論完後，在右方進行編輯後，繳交上傳。</span>
        </div>
    )
}
