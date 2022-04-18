import React from 'react';
import { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Loading from '../components/Loading/Loading';
import ItemList from '../components/Items/ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import Typed from 'react-typed'


export default function ItemListContainer() {


    const [loading, setLoading] = useState(true);
    const [prods, setProds] = useState([]);
    const { id } = useParams();

    const getItems = async (id) => {
        try{
            const db = getFirestore()
            const queryCollectionChoice = !id ? collection(db, 'items') :  query(collection(db, 'items'), where('category', '==', id))

            const response = await getDocs(queryCollectionChoice)
            setProds(response.docs.map(producto => ( {id: producto.id, ...producto.data()} )))
            setLoading(false)
        
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
    
        getItems(id)

    }, [id])

    
    return (
        <>
            <section id="inicio" className="d-flex align-items-center">
                <div className="container d-flex flex-column justify-content-end">
                    <h1>Bienvenido</h1>
                    <h2>
                        <Typed
                            strings={['Todos podemos volar', 'Tu primer drone!']}
                            typeSpeed={50}
                            backSpeed={100}
                            loop
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
                            <ItemList id="productos" prods={prods} />
                    }
                </Container>
            </div>
        </>
    )
}


