import React, {useState} from 'react';
import { useMutation } from 'react-query';
import { submitTask } from '../../api/task';
import { useNavigate , useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Task() {
    const subtage1 = {
        title:"提出研究主題",
        input1:"研究主題",
        input2:"研究原因"
    }; 
    const subtage2 ={
        title:"提出研究題目",
        input1:"提議題目",
        input2:"提議原因"
    };
    const [ taskData, setTaskData ] = useState({});
    const [ attachFile, setAttachFile ] = useState(null);
    const navigate = useNavigate();
    const {projectId} = useParams();

    const {mutate} = useMutation( submitTask, {
        onSuccess : ( res ) =>{
            console.log(res);
            sucesssNotify(res.message)
            localStorage.setItem("mainstage","1-2")
            navigate(`/project/${projectId}/kanban`)
        },
        onError : (error) =>{
            console.log(error);
            errorNotify(error.response.data.message)
        }
    })
    const handleChange = e =>{
        const { name, value } = e.target;
        setTaskData( prev => ({
        ...prev,
        [name]:value, 
        }));
    }
    const handleAddFileChange = e =>{
        setAttachFile(e.target.files); 
    }

    const handleSubmit = e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('projectId',projectId);
        formData.append('stage',localStorage.getItem('mainstage'));
        if(attachFile){
            for (let i = 0; i < attachFile.length; i++){
                formData.append("attachFile", attachFile[i])
            }
        }
        for(let key in taskData){
            formData.append(key, taskData[key]);
        }
        console.log(...formData);
        mutate(formData);
    }
    const errorNotify = (toastContent) => toast.error(toastContent);
    const sucesssNotify = (toastContent) => toast.success(toastContent);

    return (
        <div className='flex flex-col my-5 pl-20 pr-5 sm:px-20 py-16 w-full h-screen justify-center items-center'>
            <div className='flex flex-col w-1/3 p-3 bg-white border-2 border-gray-200 rounded-lg'>
                <h3 className=' font-bold text-xl text-center mb-3'>
                {
                    localStorage.getItem("mainstage") === "1-2" ? subtage2.title : subtage1.title
                }
                </h3>
                <p className=' font-bold text-base mb-3'>
                {
                    localStorage.getItem("mainstage") === "1-2" ? subtage2.input1 : subtage1.input1
                }
                </p>
                <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3" 
                    type="text" 
                    placeholder="主題"
                    name='title'
                    onChange={handleChange}
                    />
                <p className=' font-bold text-base mb-3'>附加檔案</p>
                <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3" 
                    type="file" 
                    placeholder="上傳檔案"
                    name='filename'
                    onChange={handleAddFileChange}
                    multiple
                    />
                <p className=' font-bold text-base mb-3'>
                {
                    localStorage.getItem("mainstage") === "1-2" ? subtage2.input2 : subtage1.input2
                }    
                </p>
                <textarea className=" rounded outline-none ring-2 ring-customgreen w-full p-1" 
                    rows={3} 
                    placeholder="輸入原因" 
                    name='content'
                    onChange={handleChange}
                    /> 
                <div className='flex justify-end m-2'>
                    <button onClick={ e => {handleSubmit(e)}}   
                    className="mx-auto w-full h-7 my-3 bg-customgreen rounded font-bold text-xs sm:text-sm text-white">
                        上傳
                    </button>
                </div> 
            </div>   
            <Toaster />
        </div> 
    )
}
