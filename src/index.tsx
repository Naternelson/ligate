import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import initializeFirebase from "./firebase.config";

// Initialize Firebase before rendering the React app
initializeFirebase(true); // true for disabling emulators

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// Performance measuring
reportWebVitals();
