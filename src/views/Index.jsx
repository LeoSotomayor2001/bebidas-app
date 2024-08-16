import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";

export const Index = () => {
  const [bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <Spinner/>
  }

  return (
    <div className="container m-auto ">
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
