import { Box, Button, Divider, Paper, TextField, Typography, styled } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {ActionCodeSettings, getAuth, sendSignInLinkToEmail} from "firebase/auth";
import EmailForm from "./form/EmailForm";

const StyledView = styled(Box)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "100vh",
});

export const SignupView = () => {
	return (
		<StyledView>
			<StyledBox elevation={10}>
				<StyledTitleCard elevation={14}>
					<Typography variant={"h4"} textTransform={"uppercase"} fontSize={"1rem"} letterSpacing={".3rem"}>
						Sign Up
					</Typography>
					<Divider />
					<Typography variant={"body2"}>Google</Typography>
				</StyledTitleCard>
				<FormContainerBox />
			</StyledBox>
		</StyledView>
	);
};

const StyledBox = styled(Paper)({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	position: "relative",
	width: "400px",
	height: "400px",
	backgroundColor: "white",
	borderRadius: "1rem",
	boxSizing: "border-box",
	paddingBottom: "2rem",
});

const StyledTitleCard = styled(Paper)(({ theme }) => ({
	display: "flex",
	paddingTop: "1rem",
	paddingBottom: "1rem",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: ".5rem",
	position: "relative",
	top: "-2rem",
	width: "90%",
	minHeight: "2rem",
	height: "auto",
	borderRadius: "2rem",
	backgroundColor: theme.palette.primary.main,
	backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 150%)`,
	color: theme.palette.primary.contrastText,
}));

const FormContainer = styled(Box)({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "1rem",
	width: "80%",
	color: "black",
});

const FormContainerBox = () => {
	return (
		<FormContainer>
			<Typography variant="h2" textTransform={"uppercase"} color="slategrey">
				Ligate
			</Typography>
			<EmailForm />
		</FormContainer>
	);
};

