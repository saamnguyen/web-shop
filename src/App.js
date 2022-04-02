import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";

import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();

		setProducts(data);
	};

	const fetchCart = async () => {
		//retrieve: lay tat ca cart object bao gom ca content
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);

		setCart(cart);
	};

	const handleUpdateCartQty = async (lineItemId, quantity) => {
		const { cart } = await commerce.cart.update(lineItemId, { quantity });
		//console.log("response: " + cart);

		setCart(cart);
	};

	const handleRemoveFromCart = async (lineItemId) => {
		const { cart } = await commerce.cart.remove(lineItemId);

		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();

		setCart(cart);
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	//console.log(products);
	console.log(cart);

	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Routes>
					<Route
						path="/"
						element={
							<Products products={products} onAddToCart={handleAddToCart} />
						}
					/>
					<Route
						path="/cart"
						element={
							<Cart
								cart={cart}
								handleUpdateCartQty={handleUpdateCartQty}
								handleRemoveFromCart={handleRemoveFromCart}
								handleEmptyCart={handleEmptyCart}
							/>
						}
					/>
					<Route path="/checkout" element={<Checkout />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
