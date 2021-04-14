import React, {useState, useContext} from "react"
import PropTypes from "prop-types"

import {Context} from "../Context"

function Image({className, img}) {
    const [hovered, setHovered] = useState(false)
    const {toggleFavorite, updateCart, cartItems} = useContext(Context)
    
    const heartIcon = img.isFavorite ? 
        <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i> : 
        hovered && <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i> 
    
    const cartIcon = cartItems.includes(img) ? 
        <i className="ri-shopping-cart-fill cart" onClick={() => updateCart(img)}></i> : 
        hovered && <i className="ri-add-circle-line cart" onClick={() => updateCart(img)}></i>
    
    
    return (
        <div 
            className={`${className} image-container`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img src={img.url} className="image-grid"/>
            {heartIcon}
            {cartIcon}
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool,
        isAdded: PropTypes.bool
    })
}

export default Image
