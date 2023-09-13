import { Box, Button, ButtonProps, Divider, TextField, TextFieldProps, Typography, styled } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { actionCodeSettings } from "../../../firebase.config";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTempEmail } from "../../../redux/slices/auth";

const EmailForm = () => {
	const { form, onSubmit, emailField, submitButton, submitSuccess } = useSignupHook();

	return (
		<FormProvider {...form}>
			<StyledContainer as="form" onSubmit={onSubmit}>
				{!submitSuccess && (
					<>
						<TextField
							label="Email"
							type="email"
							variant="outlined"
							fullWidth
							size="small"
							{...emailField}
						/>

						<StyledContainer>
							<StyledTypography variant="overline">We will send you an email to login</StyledTypography>
							<StyledTypography variant="caption">No Password Necessary</StyledTypography>
						</StyledContainer>

						<Divider style={{ width: "100%" }} />
						<Button variant="contained" fullWidth {...submitButton}>
							Sign Up
						</Button>
					</>
				)}
				{submitSuccess && (
					<SubmitSuccessfulBox>
						<Divider style={{ width: "100%" }} />
						<Typography variant="overline">Check your email!</Typography>
						<Typography variant="body1" color={"GrayText"}>
							We sent you a link to sign in.
						</Typography>
						<Button variant="text" component={Link} to="/">
							Home
						</Button>
					</SubmitSuccessfulBox>
				)}
			</StyledContainer>
		</FormProvider>
	);
};

const SubmitSuccessfulBox = styled(Box)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	inset: 0,
	gap: "1rem",
	backgroundColor: "rgb(255,255,255)",
});

const StyledContainer = styled(Box)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	gap: "1rem",
	position: "relative",
});

const StyledTypography = styled(Typography)({
	color: "GrayText",
});

const useSignupHook = () => {
    const dispatch = useDispatch();
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const form = useForm({ mode: "onChange", defaultValues: { email: "" } });
	const { formState, handleSubmit, getFieldState, register } = form;
	const disableSubmit = formState.isSubmitting || getFieldState("email").invalid;

	const onSubmit = handleSubmit(async (data) => {
		await sendEmailLink(data.email, dispatch);
		setSubmitSuccess(true);
		form.clearErrors();
		form.reset();
	});

	const emailField: TextFieldProps = {
		...register("email", {
			required: true,
			pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
		}),
		error: !!formState.errors.email,
		helperText: formState.errors.email?.message?.toString(),
		disabled: formState.isSubmitting,
	};

	const submitButton: ButtonProps = { disabled: disableSubmit, type: "submit" };

	return { form, onSubmit, emailField, submitButton, submitSuccess };
};

export default EmailForm;

const sendEmailLink = async (email: string, dispatch:ReturnType<typeof useDispatch>) => {
	// Send an email link to signup or signin a user through Firebase Auth
	const auth = getAuth();
    const customActionCode = {
        ...actionCodeSettings,
        url: `${actionCodeSettings.url}/finishSignup?email=${encodeURIComponent(email)}`,
    }
	try {
		await sendSignInLinkToEmail(auth, email, customActionCode);
		dispatch(setTempEmail(email))
	} catch (err) {
		console.log("error", err);
	}
};
