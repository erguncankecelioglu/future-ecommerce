import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import MyAccount from "./pages/MyAccount";
import ProductDetail from "./components/ProductDetail";
import {CartProvider} from "./context/CartContext";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar";
import {AuthProvider} from './context/AuthContext';
import Login from "./pages/Login";

function App() {
    return (
        <CartProvider>
            <AuthProvider>
                <Router>
                    <div style={{marginLeft: '-2rem'}}>
                        <NavBar/>
                        <div style={{marginBottom: '5.3rem'}}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/shop" element={<Shop/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/shop/:id" element={<ProductDetail/>}/>
                                <Route path="/cart" element={<Cart/>}/>
                                <Route path="/my-account" element={<MyAccount/>}/>
                                <Route path="/about-us" element={<AboutUs/>}/>
                            </Routes>
                        </div>
                    </div>
                </Router>
            </AuthProvider>
        </CartProvider>


    );
}

export default App;
