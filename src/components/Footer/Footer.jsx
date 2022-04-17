import React from "react"
import { Link } from "react-router-dom"
import Facebook from "../Widget/Facebook"
import Instagram from "../Widget/Instagram"
import Tiktok from "../Widget/Tiktok"
export default function Footer() {
    return (
                <footer className="footer bg-footer text-white pt-5 ">
                    <div className="container text-center text-md-left">
                        <div className="row text-center text-md-left">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h5 className="text-uppercase mb-4 font-weight-bold text-dark">UAVProject</h5>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h5 className="text-uppercase mb-4 font-weight-bold text-dark">Productos</h5>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/category/drones'>Drones</Link>
                                </p>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/category/batteries'>Baterias</Link>
                                </p>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/category/propellers'>Helices</Link>
                                </p>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/category/gimbals'>Gimbals</Link>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h5 className="text-uppercase mb-4 font-weight-bold text-dark">Links</h5>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/'>Inicio</Link>
                                </p>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/cart'>Carrito</Link>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h5 className="text-uppercase mb-4 font-weight-bold text-dark">Contacto</h5>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/'><Facebook /></Link>
                                </p>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/'><Instagram /></Link>
                                </p>
                                <p>
                                    <Link className="text-decoration-none text-dark" to='/'><Tiktok /></Link>
                                </p>
                            </div>

                            <hr />

                            <div className="row mt-4">
                                <div className="col-md-12 col-lg-12 text-dark">
                                    <p>Copyright @2022 - Todos los derechos reservados - UAVProject</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            )
}
