import React, { useState } from "react";
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

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
	const [activeStep, setActiveStep] = useState(0);

	const classes = useStyles();

	const Comfirmation = () => <div>Comfirmation</div>;

	const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

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
					{activeStep === steps.length ? <Comfirmation /> : <Form />}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
