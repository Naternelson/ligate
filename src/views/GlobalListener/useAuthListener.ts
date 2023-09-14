// Required imports
import { Dispatch } from "@reduxjs/toolkit";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { userSignedIn, userSignedOut } from "../../redux/slices/auth";
import { AuthState } from "../../redux/store.type";
import { onSnapshot } from "firebase/firestore";
import { getDocRef } from "../../utility";
import { get } from "http";

export const useAuthListener = (dispatch: Dispatch) => {
	const [signedIn, setSignedIn] = useState<string | false>(false);

	// Listen for Firebase auth state changes
	useEffect(() => {
		// If user is authenticated, store the UID, otherwise store 'false'
		return onAuthStateChanged(getAuth(), (user) => {
			console.log({ user, message: "Signing in/out" })
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
				const user = getAuth().currentUser;
				if (!user) return;
				dispatch(userSignedIn(constructUser(user)));
			}
		});

		// Unsubscribe from the Firestore updates when hook is unmounted or UID changes
		return () => unsubscribe();
	}, [signedIn]);
};

const constructUser = (user: User): AuthState["user"] => {
	return {
		id: user.uid,
		displayName: user.displayName,
		email: user.email,
		emailVerified: user.emailVerified,
		isAnonymous: user.isAnonymous,
		phoneNumber: user.phoneNumber,
		photoURL: user.photoURL,
		tenantId: user.tenantId,
		uid: user.uid,
		unitID: null, 
		callingID: null,
		roleID: null,
	}
}