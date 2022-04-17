import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function ItemCountCart() {


return (
    <>
        <div className='d-flex flex-column'>
            <div className='pt-2'>
                <Link to='/'>
                    <Button className="btn btn-primary">Continuar comprando</Button>
                </Link>
            </div>
            <div className='pt-2'>
                <Link to='/cart'>
                    <Button className="btn btn-secondary">Finalizar compra</Button>
                </Link>
            </div>
        </div>
    </>
    )
}
