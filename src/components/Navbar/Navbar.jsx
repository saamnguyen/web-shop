import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/commerce.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
	const classes = useStyles();
	const location = useLocation();

	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography
						component={Link}
						to="/"
						className={classes.title}
						variant="h6"
						color="inherit"
					>
						<img
							src={logo}
							alt="commerse.js"
							className={classes.image}
							height="25px"
						/>{" "}
						Commerce.js
					</Typography>
					<div className={classes.grow} />
					{location.pathname === "/" && (
						<div className={classes.button}>
							<IconButton
								aria-label="Show cart items"
								color="inherit"
								component={Link}
								to="/cart"
							>
								<Badge badgeContent={totalItems} color="secondary">
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
