import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = {
				_id: action.payload.user._id,
				email: action.payload.user.email,
				firstName: action.payload.user.firstName,
				lastName: action.payload.user.lastName,
			};
			state.token = action.payload.token;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
