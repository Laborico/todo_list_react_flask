import './App.css';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
        

          <Route path ="/" element={<Login/>}/>
          <Route path ="/signup" element={<Signup/>}/>
          <Route path ="/home" element={<Home/>}/>

          </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
