import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  value: [
    {TodoName : "Ali"} 
  ],
};


export const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    AddTodo: (state, action) => {
      
      state.value = [...state.value, action.payload ];
      // console.log("redux ka data" , action.payload.TodoName)
    },

    removeTodo: (state, action) => {
      state.value = state.value.filter(
        (item, index) => index != action.payload
      );
    },

    editTodo: (state, action) => {
      state.value = state.value.map((item, index) =>
        index == action.payload.editIndex
          ? { ...item, TodoName: action.payload.TodoName }
          : { ...item }
      );
    },

    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.Todo,
    //     };
    //   },
    // },
  },
});

export const {AddTodo, removeTodo, editTodo} = TodoSlice?.actions;
export const Todos = (state) =>state.Todo.value ;
export default TodoSlice.reducer;



