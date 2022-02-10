import './App.css';
import SignUp from './Components/Signup.js';
import Login from './Components/Login.js';
import Feed from './Components/Feed';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.js'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
      { /* since we wrapped all the contents SignUp and Login here so they are recieved by AuthProvider in AuthContext.js as children */}
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/" element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>}
          />

          {
            /* writing "/:userId" this way the userId can be accessed in the component Profile
            so that with one component we can put data of users depending on the id */
          }
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
