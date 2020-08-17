import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "components/Nav/Nav";
import Cart from "components/Cart/Cart";
import Main from "components/Main/Main";
import Item from "components/Item/Item";
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      quantity: 1,
      totalAmount: 0
    };
    this.renderFoodDetail = this.renderFoodDetail.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
  };

  //장바구니에 선택한 물품을 추가하는 method
  handleAddToCart(selectedProducts) {
    console.log("handleAddToCart");
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(item => {
        return item.id === productID;
      });
      cartItem[index].quantity += 1;
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
      this.setState({
        cart: cartItem,
        quantity: 1
      });
    }
  }

  //제품을 map함수를 이용해 렌더링한다.
  renderFoodDetail() {
    console.log("renderFoodDetail");
    return this.state.products.map(product => {
      return (
        <Route
          exact
          key={product.id}
          path={`/item/${product.id}`}
          render={props => {
            return (
              <Item
                addToCart={this.handleAddToCart}
                productQuantity={this.state.quantity}
                image={product.image}
                name={product.name}
                price={product.price}
                id={product.id}
                key={product.id}
              />
            );
          }}
        />
      );
    });
  }

  //장바구니에 이미 제품이 있는지 확인하는 method
  checkProduct(id) {
    console.log("checkProduct");
    let cart = this.state.cart;
    return cart.some(item => {
      return item.id === id;
    });
  };

  // 장바구니에 담긴 물품들의 가격 총합을 구하는 method
  sumTotalAmount() {
    let cart = this.state.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].checked === true) {
        total += cart[i].price * Number(cart[i].quantity);
      }
    }
    this.setState({
      totalAmount: total
    });
  }

  componentDidMount() {
    //cart state가 local storage에 있으면 불러오기
    console.log("componentDidMount");
    let cart = localStorage.cart;
    if(cart) {
      this.setState(prevState => ({
        cart: JSON.parse(cart)
      }), function() {
        this.sumTotalAmount();
      })
    }
    this._getProducts();
  };

  _getProducts = async() => {
    const res = await axios.get('/api/products');
    const resData = res.data.products;
    this.setState({ products : resData })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.cart !== this.state.cart) {
      localStorage.cart = JSON.stringify(this.state.cart);
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Main
                  products={this.state.products}
                />
              );
            }}
          />
          <Route
            exact
            path="/cart"
            render={props => {
              return (
                <Cart
                  cart={this.state.cart}
                  totalAmount={this.state.totalAmount}
                />
              );
            }}
          />
          {this.renderFoodDetail()}
        </Switch>
      </div>
    );
  };
};


export default App;