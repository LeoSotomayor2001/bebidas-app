import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault()

  }
  return (
    <form className="border border-gray-200 p-6 mx-auto md:w-2/3 lg:w-3/4 shadow-xl rounded-xl bg-white" onSubmit={onSubmit}>

      <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>
      <div className="my-5">
        <FloatLabel>
          <InputText id="email" name="email" className="w-full" type="email" value={email} onChange={onChange}/>
          <label htmlFor="email">Email</label>
        </FloatLabel>
      </div>
      <div className="my-5">
        <FloatLabel className="w-full">
          <InputText id="password" name="password" className="w-full" type="password" value={password} onChange={onChange} />
          <label htmlFor="password">Contraseña</label>
        </FloatLabel>
      </div>
      
      <div className="my-5">
      <button type="submit" className="bg-blue-600 text-white rounded-lg px-3 p-2 w-full">
            Iniciar Sesión
      </button>
      </div>

      <div className="my-5 ">
        <Link to={"/auth/registro"} className="text-blue-600 text-sm">
            ¿No tienes una cuenta? Crea una
        </Link>
      </div>
     
    </form>
  );
};
