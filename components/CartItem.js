import React, {useState, useContext} from "react"
import {Context} from "../Context"

function CartItem({item}) {
    const {updateCart} = useContext(Context)
    const [hovered, setHovered] = useState(false)


    return (
        <div className="cart-item">
            <i className={`ri-delete-bin-${hovered ? 'fill' : 'line'}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => updateCart(item)}></i>
            <img src={item.url} width="130px" />
            <p>$5.99</p>
        </div>
    )
}

export default CartItem