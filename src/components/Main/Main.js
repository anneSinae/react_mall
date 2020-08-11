import React from "react";
import { Link } from 'react-router-dom';
import "components/Main/Main.css";

const Main = props => {
    if(props.products) {
        return <RenderProducts products={props.products}/>
    } else {
        return <RenderLoading />
    }
}

const RenderProducts = props => {
    return (
      <ul className="products">
      {props.products.map((product) => {
        return (
          <li className="product">
            <Link className="productImg" to={`/item/${product.id}`}><img src={product.image} alt="food"/></Link>
            <div className="productName">
              <p className="productTitle">{product.name}</p>
            </div>
            <p className="productPrice">{product.price.toLocaleString()} 원</p>
          </li>
        );
     })
    }
     </ul>
    )
};

const RenderLoading = props => (
    <div>Main Loading...</div>
);

export default Main;