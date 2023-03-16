import { BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from "axios"
import Login from './page/Login';
import Register from './page/Register';
import HomePage from './page/HomePage';

axios.defaults.withCredentials = true

function App() {
  return (
 <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/home' element={<HomePage/>} />
   </Routes>
 </BrowserRouter>
  );
}

export default App;
