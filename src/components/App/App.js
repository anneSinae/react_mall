import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "components/Nav/Nav";
import Cart from "components/Cart/Cart";
import Main from "components/Main/Main";
import Item from "components/Item/Item";
import data from "MOCK_DATA.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data
    };
    this.renderFoodDetail = this.renderFoodDetail.bind(this);

  };

  //제품을 map함수를 이용해 렌더링한다.
  renderFoodDetail() {
    return this.state.products.map(product => {
      return (
        <Route
          exact
          path={`/item/${product.id}`}
          render={props => {
            return (
              <Item
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
          {this.renderFoodDetail()}
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    );
  };
};


export default App;