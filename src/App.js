import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/notFound/NotFound';
import Home from './pages/home/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './pages/admin/AdminHome';


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
