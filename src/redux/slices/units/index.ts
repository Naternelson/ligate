import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Unit, AppState } from "../../store.type";
import { RequireProperty } from "../../../utility";

// Initial state for the units slice.
const initialState: AppState["units"] = {
	data: {},
	unitIds: [],
}

const unitsSlice = createSlice({
	name: "units",
	initialState,
	reducers: {
		// Add or update a unit. If the unit doesn't exist, it'll be added.
		// If it exists, it'll be updated.
		upsertUnit: (state, action: PayloadAction<RequireProperty<Unit, "id">>) => {
			const unit = action.payload;
			state.data[unit.id] = unit;
			if (!state.unitIds.includes(unit.id)) {
				state.unitIds.push(unit.id);
			}
		},
		// Removes a unit by its ID.
		removeUnit: (state, action: PayloadAction<string>) => {
			const unitId = action.payload;
			delete state.data[unitId];
			state.unitIds = state.unitIds.filter((id) => id !== unitId);
		},
		// Sets multiple units at once (useful for initial data fetches).
		setUnits: (state, action: PayloadAction<{ [unitID: string]: Unit }>) => {
			const units = action.payload;
			state.data = units;
			state.unitIds = Object.keys(units);
		},
	},
});

// Export actions to be used in components/dispatches.
export const { upsertUnit, removeUnit, setUnits } = unitsSlice.actions;

// Export the reducer for the store.
export default unitsSlice.reducer;

// Selectors
export const selectAllUnits = (state: AppState) => state.units?.data;
export const selectUnitById = (state: AppState, unitId: string) => state.units?.data[unitId];
export const selectAllUnitIds = (state: AppState) => state.units?.unitIds;
 