import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice/index"

const store = configureStore({
   reducer: {
      chat: chatReducer
   },
})

export default store;