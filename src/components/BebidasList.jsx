import axios from "axios";
import useBebida from "../hooks/useBebida";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";

export const BebidasList = ({ bebidas, user, openModal }) => {
  const { deleteBebida } = useBebida();
  const token = localStorage.getItem('token');
  const toast = useRef(null);
  const [favoritas, setFavoritas] = useState({});
  

  useEffect(() => {
    const fetchFavorites = async () => {
      const url = `http://127.0.0.1:8000/api/bebidas/favoritas-usuario`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Creamos un mapa de favoritos basado en las bebidas recibidas
        const favoritesMap = bebidas.reduce((map, bebida) => {
          map[bebida.id] = data.favorites.includes(bebida.id);
          return map;
        }, {});
        setFavoritas(favoritesMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, [bebidas, token]);
  const addFavorite = async (id) => {
    const url = `http://127.0.0.1:8000/api/bebidas/${id}/favorita`;
    try {
        const {data} = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(data){
            toast.current.show({severity:'success', summary: 'Bebida favorita', detail: data.message, life: 2000});
            setFavoritas((prev) => ({ ...prev, [id]: true }));
        }
    } catch (error) {
        console.log(error);
    }
}
const removeFavorite = async (id) => {
  const url = `http://127.0.0.1:8000/api/bebidas/${id}/favorita`;
  try {
    const { data } = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (data) {
      setFavoritas((prev) => ({ ...prev, [id]: false }));
      toast.current.show({ severity: 'info', summary: 'Bebida eliminada de favoritas', detail: data.message, life: 3000 });
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Toast ref={toast} />
      {bebidas.map((bebida) => (
        <div
          key={bebida.id}
          className="bg-white shadow-lg rounded-lg transition-all hover:scale-125"
        >
          <img
            src={`http://127.0.0.1:8000/api/imagen/${bebida.imagen}`}
            alt={bebida.nombre}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{bebida.nombre}</h2>
            <p className="text-gray-600">{bebida.tipo}</p>
            {(bebida.user_id === user.id) &&
              <div className="flex justify-between">
                <button
                  className="bg-red-500 text-white p-1 mt-2 rounded-lg"
                  type="button"
                  onClick={() => deleteBebida(bebida.id)}
                >
                  Borrar
                </button>

                <button
                  className="bg-sky-500 text-white p-1 mt-2 rounded-lg"
                  type="button"
                  onClick={() => openModal(bebida)}
                >
                  Editar
                </button>
              </div>
            }
            <button
              className={`p-1 mt-2 rounded-lg w-full ${favoritas[bebida.id] ? 'bg-red-600' : 'bg-green-600'} text-white`}
              type="button"
              onClick={() => favoritas[bebida.id] ? removeFavorite(bebida.id) : addFavorite(bebida.id)}
            >
              {favoritas[bebida.id] ? 'Quitar de favoritas' : 'Añadir a favoritas'}
            </button>
          </div>
          <p className="text-gray-600 text-sm text-center">Creada por {bebida.user.name}</p>
        </div>
      ))}
    </div>
  );
};