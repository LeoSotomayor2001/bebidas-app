import axios from "axios";
import { createContext, useState } from "react"

const BebidaContext=createContext();

const BebidaProvider=({children})=>{
    const [bebidasBuscadas, setBebidasBuscadas] = useState({})
    const [bebidas, setBebidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const token= localStorage.getItem('token');
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

    return (
        <BebidaContext.Provider value={{
            BuscarBebidas,
            bebidasBuscadas,
            bebidas,
            mostrarBebidas,
            loading,
            setBebidas,

        }}>
            {children}
        </BebidaContext.Provider>
    )
}

export {BebidaProvider}
export default BebidaContext