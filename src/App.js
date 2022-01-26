import logo from './logo.svg';
import './App.css';
import SignUp from './Components/Signup';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
}

export default App;
