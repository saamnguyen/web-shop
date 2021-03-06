import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});
	// console.log(activeStep);

	const classes = useStyles();
	let navigate = useNavigate();

	const nextStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		// console.log(activeStep);
	};
	const backStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		// console.log(activeStep);
	};

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				// console.log("Token: ");
				// console.log(token);
				setCheckoutToken(token);
			} catch (error) {
				navigate("/");
			}
		};
		generateToken();
	}, [cart]);

	const next = (data) => {
		setShippingData(data);

		nextStep();
	};

	let Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant="h5">
						Thank you for purchase, {order.customer.firstname}{" "}
						{order.customer.lastname}
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">
						Order ref: {order.customer_reference}
					</Typography>
				</div>
				<br />
				<Button component={Link} variant="outlined" type="button" to="/">
					Back to home
				</Button>
			</>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		);

	if (error) {
		Confirmation = () => (
			<>
				<Typography variant="h5">Error: {error}</Typography>
				<br />
				<Button component={Link} variant="outlined" type="button" to="/">
					Back to home
				</Button>
			</>
		);
	}

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				setShippingData={setShippingData}
				next={next}
			/>
		) : (
			<PaymentForm
				shippingData={shippingData}
				checkoutToken={checkoutToken}
				backStep={backStep}
				nextStep={nextStep}
				onCaptureCheckout={onCaptureCheckout}
			/>
		);

	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout} style={{ padding: "50px 20px 0" }}>
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
						<Confirmation />
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
