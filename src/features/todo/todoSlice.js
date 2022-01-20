import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        fetchToDo: (state, action) => {
            return {
                ...state,
                todos: action.payload || []
            }
        },
		addToDo: (state, action) => {
            state.todos.push(action.payload)
		},
        deleteToDo: (state, action) =>{
            const index = state.todos.findIndex(
                (todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state.todos.splice(index, 1)
            }
        },
        errorTodo: (state, action) => {
            alert(action.payload)
        }
	}
})

const TodoAction = TodoSlice.actions

const TodoReducer = TodoSlice.reducer

export {TodoAction} 
export default TodoReducer

export const selectTodo = (state) => state.todo;
