import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
	const { control } = useFormContext();
	// const isError = false;

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => <TextField fullWidth label={label} required />}
			/>
		</Grid>
	);
};

export default FormInput;
