import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addTodo } from "../redux/todoSlice";
import "./TodoForm.css";
import { Form } from "react-bootstrap";
const TodoForm: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="input-todo"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add your todo..."
        />
      </Form>
    </div>
  );
};

export default TodoForm;
