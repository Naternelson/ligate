import { useForm } from "react-hook-form";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./App.css"

function App() {
	const f = useForm();
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
