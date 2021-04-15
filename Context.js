import { element } from "prop-types"
import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])    
    const [totalCost, setTotalCost] = useState(0.00)
    
    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, [])
    
    function toggleFavorite(id) {
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })
        
        setAllPhotos(updatedArr)
    }
    
    function updateCart(img) {
        cartItems.includes(img) 
            ?
            (setCartItems(prevItems => prevItems.filter(item => item.id != img.id)), 
            setTotalCost(prevCost => prevCost = 
                                            (cartItems.length - 1) * 5.99)) 
                :
                (setCartItems([...cartItems, img]),
                setTotalCost(prevCost => prevCost = 
                                                cartItems.length == 0 
                                                    ? 
                                                    prevCost = 5.99 
                                                        : 
                                                        prevCost = (cartItems.length + 1) * 5.99))
    }
    
    return (
        <Context.Provider value={{allPhotos, toggleFavorite, updateCart, cartItems, totalCost}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}