import React, { useState, useContext } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { useMutation } from 'react-query';
import { userLogin } from '../../api/login';

export default function Login() {
  const [userContext, setUserContext] = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>{
      const { name, value } = e.target
      setUserData( prevData => ({
          ...prevData,
          [name]:value
      }));
  }

  const userLoginMutation = useMutation(userLogin, {
      onSuccess: (res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
        setUserContext( prev =>{
          return{ ...prev, 
              username : res.data.username,
              id : res.data.id,
              accessToken : res.data.accessToken,
          }
        })
        navigate("/homepage")
      },
      onError: (err) => {
        console.log(err);
        setError("帳號或密碼錯誤")
      }
  })

  const handleSubmit = (e) =>{
    e.preventDefault()
    userLoginMutation.mutate(userData)
  } 

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
          {/* <h1 className='text-white text-2xl font-press-start mt-2'>self-directed Learning</h1>  */}
        </div>
      </div>
      <div className=" bg-customgray w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-3xl font-bold mb-6">登入</h1>
            <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border-2 border-customgreen">
              <div className="flex items-center justify-center">
                  <span className="ml-4 ">Login with Wulab</span>
              </div>
            </button>
          <hr className="my-6 border-gray-300 w-full" />
          <form className="mt-6">
            <div>
              <label className="block text-gray-700 text-base">帳號</label>
              <input type="text" name="username" placeholder="帳號" onChange={handleChange} className=" text-base w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-base">密碼</label>
              <input type="password" name="password" placeholder="密碼" minLength="6" onChange={handleChange} className=" text-base w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
              {error && <span className=' text-xs text-red-600'>{error}</span>}
            </div>
            <button type="submit" onClick={handleSubmit} className="w-full block bg-violet-500 hover:bg-violet-400 focus:bg-violet-400 text-white font-semibold rounded-lgpx-4 py-3 mt-6 text-base">登入</button>
          </form>
          <p className="mt-8">
            Need an account? 
            <span className="text-blue-500 hover:text-blue-700 font-semibold">
              <Link to="/register">Create an account</Link> 
            </span>
          </p>
        </div>
      </div>
  </section>
  )
}
