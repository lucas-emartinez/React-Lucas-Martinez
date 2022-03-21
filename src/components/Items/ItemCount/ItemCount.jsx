
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
export default function ItemCount({stock, initial, onAdd}) {

  const [count, setCount] = useState(initial);
  const [error, setError] = useState('');

  const handleCounter = (event) => {

    if(event.target.id == 'minus'){
      (count === initial) ? 
          setError(alert(`La cantidad mínima es ${initial}`)) 
          : 
          setCount(count - 1);
    }else{
      (count === stock) ? 
        setError(alert(`La cantidad máxima es ${stock}`)) 
        : 
        setCount(count + 1);
    }
  }

  const addToCart = () => {
    console.log(count)
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
          <Button onClick={addToCart} className="btn btn">Comprar</Button>
        </div>
      </div>
    </>
  )
}
