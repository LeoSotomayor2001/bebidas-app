import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import useBebida from "../hooks/useBebida";
import { useEffect } from "react";

export const Layout = () => {
  const navigate = useNavigate()
  const token= localStorage.getItem('token');
useEffect(()=>{
  if(!token){
    navigate("/auth")
  }
}, [token, navigate])


  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </main>
      <footer className="w-full text-center py-4 bg-gray-100">
        <p className="text-2xl font-bold">Leodomi Sotomayor</p>
      </footer>
    </div>
  );
};

