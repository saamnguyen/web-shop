import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
	Elements,
	CardElement,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const PaymentForm = ({ checkoutToken }) => {
	return (
		<>
			<Review checkoutToken={checkoutToken} />
		</>
	);
};

export default PaymentForm;
