import { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Loading from '../components/Loading/Loading';
import ItemList from '../components/Items/ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import AOS from "aos";
import "aos/dist/aos.css";



export default function ItemListContainer({ welcome }) {


    const [loading, setLoading] = useState(true);
    const [prods, setProds] = useState([]);
    const { id } = useParams();

    

    useEffect(() => {
        const db = getFirestore()
        const queryCollection = collection(db, 'items')
        AOS.init();
         if(id) {
            const queryFilter = query(queryCollection, where('category', '==', id))
            getDocs(queryFilter)
            .then(response => setProds(response.docs.map(producto => ( {id: producto.id, ...producto.data()} ))))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
            
         } else {
            getDocs(queryCollection)
                .then(response => setProds(response.docs.map(producto => ( {id: producto.id, ...producto.data()} ))))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
         }
        //const queryFilter = query(queryCollection, where('','',''))
    }, [id])

    
    return (
        <>
            <section id="inicio" className="d-flex align-items-center">
                <div className="container d-flex flex-column justify-content-end">
                    <h1>Bienvenido</h1>
                    
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


