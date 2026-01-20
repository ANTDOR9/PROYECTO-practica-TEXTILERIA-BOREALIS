import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/product'
import Personal from './pages/personal'
import Cart from './pages/cart'
import Contact from './pages/contact'
import Nav from './pages/nav'
import Home from './pages/home'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="personal" element={<Personal />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
