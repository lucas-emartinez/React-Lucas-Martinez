import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getFetch from "../../helpers/gFetch"
import ItemDetail from "../../components/Items/ItemDetail/ItemDetail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Loading from '../../components/Loading/Loading'
export default function ItemDetailContainer() {

  const [loading, setLoading] = useState(true)
  const [producto, setProducto] = useState({})
  const { id } = useParams()
  console.log(producto)
  console.log(id)

  useEffect(() => {
    if (id){
        getFetch // Simulacion de llamado a API
            .then(response => response.find(item => item.id === id))
            .then(prod => setProducto(prod))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }
}, [id])

  return (
    <>
      {
        (loading) ?
        <Loading />
        :
        <Container className="detail-container">      
          <Row>
            <Col>
              <ItemDetail  producto={producto} />
            </Col>
          </Row>  
        </Container>
      }
   </> 
  )
}
