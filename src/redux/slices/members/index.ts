import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemberData, AppState } from "../../store.type";
import { RequireProperty } from "../../../utility";

// Initial state for the members slice.
const initialState: AppState["members"] = {
	data: {},
	memberIds: [],
};

const membersSlice = createSlice({
	name: "members",
	initialState,
	reducers: {
		// Add or update a member. If the member doesn't exist, it'll be added.
		// If it exists, it'll be updated.
		upsertMember: (state, action: PayloadAction<RequireProperty<MemberData, "id">>) => {
			const member = action.payload;
			state.data[member.id] = member;
			if (!state.memberIds.includes(member.id)) {
				state.memberIds.push(member.id);
			}
		},
		// Removes a member by its ID.
		removeMember: (state, action: PayloadAction<string>) => {
			const memberId = action.payload;
			delete state.data[memberId];
			state.memberIds = state.memberIds.filter((id) => id !== memberId);
		},
		// Sets multiple members at once (useful for initial data fetches).
		setMembers: (state, action: PayloadAction<{ [memberID: string]: MemberData }>) => {
			const members = action.payload;
			state.data = members;
			state.memberIds = Object.keys(members);
		},
	},
});

// Export actions to be used in components/dispatches.
export const { upsertMember, removeMember, setMembers } = membersSlice.actions;

// Export the reducer for the store.
export default membersSlice.reducer;

// Selectors
export const selectAllMembers = (state: AppState) => state.members?.data;
export const selectMemberById = (state: AppState, memberId: string) => state.members?.data[memberId];
export const selectAllMemberIds = (state: AppState) => state.members?.memberIds;
