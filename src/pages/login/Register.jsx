import React, {useState} from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { userRegister } from '../../api/login';

export default function Login() {
    const [userData, setUserData] = useState({role:"student"});
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const handleChange = e =>{
        const { name, value } = e.target
        setUserData( prev => ({
            ...prev,
            [name]:value
        }));
    }

    const validateInput = e =>{
        const { value } = e.target
        if (!userData.confirmPassword){
            setError("請確認密碼")
        } else if  (userData.confirmPassword !== value){
            setError("密碼不相符")
        }else{
            setError("")
        };
    };

    const userRegisterMutation = useMutation(userRegister,{
        onSuccess: (res) => {
            console.log(res);
            navigate("/homepage");
            setUserInfo(res.data)
        },
        onError: (err) => {
            console.log(err);
            setError("帳號或密碼錯誤")
        }
    });

    const handleSubmit = (e) =>{
        e.preventDefault()
        userRegisterMutation.mutate(userData)
    };
    
    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="hidden bg-violet-700 w-full md:w-1/2 xl:w-2/3 h-screen md:flex md:items-center md:justify-center">
                <div className='flex flex-col'>
                <h1 className='mx-auto text-white text-7xl mb-2'>自主學習</h1>
                <TypeAnimation
                    className='text-white text-2xl font-press-start mt-2'
                    sequence={[
                        'self-directed Learning', 
                        2000,
                        'science inquery',
                        2000, 
                        'NCU Wulab',
                        2000,
                    ]}
                    speed={40}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    />     
                </div>
            </div>
        <div className=" bg-customgray w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
            <div className="w-full h-100">
                <h1 className="text-xl font-bold mb-6">註冊</h1>
                <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border-2 border-customgreen">
                    <div className="flex items-center justify-center">
                        <span className="ml-4 ">Create your Wulab Account</span>
                    </div>
                </button>
                <hr className="my-6 border-gray-300 w-full" />
                <form className="mt-6">
                <div>
                    <label className="block text-gray-700 text-base">帳號</label>
                    <input type="text" name="username" placeholder="帳號" onChange={handleChange} className=" text-base w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
                </div>
                <div>
                    <label className="block text-gray-700 text-base">密碼</label>
                    <input type="password" name="password" placeholder="帳號" minLength="6" onChange={handleChange} className=" text-base w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
                </div>
                <div>
                    <label className="block text-gray-700 text-base">確認密碼</label>
                    <input type="password" name="confirmPassword" placeholder="帳號" minLength="6" onChange={handleChange} onBlur={validateInput} className=" text-base w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
                    {error && <span className=' text-xs text-red-600'>{error}</span>}
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-base">學生</label>
                    <select name="role" onChange={handleChange} className=" text-base w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required>
                        <option value="student">學生</option>
                        <option value="teacher">教師</option>
                    </select>
                </div>
                
                <button type="submit" onClick={handleSubmit} className="w-full block bg-violet-500 hover:bg-violet-400 focus:bg-violet-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 text-base">註冊</button>
                </form>
                <p className="mt-8">
                Have an account? 
                <span className="text-blue-500 hover:text-blue-700 font-semibold">
                    <Link to="/">Login</Link> 
                </span>
                </p>
            </div>
        </div>
    </section>
    )
}
