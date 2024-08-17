import { useEffect, useRef, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
export const Index = () => {
  const [bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const mostrarBebidas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bebidas");
      const data = await response.json();
      const { bebidas } = data;
      setBebidas(bebidas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    mostrarBebidas();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  const deleteBebida = async (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          console.log(data)
          toast.current.show({
            severity: "success",
            summary: "Bebida Eliminada",
            life: 3000,
          })
          setTimeout(() => {
            
            mostrarBebidas();
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      }
    })
   
  };

  return (
    <div className="container m-auto ">
      <Toast ref={toast} />
      <h1 className="text-center text-3xl my-2">Lista de bebidas</h1>
      {bebidas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {bebidas.map((bebida) => (
            <div
              key={bebida.id}
              className="bg-white shadow-lg rounded-lg transition-all hover:scale-125"
            >
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${bebida.imagen}`}
                alt={bebida.nombre}
                className="w-full h-48 object-cover "
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{bebida.nombre}</h2>
                <p className="text-gray-600">{bebida.tipo}</p>
                <button
                  className="bg-red-500 text-white p-1 mt-2 rounded-lg"
                  type="button"
                  onClick={() => deleteBebida(bebida.id)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl font-bold text-gray-700">
          No hay bebidas disponibles
        </p>
      )}
    </div>
  );
};
