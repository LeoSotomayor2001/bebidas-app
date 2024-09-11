import {createBrowserRouter} from "react-router-dom";
import { Layout } from './layout/Layout';
import { Index } from './views/Index';
import { Formulario } from './views/Formulario';
import { AuthLayout } from './layout/AuthLayout';
import { LoginPage } from './views/Auth/LoginPage';
import { RegisterPage } from "./views/Auth/RegisterPage";
import { BebidasFavoritas } from "./views/BebidasFavoritas";
import { NotFound } from "./views/NotFound";
/*

export const AppRouter = () => {
  
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Index/>} />
              <Route path="crear" element={<Formulario/>} />
            </Route>
            <Route path="/auth" element={<AuthLayout/>}>
              <Route  path='login' element={<LoginPage/>} />
              <Route path="registro" element={<RegisterPage/>} />
            </Route>
          </Routes>
        </Router>
      );
}*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>
      },
      {
        path: "/bebidas-favoritas",
        element: <BebidasFavoritas/>
      },
      {
        path: "/crear",
        element: <Formulario/>
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        index: true,
        element: <LoginPage/>
      },
      {
        path:"/auth/registro",
        element:<RegisterPage/>
      }
    ]

  },
  {
    path: "*",
    element: <NotFound/>
  }
]);


export {router}
