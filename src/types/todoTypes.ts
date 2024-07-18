export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  filter: string;
}

export type FilterType = "All" | "Done" | "Undone";
