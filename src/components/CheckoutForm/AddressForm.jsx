import React, { useState } from "react";
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

const AddressForm = () => {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");
	const methods = useForm();

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping address
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit="">
					<Grid container spacing={3}>
						<FormInput required name="firstName" label="First Name" />
						<FormInput required name="lastName" label="Last Name" />
						<FormInput required name="address1" label="Address line 1" />
						<FormInput required name="email" label="Email" />
						<FormInput required name="city" label="City" />
						<FormInput required name="zip" label="Zip / Postal code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value="" fullWidth onChange="">
								<MenuItem key="" value="">
									Select me
								</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select value="" fullWidth onChange="">
								<MenuItem key="" value="">
									Select me
								</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value="" fullWidth onChange="">
								<MenuItem key="" value="">
									Select me
								</MenuItem>
							</Select>
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
