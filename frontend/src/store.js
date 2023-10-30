import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice.js"

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	//eslint-disable-next-line
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store
