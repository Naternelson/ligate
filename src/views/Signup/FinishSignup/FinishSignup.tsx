import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { clearTempEmail, selectTempEmail } from "../../../redux/slices/auth";
import { useEffect } from "react";
import { useURLQuery } from "../../../utility";
import { Box, Divider, Toolbar, Typography, styled } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const FinishSignupViewStyled = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100vh",
	backgroundColor: theme.palette.background.default,
}));

export const FinishSignup = () => {
	useSigninLinkHandler();
	const ctx = useForm({
		defaultValues: {
			
		}
	})
	return (
		<FinishSignupViewStyled>
			<Toolbar />
			<Typography variant="h5" component="h1" gutterBottom>
				Let's finish signing you up!
			</Typography>
			<Divider />

		</FinishSignupViewStyled>
	);
};

const useSigninLinkHandler = async () => {
	const dispatch = useDispatch();
	const urlQuery = useURLQuery();
	const tempEmail = useSelector(selectTempEmail);
	const isLink = isSignInWithEmailLink(getAuth(), window.location.href);
	const appEmail = urlQuery.get("email") || tempEmail;
	useEffect(() => {
		console.log({isLink, appEmail})
		async function signin(email: string) {
			try {
				const u = await signInWithEmailLink(getAuth(), email, window.location.href);
				console.log(u);
				dispatch(clearTempEmail());
			} catch (error) {
				console.error(error);
			}
		}
		if (isLink && appEmail) signin(appEmail);
		if (isLink && !appEmail) console.error("No email provided");
	}, [appEmail, isLink, dispatch]);


};
