import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <form className="border border-gray-200 p-6 mx-auto md:w-2/3 lg:w-3/4 shadow-xl rounded-xl bg-white">
      <h1 className="text-3xl font-bold text-center">Crear Cuenta</h1>
      <div className="my-5">
        <FloatLabel>
          <InputText id="nombre" name="nombre" className="w-full" />
          <label htmlFor="nombre">Nombre</label>
        </FloatLabel>
      </div>
      <div className="my-5">
        <FloatLabel>
          <InputText id="email" name="email" className="w-full" type="email" />
          <label htmlFor="email">Email</label>
        </FloatLabel>
      </div>
      <div className="my-5">
        <FloatLabel>
          <InputText
            id="password"
            name="password"
            className="w-full"
            type="password"
          />
          <label htmlFor="password">Contraseña</label>
        </FloatLabel>
      </div>

      <div className="my-5">
        <FloatLabel>
          <InputText
            id="password_confirmation"
            name="password_confirmation"
            className="w-full"
            type="password"
          />
          <label htmlFor="password_confirmation">Repetir Contraseña</label>
        </FloatLabel>
      </div>

      <div className="my-5 ">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-3 p-2 "
        >
          Registrarse
        </button>
      </div>
      <div className="my-5">
        <Link to={"/auth/login"} className="text-blue-600 text-sm">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </div>
    </form>
  );
};
