import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
export default function ItemCount({stock, initial, onAdd}) {

  const [count, setCount] = useState(initial);

  const handleCounter = (event) => {

    if(event.target.id === 'minus'){
      (count === initial) ? 
        alert(`La cantidad mínima es ${initial}`)
        : 
        setCount(count - 1);
    }else{
      (count === stock) ? 
        alert(`La cantidad máxima es ${stock}`)
        : 
        setCount(count + 1);
    }
  }
  
  return (
    <>
      <div className='w-100'>
        <div className='d-flex counter'>
            <Button id="minus" onClick={handleCounter} className="btn btn-secondary">-</Button>
              <input disabled className="form-control text-center" value={count} type="number" />
            <Button id="plus" onClick={handleCounter} className="btn btn-secondary">+</Button>
        </div>
        <div className='counter_buy'>
          <Button value={count} onClick={ () => onAdd(count)} className="btn">Comprar</Button>
        </div>
      </div>
    </>
  )
}
