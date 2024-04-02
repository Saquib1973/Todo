import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./Slice/todoSlice.jsx"
const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

export default store;