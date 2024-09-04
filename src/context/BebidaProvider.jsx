import axios from "axios";
import { createContext, useState } from "react"

const BebidaContext=createContext();

const BebidaProvider=({children})=>{
    const [bebidasBuscadas, setBebidasBuscadas] = useState({})
    const [isValidUser, setIsValidUser] = useState(false)
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

    return (
        <BebidaContext.Provider value={{
            BuscarBebidas,
            bebidasBuscadas,
            isValidUser,
            setIsValidUser
        }}>
            {children}
        </BebidaContext.Provider>
    )
}

export {BebidaProvider}
export default BebidaContext