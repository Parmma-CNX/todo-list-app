import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "./ProgressBar.css";

const ProgressBar: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className="box-container">
      <div>
        <h1>Progress</h1>
        <div className="progress-bar" style={{ width: `480px` }}>
          <span
            className="progress-bar-update"
            style={{ width: `${progress}%` }}
          ></span>
        </div>
        <p>{completedCount} Completed</p>
      </div>
    </div>
  );
};

export default ProgressBar;
