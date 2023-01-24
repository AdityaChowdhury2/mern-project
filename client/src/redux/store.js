import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice.js";

export default configureStore({
	reducer: {
		auth: AuthReducer,
	},
});
