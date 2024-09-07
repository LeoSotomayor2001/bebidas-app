import { useEffect, useRef, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import { ModalEditarBebida } from "../components/ModalEditarBebida";
import { Formulario } from "./Formulario";
import useBebida from "../hooks/useBebida";

export const Index = () => {

  const [bebidaEditar, setBebidaEditar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toast = useRef(null);
  const {bebidasBuscadas,bebidas,setBebidas,loading,mostrarBebidas} = useBebida();
  const token= localStorage.getItem('token');
  const user= JSON.parse(localStorage.getItem('user'));

  const openModal = (bebida) => {
    setBebidaEditar(bebida);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setBebidaEditar(null);
  };

  
  useEffect(() => {
    mostrarBebidas();
    
  }, []);

  useEffect(() => {
    // Si bebidasBuscadas tiene contenido, actualiza el estado bebidas
    if (bebidasBuscadas && bebidasBuscadas.length > 0) {
      setBebidas(bebidasBuscadas);
    }
    if(bebidasBuscadas && bebidasBuscadas.length === 0){
      setBebidas([]);
    }
  }, [bebidasBuscadas]);



  if (loading) {
    return <Spinner />;
  }

  const deleteBebida = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3773ff",
      cancelButtonColor: "#8d0f0f",
      cancelButtonText:'Cancelar',
      confirmButtonText: "Sí, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/bebidas/${id}`,
            {
              method: "DELETE",
              headers: {
                "Authorization": `Bearer ${token}`
              },
            }
          );
          const data = await response.json();
          if (response.status === 404) {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: data,
              life: 3000,
            });
            return;
          }

          mostrarBebidas();
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 3000,
          });
        }

        toast.current.show({
          severity: "success",
          summary: "Bebida Eliminada",
          life: 3000,
        });
      }
    });
  };



  return (
    <div className="container m-auto">
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
      ) : (
        <p className="text-center text-xl font-bold text-gray-700">
          No hay bebidas disponibles
        </p>
      )}

      <ModalEditarBebida
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <Formulario bebida={bebidaEditar} closeModal={closeModal}/>
      </ModalEditarBebida>
    </div>
  );
};
