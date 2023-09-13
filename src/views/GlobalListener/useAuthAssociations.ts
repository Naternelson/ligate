import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectUser, selectUserSignedIn, setUserCalling, setUserRole, setUserUnit } from "../../redux/slices/auth";
import { useEffect } from "react";
import { RequireProperty } from "../../utility";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { Calling, Role, Unit } from "../../redux/store.type";
import { insertUnits } from "../../redux/slices/units";

/**
 * A custom hook that listens to authentication-related changes.
 * Specifically, it tracks units, callings, and roles associated with the authenticated user.
 *
 * @param {Dispatch} dispatch - Redux's dispatch function.
 */
export const useAuthAssociations = (dispatch: Dispatch) => {
	const signedIn = useSelector(selectUserSignedIn);
	const { unitID, callingID, roleID } = useSelector(selectUser) || {};

	/**
	 * Effect that listens to changes in the units associated with the authenticated user.
	 */
	useEffect(() => {
		if (!signedIn) return;
		if (!unitID) return dispatch(setUserUnit(null)), undefined;
		// Create a query for the units the user is assigned to
		const q = query(collection(getFirestore(), "units"), where("id", "in", unitID));
		// Subscribe to the query snapshot
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const units: RequireProperty<Unit, "id">[] = [];
			querySnapshot.forEach((doc) => {
				units.push(doc.data() as RequireProperty<Unit, "id">);
			});
			dispatch(setUserUnit(units));
			dispatch(insertUnits(units));
		});
		return () => unsubscribe();
	}, [dispatch, signedIn, unitID?.join("")]);

	/**
	 * Effect that listens to changes in the callings associated with the authenticated user.
	 */
	useEffect(() => {
		if (!signedIn) return;
		if (!callingID) return dispatch(setUserCalling(null)), undefined;
		// Create a query for the callings the user is assigned to
		const q = query(collection(getFirestore(), "callings"), where("id", "in", callingID));
		// Subscribe to the query snapshot
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const callings: Calling[] = [];
			querySnapshot.forEach((doc) => {
				callings.push(doc.data() as Calling);
			});
			dispatch(setUserCalling(callings));
		});
		return () => unsubscribe();
	}, [dispatch, callingID]);

	/**
	 * Effect that listens to changes in the roles associated with the authenticated user.
	 */
	useEffect(() => {
		if (!signedIn) return;
		if (!roleID) return dispatch(setUserRole(null)), undefined;
		// Create a query for the roles the user is assigned to
		const q = query(collection(getFirestore(), "roles"), where("id", "in", roleID));
		// Subscribe to the query snapshot
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const roles: Role[] = [];
			querySnapshot.forEach((doc) => {
				roles.push(doc.data() as Role);
			});
			dispatch(setUserRole(roles));
		});
		return () => unsubscribe();
	}, [dispatch, roleID]);
};
