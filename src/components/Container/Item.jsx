
import Container from "react-bootstrap/esm/Container"
import Card from "react-bootstrap/Card"
import ItemCount from "./ItemCount"

export default function Item({prod}) {
  return (
    <Container>
      <Card className="p-3 shadow hover:transform" >
        <Card.Header className="border">
          <Card.Title>{prod.title}</Card.Title>
        </Card.Header>
        <Card.Body className="py-4"> 
            <Card.Text >
                {prod.description}
            </Card.Text>

            {(prod.stock != 0) ?

              <ItemCount stock={prod.stock} initial={1} />
            :
              <h3>Sin stock</h3>
            }
        </Card.Body>
      </Card>
    </Container>
  )
}
