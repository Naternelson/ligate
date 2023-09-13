import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalListener } from "./views/GlobalListener";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GlobalListener>
					<ThemeProvider theme={theme}>
						<RouterProvider router={router} />
					</ThemeProvider>
				</GlobalListener>
			</PersistGate>
		</Provider>
	);
}

export default App;
