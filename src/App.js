import logo from './logo.svg';
import './App.css';
import SignUp from './Components/Signup.js';
import Login from './Components/Login.js';
import Feed from './Components/Feed';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import {AuthProvider} from './Context/AuthContext.js'
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
    { /* since we wrapped all the contents SignUp and Login here so they are recieved by AuthProvider in AuthContext.js as children */ } 
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
        <PrivateRoute>
        <Feed />
        </PrivateRoute>}
         />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
