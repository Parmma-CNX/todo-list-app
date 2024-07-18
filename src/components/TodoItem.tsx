import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Todo } from "../types/todoTypes";
import { deleteTodo, editTodo, toggleTodo } from "../redux/todoSlice";
import "./TodoItem.css";
import { Button, Col, Container, Row } from "react-bootstrap";
interface TodoItemProps extends Todo {}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(title);
  const dispatch = useDispatch<AppDispatch>();

  const handleEdit = () => {
    dispatch(editTodo({ id, text: newText }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo({ id: id, completed: !completed }));
  };

  return (
    <div className="todo-item-container">
      <Row className="todo-items">
        <Col className="todo-title">
          {isEditing ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            />
          ) : (
            <span
              style={{ textDecoration: completed ? "line-through" : "none" }}
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>
          )}
        </Col>
        <Col className="todo-ellipse">
          <Button
            variant={completed ? "light" : "success"}
            onClick={handleToggle}
          >
            {completed ? "Undo" : "Complete"}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TodoItem;
