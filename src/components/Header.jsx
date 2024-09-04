import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useBebida from "../hooks/useBebida";
import axios from "axios";

export const Header = () => {
  const {BuscarBebidas}=useBebida();
  const navigate=useNavigate();
  const [nombre, setNombre] = useState()
  const user = JSON.parse(localStorage.getItem('user'));
  const token=localStorage.getItem('token');
  const handleChange = (e) => {
    setNombre(e.target.value);
};

  const handleClickSubmit=(e)=>{
    e.preventDefault()
    BuscarBebidas(nombre)
  }
  const logout=async()=>{

    
    try {
        const { data } = await axios.post('http://127.0.0.1:8000/api/logout', 
        { user }, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(error);
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/auth')
  }
  return (
    <header className="border-b border-gray-200 bg-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold mb-2 md:mb-0">Bebidas-APP</h1>
        <form className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2" onSubmit={handleClickSubmit}>
          <div className="flex flex-col md:flex-row w-full md:w-auto">
            <input
              type="text"
              id="nombre"
              placeholder="Buscar Bebida"
              name="nombre"
              className="border border-gray-300 rounded-md px-3 py-1 w-full md:w-auto"
              onChange={handleChange}
            />
            <button
              type="submit"
              
              className="bg-blue-600 text-white rounded-md px-3 py-1 mt-2 md:mt-0 md:ml-2"
            >
              Buscar
            </button>
          </div>
        </form>

        <nav className="text-lg mt-2 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
            <h2 className="font-bold text-xl">
              {user && user.name}
            </h2>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/crear"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                Crear Bebida
              </NavLink>
            </li>
            <li>
              <button type="button" className="text-red-500  hover:text-black" onClick={logout}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
