import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
	const methods = useFormContext();
	// const isError = false;

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				control={methods.control}
				name={name}
				render={({ field }) => (
					<TextField
						fullWidth
						label={label}
						required
						{...methods.register(name)}
					/>
				)}
			/>
		</Grid>
	);
};

export default FormInput;
