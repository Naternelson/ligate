import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ActionCodeSettings, connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDQeDgPytKJWVNRfT_6nQ0OWIacZhmTQV0",
	authDomain: "ligate-ff19a.firebaseapp.com",
	databaseURL: "https://ligate-ff19a-default-rtdb.firebaseio.com",
	projectId: "ligate-ff19a",
	storageBucket: "ligate-ff19a.appspot.com",
	messagingSenderId: "876609562804",
	appId: "1:876609562804:web:4524c2b2574b8a0dabcfe1",
	measurementId: "G-W7D8ZSC35M",
};

// Constants for emulator configuration
const AUTH_EMULATOR_URL = "http://localhost:9099";
const FIRESTORE_EMULATOR_HOST = "localhost";
const FIRESTORE_EMULATOR_PORT = 8080;

const initializeFirebaseApp = (useEmulators?: boolean): FirebaseApp => {
	const firebaseApp = initializeApp(firebaseConfig);

	if (useEmulators) {
		connectAuthEmulator(getAuth(firebaseApp), AUTH_EMULATOR_URL);
		connectFirestoreEmulator(getFirestore(firebaseApp), FIRESTORE_EMULATOR_HOST, FIRESTORE_EMULATOR_PORT);
	}

	return firebaseApp;
};

export const analyticsInstance = (app: FirebaseApp) => getAnalytics(app);

export default initializeFirebaseApp;

export const actionCodeSettings: ActionCodeSettings = {
	url: "http://localhost:3000/finishSignUp",
	handleCodeInApp: true,
	dynamicLinkDomain: "ligate-ff19a.firebaseapp.com",
};
