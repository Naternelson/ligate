import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import members from "./slices/members";
import units from "./slices/units";

const store = configureStore({
	reducer: {
		auth,
		members,
		units,
	},
});

export default store;