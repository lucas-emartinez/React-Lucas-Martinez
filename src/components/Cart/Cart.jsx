import React from 'react';
import Button from "react-bootstrap/esm/Button";
import { useCartContext } from "../../context/CartContext"
import Checkout from "../Checkout/Checkout";

export default function Cart() {

  const { cartList, removeCart, removeItem, subtotal, emptyMessage } = useCartContext();




  return (
    <div className="container pt-4">
      <div className="row mb-5 pb-5 m-4">
        <div className="col col-12 col-md-8 cartList">
          <div className="d-flex flex-row">
            <h3 className="w-75">Mi carrito</h3>
            <Button className="btn btn-sm btn-secondary w-25" onClick={removeCart}>Vaciar carrito</Button>
          </div>
          <hr className="mb-3" />
          {emptyMessage()}

          {
            cartList.map(producto =>
              <div key={producto.id} className="row shadow-sm rounded-3 my-2">
                <li className="cartList_items">
                  <img src={`${producto.img}`} alt={producto.title} />
                  <h6 className="cartList_title">{producto.title}</h6>
                  <h6 className="cartList_cantidad">X{producto.cantidad}</h6>
                  <h6 className="cartList_price"><strong>$ {(producto.price * producto.cantidad).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</strong></h6>
                  <Button onClick={() => removeItem(producto.id)} className="btn btn-danger my-2 btn-CartItem">X</Button>
                </li>
              </div>
            )}
        </div>
        <div className="col">
          <div className="card shadow rounded">
            <div className="card-header text-center"><h5>Resumen del pedido</h5></div>
            <div className="card-body">
              <div>
                <table className="table table-light text-center table-borderless">
                  <caption className="mt-4">
                    <h6>Subtotal: $ {subtotal().toLocaleString('es-AR', { minimumFractionDigits: 2 })}</h6>
                  </caption>
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
                <Checkout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
