import { element } from "prop-types"
import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])    
    const [totalCost, setTotalCost] = useState(0.00)
    const [ordering, setOrdering] = useState(false)
    const [ordered, setOredered] = useState(false)
    
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
            setTotalCost(prevCost => prevCost = (cartItems.length - 1) * 5.99)) 
                :
                (setCartItems([...cartItems, img]),
                setTotalCost(prevCost => prevCost = 
                                                cartItems.length == 0 
                                                    ? 
                                                    prevCost = 5.99 
                                                        : 
                                                        prevCost = (cartItems.length + 1) * 5.99))
    }
    
    function order(){
        setOrdering(true)
        setTimeout(()=>{
            setOrdering(false)
            setCartItems([])
            setTotalCost(0.00)
            setOredered(true)
        }, 1000)
    }
    
    function dissmissOrdered(){
        setOredered(false)
    }
    
    return (
        <Context.Provider value={{allPhotos, toggleFavorite, updateCart, cartItems, totalCost, order, ordering, ordered, dissmissOrdered}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}