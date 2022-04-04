import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);

	const classes = useStyles();

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				console.log("Token: ");
				console.log(token);
				setCheckoutToken(token);
			} catch {}
		};
		generateToken();
	}, [cart]);

	const Comfirmation = () => <div>Comfirmation</div>;

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkoutToken={checkoutToken} />
		) : (
			<PaymentForm />
		);

	return (
		<>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Comfirmation />
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
