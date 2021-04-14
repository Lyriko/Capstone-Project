import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    
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
    
    function addToCart(img) {
        cartItems.includes(img) ? alert('item already added') : setCartItems([...cartItems, img])
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === img.id) {
                if(!photo.isAdded) {
                    photo.isAdded = true
                }            
            }
            return photo
        })
        setAllPhotos(updatedArr)
    }
    
    return (
        <Context.Provider value={{allPhotos, toggleFavorite, addToCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}