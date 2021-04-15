import React, {useContext} from "react"
import {Context} from "../Context"
import CartItem from "../components/CartItem"
import {Switch, Route} from "react-router-dom"


function Cart() {
    const {cartItems, totalCost, order, ordering, ordered, dissmissOrdered} = useContext(Context)
    const cartItemElements = cartItems.map(item => (
        <CartItem key={item.id} item={item}/>
    ))
    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {totalCost} </p>
            <div className="order-button">
                {ordered ? 
                        <div>
                            <p>Order sucessfull</p> 
                            <button onClick={dissmissOrdered}>dissmiss</button>
                            <br />
                        </div> 
                        : null}
                {cartItems.length == 0 ? 
                    <button onClick={() => window.location.href = '/'}>
                        cart empty <br /><br /> 
                        back to Main?
                    </button> :
                <button onClick={() => order()}>{ordering ? 'ordering...' : 'Place Order'}</button>}
            </div>
        </main>
    )
}

export default Cart