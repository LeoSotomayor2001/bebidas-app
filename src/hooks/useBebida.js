import { useContext } from "react"
import BebidaContext from "../context/BebidaProvider"

const useBebida = () => {
    return useContext(BebidaContext)
}

export default useBebida