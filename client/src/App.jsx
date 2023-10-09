import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import ModalComponent from './components/ModalComponent';
import FirstApi from './pages/FirstApi'
import Categories from './pages/admin/Categories';
import Sidebar from './pages/admin/Sidebar';
import PickupPoints from './pages/admin/PickupPoints'
import Login from './pages/user/auth/Login'
import Products from './pages/admin/Products';
import Register from './pages/user/auth/Register';
import Home from './pages/user/Home';
import ProductDetails from './pages/user/ProductDetails';
import CartDetails from './pages/user/CartDetails';
import './App.css'

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/first-api' element={<FirstApi />} />
          <Route exact path='/admin/categories' element={<Categories />} />
          <Route exact path="/admin/sidebar" element={<Sidebar />} />
          <Route exact path="/components/modalComponent" element={<ModalComponent />} />
          <Route exact path="/admin/pickup-points" element={<PickupPoints />} />
          <Route exact path="/admin/products" element={<Products />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/cart-details" element={<CartDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

