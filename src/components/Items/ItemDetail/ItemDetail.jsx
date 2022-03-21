import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import Card from 'react-bootstrap/Card'

export default function ItemDetail({producto}) {

    const [cart, setCart] = useState(0)

    const addToCart = () => {

    }

    return (
        <div className="row">
            <div className="col">
                <img width="350" height="300" src={`${producto.img}`} alt="" />
            </div>
            <div className="col">
                <Card className='h-100 w-100'>
                    <Card.Header>
                        <strong><h3>{producto.title}</h3></strong>
                    </Card.Header>
                    <Card.Body>
                        <p>{producto.category} > {producto.title}</p>
                        <h4>$ {producto.price}</h4>
                        <h6>Cantidad disponible: {producto.stock}</h6>
                    </Card.Body>
                    <Card.Footer className="detail-container_buy">
                        <ItemCount stock={producto.stock} initial={1} onAdd={addToCart} />
                    </Card.Footer>
                </Card>
            </div>
        </div>
    )
}
