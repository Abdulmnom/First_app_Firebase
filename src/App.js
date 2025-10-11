import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Dashboard from './pages/Dashboard';

import RequireAuth from './context/RequireAuth.js';



function App() {
  return (
    <div className="App">
     <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
      <div className='w-100' style={{maxWidth: "400px"}}>
        
        <Router>
          <Routes>
           <Route path='/signup' element={<Signup />} />
           <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/update-profile' element={<UpdateProfile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' element={ <RequireAuth><Dashboard /> </RequireAuth> } />
          </Routes>
        </Router>
      </div>
     </Container>
    </div>
  );
}

export default App;
