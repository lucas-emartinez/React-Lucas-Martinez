import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import getFetch from '../helpers/gFetch'
import ItemList from '../components/Items/ItemList/ItemList';
import Loading from '../components/Loading/Loading';
import { useParams } from 'react-router-dom';



export default function ItemListContainer({ welcome }) {

    const [loading, setLoading] = useState(true);
    const [prods, setProds] = useState([])
    const { id } = useParams()

    useEffect(() => {
        if (id){
            getFetch // Simulacion de llamado a API
                .then(response => setProds(response.filter(prod => prod.category === id)))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        } else{
            getFetch
                .then(response => setProds(response))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }
    }, [id])
    
    return (
        <>
            <div className='my-5'>
                <Card className="border-0 py-5 text-center">
                    <Card.Title>
                        <h1>{welcome}</h1>
                    </Card.Title>
                    <Card.Body>
                        <Card.Text>
                            <p>La empresa lider en venta de Drones en Argentina!</p>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Container  style={{ textAlign: 'center' }}>
                    <h4 className='py-5 '>Productos</h4>
                    {
                        loading ?
                            <Loading className='pt-5' />
                            :

                            <ItemList prods={prods} />
                    }
                </Container>
            </div>
        </>
    )
}


