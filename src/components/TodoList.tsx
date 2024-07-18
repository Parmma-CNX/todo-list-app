import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTodos } from "../redux/todoSlice";
import TodoItem from "./TodoItem";
import ProgressBar from "./ProgressBar";
import "./ProgressBar.css";
import Filter from "./Filter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TodoForm from "./TodoForm";
import "./TodoList.css";
import { Col } from "react-bootstrap";

const TodoList: React.FC = () => {
  const { todos, filter } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Done") return todo.completed;
    if (filter === "Undone") return !todo.completed;
    return true;
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <ProgressBar />
      </Row>
      <Row>
        <Row className="filter-section">
          <Col className="padding-0">
            <div>Task</div>
          </Col>
          <Col className="padding-0 flex flex-end">
            <div>
              <Filter />
            </div>
          </Col>
        </Row>
        <div className="todo-items-container">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      </Row>
      <Row>
        <TodoForm />
      </Row>
    </Container>
  );
};

export default TodoList;
