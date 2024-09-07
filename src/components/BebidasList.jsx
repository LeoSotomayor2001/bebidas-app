import useBebida from "../hooks/useBebida";

export const BebidasList = ({ bebidas, user,openModal }) => {
    const { deleteBebida } = useBebida();
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
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
            </div>
            <p className="text-gray-600 text-sm text-center">Creada por {bebida.user.name}</p>
          </div>
        ))}
      </div>
    );
  };