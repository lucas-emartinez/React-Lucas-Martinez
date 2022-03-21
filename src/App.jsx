import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './containers/ItemListContainer';
import Footer from './components/Footer/Footer';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />

        <Routes>

          <Route
            path="/"
            element={
              <ItemListContainer
                welcome='Bienvenido a Aircaption'
              />
            }
          />
          <Route
            path="/category/:id"
            element={
              <ItemListContainer
                welcome='Bienvenido a Aircaption'
              />
            }
          />

          <Route path='/detail/:id' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/*' element={ <Navigate to='/' /> }/>

        </Routes>

      </div>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
