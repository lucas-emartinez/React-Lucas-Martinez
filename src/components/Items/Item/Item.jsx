import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

export default function Item({ producto }) {
  return (
        <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card" id="card">
                <div className="producto align-items-center  text-center">
                  <img className="p-2" src={`${producto.img}`} width="210px" height="165px" alt="" />
                  <div className="mt-3 info">
                    <span className="card-text d-block">
                      {producto.title}
                    </span>
                  </div>
                  <div className="cost mt-3 text-dark">
                    <span>$ {(producto.price).toLocaleString('es-AR')}</span>
                  </div>
                  <Link to={`/detail/${producto.id}`}>
                    <Button className="btn-landing btn-primary mt-3">Ver Producto</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}
