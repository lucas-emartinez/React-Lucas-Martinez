import { createContext, useContext, useState } from "react";


const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext)



export default function CartContextProvider({ children }) {

    const [cartList, setcartList] = useState([]);
    const [price, setPrice] = useState(0) 

    const addToCart = (item) => {
        setcartList( [ ...cartList, item ] )
        setPrice(price + (item.price * item.cantidad))
    }

    const removeCart = () => {
        setcartList([]);
        setPrice(0);
    }

    const removeItem = (id) => {
        const itemToDelete = cartList.find((prod) => prod.id === id)
        if(itemToDelete){
            const index = cartList.indexOf(itemToDelete);
            const priceDeleted = (itemToDelete.price * itemToDelete.cantidad);
            console.log(priceDeleted)
            cartList.splice(index, 1)
            setcartList([...cartList]);
            setPrice(price - priceDeleted)
        } 
    }

    return (
        <CartContext.Provider value={{
            cartList,
            price,
            setPrice,
            addToCart,
            removeCart,
            removeItem,
        }}>
            { children }
        </CartContext.Provider>
    )
}



