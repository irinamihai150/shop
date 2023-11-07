import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice.js"
import cartSliceReducer from "./slices/cartSlice"
import authSliceReducer from "./slices/authSlice"

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: cartSliceReducer,
		auth: authSliceReducer,
	},
	//eslint-disable-next-line
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store
