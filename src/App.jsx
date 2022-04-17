import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading/Loading';
import CartContextProvider from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart'
import { lazy, Suspense } from 'react';


const ItemListContainer = lazy(() => import('./containers/ItemListContainer'))


function App() {
  return (
    <Suspense fallback={Loading}>
      <BrowserRouter>
        <CartContextProvider>
        <NavBar />
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <ItemListContainer
                    welcome='Bienvenido a UAVProject'
                  />
                }
              />
              <Route
                path="/category/:id"
                element={   
                  <ItemListContainer
                    welcome='Bienvenido a UAVProject'
                  />
                }
              />
              <Route path='/detail/:id' element={<ItemDetailContainer />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
          </div>
          <Footer />
        </CartContextProvider>
      </BrowserRouter>
    </Suspense >
  );
}

export default App;
