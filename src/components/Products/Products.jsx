import React from "react";
import Grid from "@mui/material/Grid";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = ({ products, onAddToCart }) => {
	const classes = useStyles();

	return (
		<main className={classes.content} style={{ padding: "70px" }}>
			<div className={classes.toolbar}></div>
			<Grid container justifyContent="center" spacing={4} bgcolor="default">
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} onAddToCart={onAddToCart} />
					</Grid>
				))}
			</Grid>
		</main>
	);
};

export default Products;
