import React from "react";
import Grid from "@mui/material/Grid";

import Product from "./Product/Product";

const products = [
	{
		id: 1,
		name: "Shoes",
		description: "Running shoes",
		price: "$5",
		image:
			"https://images.unsplash.com/photo-1648604811255-ab3e6c5a4aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
	},
	{
		id: 2,
		name: "Macbook",
		description: "Apple macbook",
		price: "$5",
		image:
			"https://images.unsplash.com/photo-1648604811255-ab3e6c5a4aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
	},
	{
		id: 3,
		name: "Shoes",
		description: "Running shoes",
		price: "$5",
		image:
			"https://images.unsplash.com/photo-1648604811255-ab3e6c5a4aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
	},
];

const Products = () => {
	return (
		<main>
			<Grid container justifyContent="center" spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} />
					</Grid>
				))}
			</Grid>
		</main>
	);
};

export default Products;
