import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export const Layout = () => {
    return (
        <div>
          <Header/>
          <main>
            <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
          </main>
          <footer>
            <p>Leodomi Sotomayor</p>
          </footer>
        </div>
      )
}
