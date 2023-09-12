import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<AppBar position="fixed" color="transparent" elevation={0}>
			<Toolbar>
				<Typography variant={"h6"}>Ligate</Typography>
				<Box style={{ display: "flex", flexDirection: "row" }}>
					<Link component={NavLink} to={"/home"} variant="subtitle2" underline="none">
						Home
					</Link>
					<Link component={NavLink} to={"/about"} variant="subtitle2" underline="none">
						About
					</Link>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
