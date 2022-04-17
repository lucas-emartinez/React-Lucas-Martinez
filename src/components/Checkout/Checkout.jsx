import React from "react"
import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { addDoc, collection, documentId, getDocs, getFirestore, query, where, writeBatch } from "firebase/firestore";
import { useCartContext } from "../../context/CartContext";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Spinner from 'react-bootstrap/Spinner'
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from "react-router-dom"





export default function Checkout() {

  const MAX_STEPS = 3;
  const [loading, setLoading] = useState(false)
  const { cartList, subtotal } = useCartContext();
  const [show, setShow] = useState(false)
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({ mode: 'all' });
  const [formStep, setFormStep] = useState(1)
  const [swalProps, setSwalProps] = useState({});
  const navigate = useNavigate()

  const completeFormStep = (event) => {
    if (event.target.value === 'back') {
      setFormStep(formStep - 1)
    } else {
      setFormStep(formStep + 1);
    }
  }



  const renderButtons = () => {
    if (formStep === 3) {
      return (
        <>
          <Col xs="4" md="3" lg="3">
            <Button variant="danger" value="back" onClick={value => completeFormStep(value)}>
              Atras
            </Button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }} md={{ span: 3, offset: 6 }} lg={{ span: 3, offset: 6 }} className="d-flex">
            <Button disabled={!isValid} variant="secondary" onClick={handleSubmit(onSubmit)}>
              Finalizar
            </Button>
          </Col>
        </>
      )
    } else if (formStep === 1) {
      return (
        <>
          <Col xs={{ span: 4, offset: 4 }} md={{ span: 3, offset: 6 }} lg={{ span: 6, offset: 6 }} className="d-flex">
            <Button disabled={!isValid} variant="primary" onClick={value => completeFormStep(value)}>
              Siguiente
            </Button>
          </Col>
        </>
      )
    } else {
      return (
        <>
          <Col xs="4" md="3" lg="3">
            <Button variant="danger" value="back" onClick={value => completeFormStep(value)}>
              Atras
            </Button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }} md={{ span: 3, offset: 6 }} lg={{ span: 3, offset: 6 }} className="d-flex">
            <Button disabled={!isValid} variant="primary" value="next" onClick={value => completeFormStep(value)}>
              Siguiente
            </Button>
          </Col>
        </>
      )
    }
  }



  const handleClose = () => setShow(false);
  const handleShow = () => {

    if (cartList.length === 0) {
      alert('Carrito vacio')
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShow(true)
        setFormStep(1)
      }, 2000)
    }
  };



  const onSubmit = data => {
    setSwalProps({})
    setShow(false)
    const order = async () => {
      const date = new Date()
      let orden = {}

      orden.buyer = { name: data.nombre, email: data.email, cel: data.cel }
      orden.total = subtotal()
      orden.date = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`
      orden.items = cartList.map(item => {
        const id = item.id
        const nombre = item.title
        const price = item.price * item.cantidad
      
        return { id, nombre, price }  
      })

      
      
      const db = getFirestore();
      const queryCollectionOrders = collection(db, 'orders')

      await addDoc(queryCollectionOrders, orden)
        .then(({ id }) => {
          setSwalProps({
          show: true,
          icon: 'success',
          title: 'Compra finalizada',
          text: `El ID de su compra es: ${ id } `,
          confirmButtonText: 'OK',
          confirmButtonColor: 'green'
        })
      }
      )
        
    


      const queryCollectionItems = collection(db, 'items')
      const stockUpdate = await query(queryCollectionItems,
        where(documentId(), 'in', cartList.map(item => item.id)))
      const batch = writeBatch(db)


      await getDocs(stockUpdate)
        .then(response => response.docs.forEach(res => batch.update(res.ref, {
          stock: res.data().stock - cartList.find(item => item.id === res.id).cantidad
        })))
        .finally(console.log('ORDEN FINALIZADA'))

      batch.commit()
   
    }
    
    order()
    
  }



  return (
    <>
    <SweetAlert2 {...swalProps} />
      {
        loading ?
          (
            <Button variant="dark" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </Button>

          )
          :
          <>
            <Button variant="secondary" onClick={handleShow}>Comprar</Button>

            <Modal show={show} onHide={handleClose}>
              
              <Modal.Header closeButton className="bg-light shadow-lg">
                <Modal.Title className="text-dark">Checkout</Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-light shadow-lg">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col>
                      {formStep === 1 && (
                        <section className={formStep === 1 ? 'block' : 'hidden'}>
                          <p>Paso {formStep} de {MAX_STEPS}</p>
                          <h4 className="font-semibold text-secondary text-3xl mb-4">Datos Personales</h4>
                          <Form.Group className="mb-3 col-lg-8">
                            <Form.Label className="text-secondary">Email</Form.Label>
                            <Form.Control
                              placeholder="nombre@email.com"
                              {...register('email', {
                                required: true,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                }
                              })
                              }
                            />
                            <h6 className="my-2 text-danger">{errors.email?.type === 'required' && "Email requerido"}</h6>
                          </Form.Group>
                          <Form.Group className="col-lg-8 mt-3">
                            <Form.Label className="text-secondary">Nombre y apellido</Form.Label>
                            <Form.Control
                              placeholder="Nombre...."
                              {...register('nombre', { required: true })}
                            />
                            <h6 className="my-2 text-danger">{errors.nombre?.type === 'required' && "Nombre requerido"}</h6>
                          </Form.Group>
                          <Form.Group className="col-lg-8 mt-3">
                            <Form.Label className="text-secondary">Celular</Form.Label>
                            <Form.Control
                              placeholder="+54....."
                              {...register('cel', { required: true })}
                            />
                            <h6 className="my-2 text-danger">{errors.cel?.type === 'required' && "Celular requerido"}</h6>
                          </Form.Group>
                        </section>
                      )}
                      {formStep === 2 && (
                        <section className={formStep === 2 ? 'block' : 'hidden'}>
                          <p>Paso {formStep} de {MAX_STEPS}</p>
                          <h4 className="font-semibold text-secondary text-3xl mb-4">Datos de envío</h4>

                          <Form.Group className="mb-3 col-lg-8">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                              className="shadow"
                              {...register('direccion', { required: true })}
                            />
                            <h6 className="my-2 text-danger">{errors.direccion?.type === 'required' && "Email requerido"}</h6>
                          </Form.Group>
                          <Form.Group className="col-lg-8 mt-3">
                            <Form.Label>Localidad</Form.Label>
                            <Form.Control
                              className="shadow"
                              {...register('localidad', { required: true })}
                            />
                            <h6 className="my-2 text-danger">{errors.localidad?.type === 'required' && "Nombre requerido"}</h6>
                          </Form.Group>
                          <Form.Group className="col-lg-8 mt-3">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control
                              className="shadow"
                              {...register('cp', { required: true })}
                            />
                            <h6 className="my-2 text-danger">{errors.cp?.type === 'required' && "Apellido requerido"}</h6>
                          </Form.Group>
                        </section>
                      )}
                      {formStep === 3 && (
                        <section className={formStep === 2 ? 'block' : 'hidden'}>
                          <p>Paso {formStep} de {MAX_STEPS}</p>
                          <h4 className="font-semibold text-secondary text-3xl mb-4">Confirmación del pedido</h4>
                          <Col>
                            <ul>
                              <li>Nombre: {watch().nombre}</li>
                              <li>Email: {watch().email}</li>
                              <li>Celular: {watch().cel}</li>
                              <li>Dirección de envío: {watch().direccion}</li>
                              <li>Localidad: {watch().localidad}</li>
                              <li>Codigo postal: {watch().cp}</li>
                            </ul>
                          </Col>
                          <Col>
                            <table className="table table-dark text-center table-secondary table-borderless">
                              <caption>
                                <p className="text-dark">Total: $ {subtotal().toLocaleString()}</p>
                              </caption>
                              {
                                cartList.map((item) =>
                                  <tbody className="text-center">
                                    <tr key={item.id}>
                                      <td>{item.title}</td>
                                      <td>x {item.cantidad}</td>
                                      <td>${(item.price).toLocaleString()}</td>
                                    </tr>
                                  </tbody>
                                )
                              }
                            </table>
                          </Col>
                        </section>
                      )}
                    </Col>
                  </Row>
                  <Row xs='12' className="mr-auto mt-4 d-flex">
                    {renderButtons()}
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </>
      }
    </>

  )
}
