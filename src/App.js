import './App.css';

import Home from './components/Home';
import Usuarios from './components/Usuarios';
import Cidades from './components/Cidades';
import Empresas from './components/Empresas';
import Leituras from './components/Leituras';

import { Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <h1>CREA-TO VANTAGENS </h1>
        <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/cidades">Cidades</Nav.Link>
          <Nav.Link as={Link} to="/usuarios">Usuarios</Nav.Link>
          <Nav.Link as={Link} to="/empresas">Empresas</Nav.Link>
          <Nav.Link as={Link} to="/leituras">Leituras</Nav.Link> 
        </Nav>
         
         <Routes>
           <Route path="/" element={ <Home/>}></Route>
           <Route path="/usuarios" element={ <Usuarios/>}></Route>
           <Route path="/cidades" element={ <Cidades/>}></Route>
           <Route path="/empresas" element={ <Empresas/>}></Route>
           <Route path="/leituras" element={ <Leituras/>}></Route> 
         </Routes>


        </BrowserRouter>
    </div>
  );
}

export default App;
