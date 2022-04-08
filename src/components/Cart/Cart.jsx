import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useCartContext } from "../../context/CartContext"

export default function Cart() {

  const { cartList, price, removeCart, removeItem } = useCartContext();


  return (
    <div className="container pt-4">
        <div className="row mb-5 pb-5 m-4">
          <div className="col col-12 col-md-8 cartList">
            <div className="d-flex flex-row">
              <h3 className="w-75">Mi carrito</h3>
              <Button className="btn btn-sm btn-secondary w-25" onClick={removeCart}>Vaciar carrito</Button>
            </div>
            <hr className="mb-3"/>
            {cartList.map(producto =>
              <div key={producto.id} className="row shadow-sm rounded-3 my-2">
                <li className="cartList_items">
                  <img src={`${producto.img}`} alt={producto.title} />
                  <h6 className="cartList_title">{producto.title}</h6>
                  <h6 className="cartList_cantidad">X{producto.cantidad}</h6>
                  <h6 className="cartList_price"><strong>$ {(producto.price * producto.cantidad).toLocaleString('es-AR')}</strong></h6>
                  <Button onClick={() => removeItem(producto.id)} className="btn btn-danger my-2 btn-CartItem">X</Button>
                </li>
              </div>
            )}
          </div>
          <div className="col mt-5 pt-3">
            <div className="card shadow rounded">
              <div className="card-header text-center"><h4>Resumen del pedido</h4></div>
              <div className="card-body">
                <div className="table-responsive-sm card-text">
                  <table className="table caption table-hover text-center">
                    <caption className="mt-4">
                      <h5>Subtotal: $ {(price).toLocaleString()}</h5>
                    </caption>  
                    <thead className="table-dark rounded-3">
                      <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      { 
                      cartList.map(producto =>
                        <tr key={producto.id}>
                          <td>{producto.title}</td>
                          <td>{producto.cantidad}</td>
                          <td>$ {(producto.price * producto.cantidad).toLocaleString()}</td>
                        </tr>                
                        )}
                    </tbody>
                  </table>
                  <Button className="btn btn-primary">Comprar</Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
