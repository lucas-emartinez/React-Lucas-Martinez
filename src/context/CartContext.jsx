import { createContext, useContext, useState } from "react";


const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext)



export default function CartContextProvider({ children }) {

    const [cartList, setcartList] = useState([]);



    const isInCart = (id) => {
        return cartList.some(prod => prod.id === id)
    }

    const addToCart = (item) => {

        if(isInCart(item.id)){
            const prod = cartList.find((prod) => prod.id === item.id)
            const { cantidad } = prod
            prod.cantidad = item.cantidad + cantidad;
            const updatedCart = [...cartList]
            setcartList(updatedCart)
        } else {
            setcartList( [ ...cartList, item ] )
        }
    }

    const removeCart = () => {
        setcartList([])
    
    }

    const subtotal = () => {
        return cartList.reduce((acum, item) => acum = acum + (item.price * item.cantidad), 0)
    }

    const removeItem = (id) => {
        const itemToDelete = cartList.find((prod) => prod.id === id)
        if(itemToDelete){
            const index = cartList.indexOf(itemToDelete);
            cartList.splice(index, 1)
            setcartList([...cartList]);
        } 
    }

    return (
        <CartContext.Provider value={{
            cartList,
            addToCart,
            removeCart,
            removeItem,
            subtotal,
        }}>
            { children }
        </CartContext.Provider>
    )
}



