import axios from "axios";
import { createContext, useRef, useState } from "react"
import Swal from "sweetalert2";

const BebidaContext=createContext();

const BebidaProvider=({children})=>{
    const [bebidasBuscadas, setBebidasBuscadas] = useState({})
    const [bebidasFavoritas, setBebidasFavoritas] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const token= localStorage.getItem('token');
    const toast = useRef(null);
    const BuscarBebidas=async(nombre)=>{
        let url = `http://127.0.0.1:8000/api/bebidas/search?nombre=${nombre}`;
        try{
            const {data} = await axios.get(url,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            //console.log(data.bebidas)
            setBebidasBuscadas(data.bebidas)
        }
        catch(error){
            console.log(error)
        }
    }
    const mostrarBebidas = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/bebidas", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
          const data = await response.json();
          const { bebidas } = data;
    
          setBebidas(bebidas);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      const fetchBebidasFavoritas = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/bebidas/favoritas', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBebidasFavoritas(response.data.bebidas);
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    
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
              fetchBebidasFavoritas();
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
        <BebidaContext.Provider value={{
            BuscarBebidas,
            bebidasBuscadas,
            bebidas,
            mostrarBebidas,
            loading,
            setBebidas,
            deleteBebida,
            toast,
            fetchBebidasFavoritas,
            bebidasFavoritas

        }}>
            {children}
        </BebidaContext.Provider>
    )
}

export {BebidaProvider}
export default BebidaContext