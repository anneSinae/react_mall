import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "components/Common/Header";
import Footer from "components/Common/Footer";
import Main from "components/Main/Main";
import Item from "components/Item/Item";
import Cart from "components/Member/Cart";
import Mypage from "components/Member/Mypage";
import { signIn } from 'components/Auth/Auth';
import AuthRoute from 'components/Auth/AuthRoute';
import LoginForm from 'components/Auth/LoginForm';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      quantity: 1,
      totalAmount: 0,
      user : null
    };
    this.renderProductDetail = this.renderProductDetail.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
  };
  

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

  renderProductDetail() {
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

  checkProduct(id) {
    console.log("checkProduct");
    let cart = this.state.cart;
    return cart.some(item => {
      return item.id === id;
    });
  };

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
    this.setState({ products : res.data })
  }
  _getCstmrs = async() => {
    const res = await axios.get('/get/cstmrs');
    this.setState({ products : res.data })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.cart !== this.state.cart) {
      localStorage.cart = JSON.stringify(this.state.cart);
    }
  }

  render() {
    
    const authenticated = this.state.user != null;
    const login = ({ email, password }) => this.setState({ user : signIn({ email, password }) });
    const logout = () => this.setState({ user : null });

    return (
      <div>
        <Nav authenticated={authenticated} logout={logout} />
        <Switch>
          <Route exact path="/"
            render={props => {
              return (
                <Main
                  products={this.state.products}
                />
              );
            }}
          />
          <Route exact path="/cart"
            render={props => {
              return (
                <Cart
                  cart={this.state.cart}
                  totalAmount={this.state.totalAmount}
                />
              );
            }}
          />
          {this.renderProductDetail()}
          
          <Route exact path="/login"
            render={props => (
              <LoginForm authenticated={authenticated} login={login} {...props} />
            )}
          />

          <AuthRoute
            authenticated={authenticated}
            path="/mypage"
            render={props => <Mypage user={this.state.user} {...props} />}
          />

          {/*
          <Route exact path="/mypage"
            render={props => {
              return (
                <Mypage user={this.state.user} />
              );
            }}
          />
          */}
        </Switch>

        <Footer />
      </div>
    );
  };
};


export default App;