import React from "react";
import { Link } from 'react-router-dom';

const Main = props => {
    if(props.products) {
        return <RenderProducts products={props.products}/>
    } else {
        return <RenderLoading />
    }
}

const RenderProducts = props => {
    return (
      <div className="main">

        {/*<div className="banner">
          <img src="https://img.styleonme.com/onme_banner/2020/09/1518aea8930193caee952ff601ec351515997271720407.jpg" alt="banner" />
    </div>*/}

        <div className="bestItems">
          <h3>Best 상품</h3>
          <ul className="products">
            {props.products.map((product) => {
                return (
                  <li className="product" key={product.id}>
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
        </div>
        
        <div className="recently">
        <h3>최신 상품</h3>
          <ul className="products">
            {props.products.map((product) => {
                return (
                  <li className="product" key={product.id}>
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
        </div>
     </div>
    )
};

const RenderLoading = props => (
    <div>Main Loading...</div>
);

export default Main;