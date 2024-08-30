import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
export const AuthLayout = () => {
    const navigate=useNavigate();
    const token= localStorage.getItem('token');
    useEffect(() => {
      if(token){
        navigate('/')
      }
    }, [token,navigate])
    
  return (
    <main className='max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center'>
      <img
        src='../img/logo.jpeg'
        alt='logo'
        className='max-w-xs '
      />
      <div className='p-10 w-full'>
        
        <Outlet/>  
      </div>
    </main>
  )
}