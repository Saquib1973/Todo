// todoSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const loadTodosFromLocalStorage = () => {
    try {
        const todos = localStorage.getItem("todos");
        if (todos === null) return [];
        return JSON.parse(todos);
    } catch (error) {
        console.error("Error loading todos from local storage:", error);
        return [];
    }
};

const todoSlice = createSlice({
    name: "todos",
    initialState: loadTodosFromLocalStorage(),
    reducers: {
        addTodo: (state, action) => {
            const { text, expectedEndTime, status, note } = action.payload;
            const newTodo = {
                id: Date.now(),
                text,
                status,
                createTime: Date.now(),
                expectedEndTime,
                note,
            };
            state.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(state));
        },
        updateStatus: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.status = action.payload.status;
                localStorage.setItem("todos", JSON.stringify(state));
            }
        },
        deleteTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(state));
            }
        },
    },
});

export const { addTodo, updateStatus, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
