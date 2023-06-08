import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Dashboard from './container/Dashboard';
import Header from './component/Header';
import Footer from './component/Footer';
import Addadmin from './container/Addadmin';
import ViewAdmin from './container/ViewAdmin';
import Register from './container/Register';
import Login from './container/Login';
import Category from './container/Category';
import Viewcategory from './container/Viewcategory';
import Addproduct from './container/Addproduct';
import Viewproduct from './container/Viewproduct';
function App() {

  let sessionData = sessionStorage.getItem('username');
 
  return (
    <div >
   {sessionData !== null?<Header />:""
   }
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add_admin" element={<Addadmin />} />
              <Route path="/view_admin" element={<ViewAdmin />} />
              <Route path='/addCategort' element={<Category/>}/>
              <Route path='/view_Category' element={<Viewcategory/>} />
              <Route path='/add_product' element={<Addproduct/>}/>
              <Route path='/view_product'element={<Viewproduct/>}/>
          </Routes>
          {sessionData !== null?<Footer /> :""
   }
      

    </div>
  );
}

export default App;
