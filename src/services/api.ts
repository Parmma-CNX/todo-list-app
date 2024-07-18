import axios from "axios";
import { Todo } from "../types/todoTypes";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3001/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodoAPI = async (title: string): Promise<Todo> => {
  const response = await axios.post(API_URL, {
    id: uuidv4(),
    title,
    complete: false,
  });
  return response.data;
};

export const editTodoAPI = async (id: string, title: string): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${id}`, { title });
  return response.data;
};

export const deleteTodoAPI = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTodoAPI = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  const response = await axios.patch(`${API_URL}/${id}`, { completed });
  return response.data;
};
