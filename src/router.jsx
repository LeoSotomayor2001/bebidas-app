import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Formulario } from './views/Formulario';

export const AppRouter = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<h1>Hola mundo</h1>} />
              <Route path="crear" element={<Formulario/>} />
            </Route>
          </Routes>
        </Router>
      );
}
