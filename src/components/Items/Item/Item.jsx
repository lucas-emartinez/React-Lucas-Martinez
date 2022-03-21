import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

export default function Item({prod}) {
  return (

        <Card key={prod.id} className="card p-0 overflow-hidden h-100 shadow mx-auto" style={{width: '18rem'}}>
            <Card.Img className='card-img-top img-fluid p-2' src={`${prod.img}`} />
          <Card.Body>
            <Card.Title>{prod.title}</Card.Title>
            <Card.Text>
              {prod.description}
            </Card.Text>
          </Card.Body>
          <Link to={`/detail/${prod.id}`}>
              <Button style={{width: '100%'}}>Ver producto</Button>
          </Link>        
        </Card>
  )
}
