import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Formulario } from './views/Formulario';
import { Index } from './views/Index';

export const AppRouter = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Index/>} />
              <Route path="crear" element={<Formulario/>} />
            </Route>
          </Routes>
        </Router>
      );
}
