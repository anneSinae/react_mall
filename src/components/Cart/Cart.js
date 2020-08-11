import React from "react";
import "./Cart.css";

const Cart = props => {
    if(props.products) {

    } else {
        return <RenderLoading />
    }
}

const RenderLoading = props => (
    <div>Cart Loading...</div>
);

export default Cart;