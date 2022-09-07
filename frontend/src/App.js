import './App.css';
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav-bar/nav-bar';
import Home from './views/home/home';
import Profile from './views/profile/profile';
import Order from './views/order/order';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Nav/>} >
          <Route index element={<Home/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path="order" element={<Order/>} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
