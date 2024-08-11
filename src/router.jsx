import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';

export const AppRouter = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<h1>Hola mundo</h1>} />
              <Route path="crear" element={<h1>otra pagina</h1>} />
              <Route path="contact" element={<h1>cambio de pagina</h1>} />
            </Route>
          </Routes>
        </Router>
      );
}
