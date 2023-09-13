// Required imports
import { Dispatch } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { userSignedIn, userSignedOut } from "../../redux/slices/auth";
import { AuthState } from "../../redux/store.type";
import { onSnapshot } from "firebase/firestore";
import { getDocRef } from "../../utility";

export const useAuthListener = (dispatch: Dispatch) => {
	const [signedIn, setSignedIn] = useState<string | false>(false);

	// Listen for Firebase auth state changes
	useEffect(() => {
		// If user is authenticated, store the UID, otherwise store 'false'
		return onAuthStateChanged(getAuth(), (user) => {
			setSignedIn(user ? user.uid : false);
		});
	}, []);

	// Listen for Firestore document changes based on the authenticated user's UID
	useEffect(() => {
		// If the user isn't signed in, dispatch the sign out action
		if (!signedIn) {
			dispatch(userSignedOut());
			return;
		}

		// Retrieve Firestore document reference for the authenticated user
		const docRef = getDocRef("users")(signedIn);

		// Subscribe to the user document updates in Firestore
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				dispatch(userSignedIn(doc.data() as AuthState["user"]));
			} else {
				dispatch(userSignedOut());
			}
		});

		// Unsubscribe from the Firestore updates when hook is unmounted or UID changes
		return () => unsubscribe();
	}, [signedIn]);
};
