import { useEffect, useState } from 'react'
import { BebidasList } from '../components/BebidasList';
import useBebida from '../hooks/useBebida';
import { ModalEditarBebida } from '../components/ModalEditarBebida';
import { Formulario } from './Formulario';
import { Spinner } from '../components/Spinner';
import { Toast } from 'primereact/toast';

export const BebidasFavoritas = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { fetchBebidasFavoritas, bebidasFavoritas, loading, toast, activePageValue} = useBebida();
    const [bebidaEditar, setBebidaEditar] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (bebida) => {
        setBebidaEditar(bebida);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setBebidaEditar(null);
    };

    useEffect(() => {
        fetchBebidasFavoritas();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container m-auto">
            <Toast ref={toast} />
            <h1 className="text-center text-3xl my-2">Bebidas Favoritas</h1>
            {bebidasFavoritas.length > 0 && !loading ? (
                <BebidasList
                    bebidas={bebidasFavoritas}
                    user={user}
                    openModal={openModal}
                    activePage={activePageValue.bebidasFavoritas}
                />
            ) : (
                <p className="text-center text-2xl font-bold text-gray-700">
                    No tienes bebidas favoritas.
                </p>
            )}
            <ModalEditarBebida
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <Formulario bebida={bebidaEditar} closeModal={closeModal} />
            </ModalEditarBebida>
        </div>
    )
}
