import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [errors, setErrors] = useState([])
  const toast = useRef(null);
  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'password_confirmation') setPassword_confirmation(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // TODO: Crear cuenta
    try {
      const {data} = await axios.post(
        'http://127.0.0.1:8000/api/register',
        {
          name,
          email,
          password,
          password_confirmation,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if(data){
        toast.current.show({severity:'success', summary: 'Cuenta creada', detail: data.message, life: 3000});
        setName('');
        setEmail('');
        setPassword('');
        setPassword_confirmation('');
        localStorage.setItem('token',data.token);
        localStorage.setItem('user',JSON.stringify(data.user))
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setErrors(error.response.data); 
      setTimeout(() => {
        setErrors([]);

      }, 2000);
    }
  };
  
  return (
    <form
      className="border border-gray-200 p-6 mx-auto md:w-2/3 lg:w-3/4 shadow-xl rounded-xl bg-white"
      onSubmit={onSubmit}
    >
      <Toast ref={toast} />
      <h1 className="text-3xl font-bold text-center">Crear Cuenta</h1>
      <div className="my-5">
        <FloatLabel>
          <InputText
            id="name"
            name="name"
            className="w-full"
            value={name}
            onChange={onChange}
          />
          <label htmlFor="name">Nombre</label>
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </FloatLabel>
      </div>
      <div className="my-5">
        <FloatLabel>
          <InputText
            id="email"
            name="email"
            className="w-full"
            type="email"
            value={email}
            onChange={onChange}
          />
          <label htmlFor="email">Email</label>
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </FloatLabel>
      </div>
      <div className="my-5">
        <FloatLabel>
          <InputText
            id="password"
            name="password"
            className="w-full"
            type="password"
            value={password}
            onChange={onChange}
          />
          <label htmlFor="password">Contraseña</label>
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
        </FloatLabel>
      </div>
      <div className="my-5">
        <FloatLabel>
          <InputText
            id="password_confirmation"
            name="password_confirmation"
            className="w-full"
            type="password"
            value={password_confirmation}
            onChange={onChange}
          />
          <label htmlFor="password_confirmation">Repetir Contraseña</label>
          {errors.password_confirmation && (
            <p className="text-red-500">
              {errors.password_confirmation[0]}
            </p>
          )}
        </FloatLabel>
      </div>
      <div className="my-5 ">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-3 p-2 w-full"
        >
          Registrarse
        </button>
      </div>
      <div className="my-5">
        <Link to="/auth/" className="text-blue-600 text-sm">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </div>
    </form>
  );
};
