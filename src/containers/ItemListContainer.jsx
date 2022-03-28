import { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import getFetch from '../helpers/gFetch'
import Loading from '../components/Loading/Loading';
import ItemList from '../components/Items/ItemList/ItemList';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'react-typed';



export default function ItemListContainer({ welcome }) {


    const [loading, setLoading] = useState(true);
    const [prods, setProds] = useState([]);
    const { id } = useParams();

    


    useEffect(() => {
        AOS.init()
        if (id) {
            getFetch // Simulacion de llamado a API
                .then(response => setProds(response.filter(prod => prod.category === id)))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        } else {
            getFetch
                .then(response => setProds(response))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }

    }, [id])

    return (
        <>
            <section id="inicio" className="d-flex align-items-center">
                <div className="container d-flex flex-column justify-content-end" data-aos="zoom-out" data-aos-delay="100">
                    <h1>Bienvenido</h1>
                    <h2 className="d-flex flexrow">
                        <Typed
                            strings={['Todos podemos volar']}
                            typeSpeed={40}
                        />
                    </h2>
                </div>
            </section>
            <div data-aos="zoom-in" data-aos-duration="2000" className='my-5'>
    
                <Container style={{ textAlign: 'center' }}>
                    <h4 className='py-5 '>Productos</h4>
                    {
                        loading ?
                            <Loading className='pt-5' />
                            :

                            <ItemList id="productos" prods={prods} />
                    }
                </Container>
            </div>
        </>
    )
}


