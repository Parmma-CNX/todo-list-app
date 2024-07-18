import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo, TodoState, FilterType } from "../types/todoTypes";
import {
  addTodoAPI,
  deleteTodoAPI,
  editTodoAPI,
  fetchTodos as fetchTodosAPI,
  toggleTodoAPI,
} from "../services/api";

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: undefined,
  filter: "all",
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetchTodosAPI();
  return response;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text: string) => {
    const response = await addTodoAPI(text);
    return response;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, text }: { id: string; text: string }) => {
    const response = await editTodoAPI(id, text);
    return response;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    await deleteTodoAPI(id);
    return id;
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }: { id: string; completed: boolean }) => {
    const response = await toggleTodoAPI(id, completed);
    return response;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || undefined;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const { id, title } = action.payload;
        const existingTodo = state.todos.find((todo) => todo.id === id);
        if (existingTodo) {
          existingTodo.title = title;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const { id, completed } = action.payload;
        const existingTodo = state.todos.find((todo) => todo.id === id);

        if (existingTodo) {
          existingTodo.completed = completed;
        }
      });
  },
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;
