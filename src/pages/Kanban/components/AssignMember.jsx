import React, { useState, useEffect } from 'react'

export default function AssignMember({menberData}) {
    const [menberDatas, setMenberDatas] = useState([]);
    useEffect(() => {
        setMenberDatas(menberData)
    },[])

    const handleChangeCheckBox = (e) => {
        const {name, checked} = e.target;
        if(name ==="allSelect"){
            let tempMenber = menberDatas.map((menber) =>{
                return {...menber, isChecked: checked};
            });
            setMenberDatas(tempMenber);
        } else{
            let tempMenber = menberDatas.map((menber) =>
                menber.name === name ? {...menber, isChecked: checked} : menber
            )
            setMenberDatas(tempMenber);
        }  
    };

    return (
        <>
            <div className='flex flex-row  justify-between bg-customgray w-full p-2 mt-2'>
                <div className='text-base'>全部成員</div>
                <input 
                    type="checkbox" 
                    className="w-4 h-4 m-1 bg-gray-100 border-gray-300 rounded checked:bg-blue-500"
                    name='allSelect'
                    onChange={handleChangeCheckBox}
                    />
            </div>
            <h4 className='font-bold mt-2 mb-2'>專案成員</h4>
            {
                menberDatas.map((member, index) => {
                    return(
                        <div key={index} className='flex flex-row  justify-between bg-customgray w-full p-2 mb-2'>
                            <div className=' text-base'>{member.name}</div>
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 m-1 bg-gray-100 border-gray-300 rounded checked:bg-blue-500" 
                                name={member.name}
                                checked={member?.isChecked || false}
                                onChange={handleChangeCheckBox}
                                />
                        </div>
                    )
                })
            }
        </>
        
    )
}
