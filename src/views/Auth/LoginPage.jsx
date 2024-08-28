import axios from "axios";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import useBebida from "../../hooks/useBebida";


export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const { setIsValidUser } = useBebida()
  const toast = useRef(null);
  const navigate=useNavigate()
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    try {
      const {data} = await axios.post(
        'http://127.0.0.1:8000/api/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(data){
        setIsValidUser(true)
        toast.current.show({severity:'success', summary: 'Iniciando sesión', detail: data.message, life: 3000});
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      
    } catch (error) {
      setErrors(error.response.data)
      if(error.response.data.errors){
        setErrors(error.response.data.errors)
      }
      setTimeout(() => {
        setErrors([])
      }, 2000);
    }

  }
  
  return (
    <form className="border border-gray-200 p-6 mx-auto md:w-2/3 lg:w-3/4 shadow-xl rounded-xl bg-white" onSubmit={onSubmit}>
      <Toast ref={toast} />
      <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>
      {errors && <p className="text-red-500">{errors[0]}</p>}
      <div className="my-5">
        <FloatLabel>
          <InputText id="email" name="email" className="w-full" type="email" value={email} onChange={onChange}/>
          <label htmlFor="email">Email</label>
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </FloatLabel>
      </div>
      <div className="my-5">
        <FloatLabel className="w-full">
          <InputText id="password" name="password" className="w-full" type="password" value={password} onChange={onChange} />
          <label htmlFor="password">Contraseña</label>
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
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
