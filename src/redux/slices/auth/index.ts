import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, Unit, Calling, Role, AppState } from "../../store.type";
// Initial state for the auth slice.
const initialState: AuthState = {};
type User = AuthState["user"]
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Handles user signing in.
		userSignedIn: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.userSignedIn = true;
		},
		// Handles user signing out.
		userSignedOut: (state) => {
			return { tempEmail: state.tempEmail};
		},
		// Sets the user's associated unit. If no unit is assigned, sets to null.
		setUserUnit: (state, action: PayloadAction<Unit[] | null>) => {
			state.unit = action.payload;
		},
		// Sets the user's associated calling. If no calling is assigned, sets to null.
		setUserCalling: (state, action: PayloadAction<Calling[] | null>) => {
			state.calling = action.payload;
		},
		// Sets the user's associated role. If no role is assigned, sets to null.
		setUserRole: (state, action: PayloadAction<Role[] | null>) => {
			state.role = action.payload;
		},
		setTempEmail: (state, action: PayloadAction<string>) => {
			state.tempEmail = action.payload;
		},
		clearTempEmail: (state) => {
			state.tempEmail = undefined;
		},
	},
});

// Export actions to be used in components/dispatches.
export const { userSignedIn, userSignedOut, setUserUnit, setUserCalling, setUserRole, setTempEmail, clearTempEmail } =
	authSlice.actions;

// Export the reducer for the store.
export default authSlice.reducer;

// Selectors
export const selectUser = (state: AppState) => state.auth?.user;
export const selectUserSignedIn = (state: AppState) => state.auth?.userSignedIn;
export const selectUserUnit = (state: AppState) => state.auth?.unit;
export const selectUserCalling = (state: AppState) => state.auth?.calling;
export const selectUserRole = (state: AppState) => state.auth?.role;
export const selectTempEmail = (state: AppState) => state.auth?.tempEmail;
