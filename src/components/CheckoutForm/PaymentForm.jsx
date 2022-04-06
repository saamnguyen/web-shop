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

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
	checkoutToken,
	backStep,
	nextStep,
	onCaptureCheckout,
	shippingData,
}) => {
	const options = {
		// passing the client secret obtained from the server
		clientSecret: process.env.REACT_APP_STRIPE_PRIVATE_KEY,
	};
	// console.log("PaymentForm");
	// console.log(checkoutToken);

	// console.log("shippingData");
	// console.log(shippingData);
	const handleSubmit = async (event, elements, stripe) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		// console.log("PayMethod: ");
		// console.log(paymentMethod);

		if (error) {
			console.log("[error]", error);
			return;
		}
		try {
			const orderData = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email,
				},
				shipping: {
					name: "International",
					street: shippingData.address1,
					town_city: shippingData.city,
					county_state: shippingData.shippingSubdivision,
					postal_zip_code: shippingData.zip,
					country: shippingData.shippingCountry,
				},
				fulfillment: { shipping_method: shippingData.shippingOption },
				payment: {
					gateway: "stripe",
					stripe: {
						payment_method_id: paymentMethod.id,
					},
				},
			};
			// console.log("Order data:");
			// console.log(orderData);

			onCaptureCheckout(checkoutToken.id, orderData);
			nextStep();
		} catch (response) {
			console.log(response);
			return;
		}
	};

	return (
		<>
			<Review checkoutToken={checkoutToken} />
			<Divider />
			<Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
				Payment method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
							<CardElement />
							<br /> <br />
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<Button variant="outlined" onClick={backStep}>
									Back
								</Button>
								<Button
									type="submit"
									variant="contained"
									disabled={!stripe}
									color="primary"
								>
									Pay {checkoutToken.live.subtotal.formatted_with_symbol}
								</Button>
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

export default PaymentForm;
