import { configureStore } from "@reduxjs/toolkit";
import {
	createTransform,
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./slices/auth";
import unitsReducer from "./slices/units";
import membersReducer from "./slices/members";
import { AuthState } from "./store.type";

// Define a transformation for the nested 'tempEmail' property.
const NestedTempEmailTransform = createTransform<AuthState, { tempEmail?: string }>(
	// On its way to being stored, pluck the 'tempEmail' value and store only that.
	(inboundState) => ({ tempEmail: inboundState.tempEmail }),

	// On its way back from storage, merge it back to the original state.
	(outboundState: { tempEmail?: string }, originalState) => {
		const state = originalState as AuthState;
		return { ...state, tempEmail: outboundState.tempEmail };
	},

	// Specify which parts of the state this transform should be applied to.
	{ whitelist: ["auth"] }
);

const authPersistConfig = {
	key: "auth",
	storage,
	transforms: [NestedTempEmailTransform],
	whitelist: ["tempEmail"], // only tempEmail will be persisted
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		units: unitsReducer,
		members: membersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			// To avoid warnings related to redux-persist actions:
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
