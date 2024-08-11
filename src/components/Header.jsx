import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold mb-2 md:mb-0">Bebidas-APP</h1>
        <form className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <div className="flex flex-col md:flex-row w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar Bebida"
              className="border border-gray-300 rounded-md px-3 py-1 w-full md:w-auto"
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
          </ul>
        </nav>
      </div>
    </header>
  );
};
