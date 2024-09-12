import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Toast } from "primereact/toast";
import { ModalEditarBebida } from "../components/ModalEditarBebida";
import { Formulario } from "./Formulario";
import useBebida from "../hooks/useBebida";
import { BebidasList } from "../components/BebidasList";

export const Index = () => {

  const [bebidaEditar, setBebidaEditar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { bebidasBuscadas, bebidas, setBebidas, loading, mostrarBebidas, toast, activePageValue } = useBebida();
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

  return (
    <div className="container m-auto">
      <Toast ref={toast} />
      <h1 className="text-center text-3xl my-2">Lista de bebidas</h1>

      {bebidas.length > 0 ? (
        <BebidasList
          bebidas={bebidas}
          user={user}
          openModal={openModal}
          activePage = {activePageValue.index}
        />
      ) : (
        <p className="text-center text-2xl font-bold text-gray-700">
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
