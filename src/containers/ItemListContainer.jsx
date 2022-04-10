import { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Loading from '../components/Loading/Loading';
import ItemList from '../components/Items/ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import Typed from 'react-typed'



export default function ItemListContainer({ welcome }) {


    const [loading, setLoading] = useState(true);
    const [prods, setProds] = useState([]);
    const { id } = useParams();

    

    useEffect(() => {

        async function getItems(){

            try{
                const db = getFirestore()
                const queryCollection = collection(db, 'items')

                if(id) {
                    const queryFilter = query(queryCollection, where('category', '==', id))
                    const response = await getDocs(queryFilter)
                    setProds(response.docs.map(producto => ( {id: producto.id, ...producto.data()} )))
                    setLoading(false)
                    
                } else {
                    const response = await getDocs(queryCollection)
                    setProds(response.docs.map(producto => ( {id: producto.id, ...producto.data()} )))
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        //const queryFilter = query(queryCollection, where('','',''))
        }

        getItems()

        
    }, [id])

    
    return (
        <>
            <section id="inicio" className="d-flex align-items-center">
                <div className="container d-flex flex-column justify-content-end">
                    <h1>Bienvenido</h1>
                    <h2>
                        <Typed
                            strings={['Todos podemos volar']}
                            typeSpeed={40}
                            />
                    </h2>
                </div>
            </section>
            <div className='my-5'>
    
                <Container style={{ textAlign: 'center' }}>
                    <h4 className='py-5 '>Productos</h4>
                    {
                        loading ?
                            <Loading className='pt-5' />
                            :

                            <ItemList data-aos="zoom-in" data-aos-duration="2000"  id="productos" prods={prods} />
                    }
                </Container>
            </div>
        </>
    )
}


