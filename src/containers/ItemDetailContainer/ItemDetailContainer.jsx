import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../../components/Items/ItemDetail/ItemDetail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Loading from '../../components/Loading/Loading'
import { doc, getDoc, getFirestore } from "firebase/firestore";
export default function ItemDetailContainer() {

  const [loading, setLoading] = useState(true)
  const [prod, setProd] = useState({})
  const { id } = useParams()


  useEffect(() => {

    async function getDetail() {

      try {
        if (id) {
          const db = getFirestore()
          const queryDoc = doc(db, 'items', id)
          const response = await getDoc(queryDoc)
          setProd({ id: response.id, ...response.data() })
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getDetail()

  }, [id])

  return (
    <>
      <Container style={{ textAlign: 'center' }}>
        {

          (loading) ?
            <Loading />
            :
            <Container className="detail-container">
              <Row>
                <Col>
                  <ItemDetail producto={prod} />
                </Col>
              </Row>
            </Container>
        }
      </Container>
    </>
  )
}
