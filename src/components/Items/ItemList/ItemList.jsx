import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Item from "../Item/Item"
import CardGroup from "react-bootstrap/CardGroup"

export default function ItemList({prods}) {


  return (
    
      <Row>
        {
          prods.map((prod) =>
            <Col xs={12} md={6} xl={3}  className='py-4'>
                <Item prod={prod} />
            </Col>
          )
        }
      </Row>

  )
}


