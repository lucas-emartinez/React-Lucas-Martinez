import { addDoc, collection, documentId, getDocs, getFirestore, query, where, writeBatch } from "firebase/firestore";
import Button from "react-bootstrap/esm/Button";
import { useCartContext } from "../../context/CartContext"

export default function Cart() {

  const { cartList, removeCart, removeItem, subtotal, emptyMessage } = useCartContext();
  

    const order = async () => {
    const date = new Date()
    let orden = {}

    orden.buyer = {name: 'Lucas', email: 'luketaapeeola@gmail.com', cel: '+541133755923'}
    orden.total = subtotal()
    orden.date = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`
    orden.items = cartList.map(item => {
      const id = item.id
      const nombre = item.title
      const price = item.price * item.cantidad

      return {id, nombre, price}
    })

    console.log(orden)

    const db = getFirestore();
    const queryCollectionOrders = collection(db, 'orders')

    await addDoc(queryCollectionOrders, orden)
      .then( ({id}) => console.log(id))


    const queryCollectionItems = collection(db, 'items')

    const stockUpdate = await query(queryCollectionItems,
      where(documentId(), 'in', cartList.map(item => item.id)))

    const batch = writeBatch(db)

    await getDocs(stockUpdate)
      .then(response => response.docs.forEach(res => batch.update(res.ref, {
        stock: res.data().stock - cartList.find(item => item.id === res.id).cantidad
      })))
      .finally(console.log('ORDEN FINALIZADA'))

    batch.commit()
    
  }


  return (
    <div className="container pt-4">
        <div className="row mb-5 pb-5 m-4">
          <div className="col col-12 col-md-8 cartList">
            <div className="d-flex flex-row">
              <h3 className="w-75">Mi carrito</h3>
              <Button className="btn btn-sm btn-secondary w-25" onClick={removeCart}>Vaciar carrito</Button>
            </div>
            <hr className="mb-3"/>
            {emptyMessage()}
            
            {
            cartList.map(producto =>
              <div key={producto.id} className="row shadow-sm rounded-3 my-2">
                <li className="cartList_items">
                  <img src={`${producto.img}`} alt={producto.title} />
                  <h6 className="cartList_title">{producto.title}</h6>
                  <h6 className="cartList_cantidad">X{producto.cantidad}</h6>
                  <h6 className="cartList_price"><strong>$ {(producto.price * producto.cantidad).toLocaleString('es-AR', {minimumFractionDigits: 2})}</strong></h6>
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
                      <h5>Subtotal: $ {subtotal().toLocaleString('es-AR', {minimumFractionDigits: 2})}</h5>
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
                  <Button onClick={order} className="btn btn-primary">Comprar</Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
