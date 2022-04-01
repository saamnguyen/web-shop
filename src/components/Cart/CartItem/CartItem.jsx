import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import useStyles from "./styles";

const CartItem = ({ item }) => {
	const classes = useStyles();

	return (
		<Card>
			<CardMedia
				image={item.image.url}
				alt={item.name}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h5">
					{item.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cartActions}>
				<div className={classes.buttons}>
					<Button type="button" size="small">
						-
					</Button>
					<Typography>&nbsp;{item.quantity}&nbsp;</Typography>
					<Button type="button" size="small">
						+
					</Button>
				</div>
				<Button variant="contained" type="button" color="secondary">
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
