import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({
	cart,
	handleUpdateCartQty,
	handleRemoveFromCart,
	handleEmptyCart,
}) => {
	const classes = useStyles();
	// const isEmpty = cart.line_items.length === 0;
	// const isEmpty = !cart.line_items.length;

	// const handleEmptyCart = () => {
	// 	onEmptyCart();
	// };

	const EmptyCart = () => (
		<Typography variant="subtitle1">
			You have no items in your shopping cart, start adding some!
			<br />
			<Link className={classes.link} to="/">
				Start adding some
			</Link>
		</Typography>
	);

	if (!cart.line_items) return "Loading";

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((lineItem) => (
					<Grid item xs={12} sm={4} key={lineItem.id}>
						<CartItem
							item={lineItem}
							onUpdateCartQty={handleUpdateCartQty}
							onRemoveFromCart={handleRemoveFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size="large"
						type="button"
						variant="contained"
						color="secondary"
						onClick={handleEmptyCart}
					>
						Empty Cart
					</Button>

					<Button
						className={classes.checkoutButton}
						size="large"
						type="button"
						variant="contained"
						color="primary"
						component={Link}
						to="/checkout"
					>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);
	return (
		<Container style={{ padding: "70px" }}>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
