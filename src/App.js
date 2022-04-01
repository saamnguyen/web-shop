import React, { useEffect, useState } from "react";

// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";

import { Products, Navbar } from "./components";
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
		const item = await commerce.cart.add(productId, quantity);

		setCart(item.cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	//console.log(products);
	console.log(cart);

	return (
		<div>
			<Navbar totalItems={cart.total_items} />
			<Products products={products} onAddToCart={handleAddToCart} />
		</div>
	);
};

export default App;
