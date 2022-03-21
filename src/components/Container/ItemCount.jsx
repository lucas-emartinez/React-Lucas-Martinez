
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
export default function ItemCount({stock, initial, onAdd}) {

  const [count, setCount] = useState(initial);
  const [error, setError] = useState(`Stock minimo: ${initial} Stock máximo: ${stock}`);

  const handleCounters = (event) => {

    if (event.target.id === 'minus'){
      (count <= initial) ?
        alert(error)
        :
        setCount(count - 1)
    }else{
      (count >= stock) ?
        alert(error)
        :
        setCount(count + 1)
    }    
  }

  const add = () => {
    console.log(count)
  }
    
  return (
    <>
      <Stack gap={2}>
        <div className="input-group">
            <Button id="minus" onClick={handleCounters} className="btn btn-warning ">-</Button>
              <input disabled className="form-control text-center" value={count} type="number" />
            <Button id="plus" onClick={handleCounters} className="btn btn-warning ">+</Button>
        </div>
        <div className="">
          <Button onClick={add} className="btn btn-dark">Agregar al carrito</Button>
        </div>
      </Stack>
    </>
  )
}
