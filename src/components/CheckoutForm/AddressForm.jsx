import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, next }) => {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");
	const methods = useForm();

	const { register } = useForm();

	const onSubmit = (data) => {
		console.log("onSubmit:");
		console.log(data);
	};

	// console.log("Country");
	// console.log(shippingCountry);
	// console.log("Sub");
	// console.log(shippingSubdivision);
	// console.log("shippingOption");
	// console.log(shippingOption);

	// const countries1 = Object.entries(shippingCountries);
	// console.log(countries1);

	// const countries = Object.entries(shippingCountries).map(([code, name]) => ({
	// 	id: code,
	// 	label: name,
	// }));
	// console.log(countries);

	const subdivisions = Object.entries(shippingSubdivisions).map(
		([code, name]) => ({
			id: code,
			label: name,
		})
	);
	//console.log(subdivisions);

	const options = shippingOptions.map((sO) => ({
		id: sO.id,
		label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
	}));
	// console.log("Options");
	// console.log(shippingOptions);

	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);

		// console.log("Country: ");
		// console.log(countries);

		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubdivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);

		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
		console.log("Subdivis");
		console.log(subdivisions);

		console.log("Subdivi");
		console.log(shippingSubdivision);
	};

	const fetchShippingOptions = async (
		checkoutTokenId,
		country,
		region = null
	) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country, region }
		);
		console.log("Options: ");
		console.log(options);

		setShippingOptions(options);
		setShippingOption(options[0].id);
		console.log("shippingOption:");
		console.log(shippingOption);
		console.log("shippingOptions:");
		console.log(shippingOptions);
	};

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision)
			fetchShippingOptions(
				checkoutToken.id,
				shippingCountry,
				shippingSubdivision
			);
	}, [shippingSubdivision]);

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) => {
						next({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption,
						});
						console.log("AddressForm");
						console.log({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption,
						});
					})}
				>
					<Grid container spacing={3}>
						<FormInput required name="firstName" label="First Name" />
						<FormInput required name="lastName" label="Last Name" />
						<FormInput required name="address1" label="Address" />
						<FormInput required name="email" label="Email" />
						<FormInput required name="city" label="City" />
						<FormInput required name="zip" label="Zip / Postal code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(e) => setShippingCountry(e.target.value)}
							>
								{Object.entries(shippingCountries)
									.map(([code, name]) => ({ id: code, label: name }))
									.map((item) => (
										<MenuItem key={item.key} value={item.id}>
											{item.label}
										</MenuItem>
									))}
								{/* {console.log(Object.entries(shippingCountries))} */}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(e) => setShippingSubdivision(e.target.value)}
							>
								{subdivisions.map((subdivision) => (
									<MenuItem key={subdivision.key} value={subdivision.id}>
										{subdivision.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(e) => setShippingOption(e.target.value)}
							>
								{options.map((option) => (
									<MenuItem key={option.key} value={option.id}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />

					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button component={Link} to="/cart" variant="outlined">
							Back to Cart
						</Button>
						<Button type="submit" variant="contained" color="primary">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
