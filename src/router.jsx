import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Formulario } from './views/Formulario';
import { Index } from './views/Index';
import { AuthLayout } from './layout/AuthLayout';
import { LoginPage } from './views/Auth/LoginPage';
import { RegisterPage } from './views/Auth/RegisterPage';

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
}
