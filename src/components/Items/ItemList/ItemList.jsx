import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Item from "../Item/Item"
import { memo } from "react"


const ItemList  = memo(
  
  ({ prods }) => {
        return (
          <Row>
            {
            prods.map((producto) => 
            <Col key={producto.id} xs={12} md={6} xl={3}  className='py-4'>
                <Item producto={producto} />
            </Col>
            )
            }
          </Row>
          )
      }
      )

export default ItemList;

