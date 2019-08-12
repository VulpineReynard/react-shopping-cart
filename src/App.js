import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from '../src/Contexts/ProductContext';
import { CartContext } from '../src/Contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const removeItem = (targetId) => {
		setCart(cart.filter((item, index) => index !== targetId));
	}

	const addItem = item => {
		setCart([...cart, item]);
	};

	return (
		<div className="App">
			<CartContext.Provider value={{ cart }}>
				<Navigation cart={cart} />
			</CartContext.Provider>
				
			{/* Products Route with ProductContext values */}
			<ProductContext.Provider value={{ products, addItem }}>
				<Route exact path="/" component={Products} />
			</ProductContext.Provider>

			{/* Shopping Cart Route with CartContext values */}
			<CartContext.Provider value={{ cart, setCart, removeItem }}>
				<Route path="/cart" component={ShoppingCart} />
			</CartContext.Provider>

		</div>
	);
}

export default App;
