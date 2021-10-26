import React, { createContext, useState } from "react";
import "./styles.css";
import { Route } from "react-router-dom";

import Products from "./components/Products";
import Cart from "./components/Cart";

import { data } from "./data";

export const BooksContext = createContext();

export default function App() {

  const [state, setState] = useState({
    bookList: data,
    cart: []
  })

  const totalCartCount = state.cart.reduce( (total, book)=> (total = total + book.count),0)

  // Spread operator
  // find(), map(), filter(), reduce()

  const addToCart = book => setState({
    ...state,
    cart: state.cart.find(cartItem=> cartItem.id === book.id)
    ? state.cart.map(cartItem => cartItem.id === book.id ? {...cartItem, count: cartItem.count+1} : cartItem)
    : [...state.cart, {...book, count: 1}]
  })

  const removeFromCart = id => setState({
    ...state,
    cart: state.cart.filter(cartItem => cartItem.id !== id)
  })


  const increase = id =>{
    setState({
      ...state,
      cart: state.cart.map(cartItem => cartItem.id === id ? {...cartItem, count: 
        cartItem.count + 1}: cartItem)
    })
  }

  const decrease = id =>{
    setState({
      ...state,
      cart: state.cart.map(cartItem => cartItem.id === id ? {...cartItem, count: 
        cartItem.count >1 ? cartItem.count - 1 : 1}: cartItem )
    })
  }

  return (
    <BooksContext.Provider value={{state: state, addToCart, increase, decrease, removeFromCart,totalCartCount}}>
      <div className="App">
        <h1>
          Alışveriş Sepeti 
        </h1>
        <Route exact path="/" component={Products} />
        <Route path="/cart" component={Cart} />
      </div>
    </BooksContext.Provider>
  );
}
