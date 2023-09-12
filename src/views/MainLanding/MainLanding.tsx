import styled from "@emotion/styled";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import HeroBanner, { HeroBannerProps } from "../../components/Hero";
import { heroImages } from "./HeroImages";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";


const MainLandingView = () => {
	const heroProps: HeroBannerProps = {
		title: "Ligate",
		subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		variant: "right-left",
		image: heroImages,
		cta: <CallToAction />,
	};
	return (
		<Box>
            <NavBar/>
			<HeroBanner {...heroProps} />
		</Box>
	);
};

const CalledToActionGroup = styled(Box)({
    display: "flex",
    gap: "1rem",
    marginTop: "1rem"
});

const CallToAction = () => {
	return (
		<CalledToActionGroup>
			{/* <Link component={NavLink} variant="button" to={"/signup"}>Sign Up</Link> */}
			<Button component={Link}  to="/signup" variant={"contained"}>
				Sign Up
			</Button>
			<Button>Learn More</Button>
		</CalledToActionGroup>
	);
};

export default MainLandingView;
