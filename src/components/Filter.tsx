import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/todoSlice";
import { FilterType } from "../types/todoTypes";
import "./Filter.css";
import { Dropdown } from "react-bootstrap";

const Filter: React.FC = () => {
  const [dropdownText, setDropDownText] = useState("All");
  const dispatch = useDispatch();

  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
    setDropDownText(newFilter);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className="dropdown-basic">
        {dropdownText}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleFilterChange("All")}>
          All
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterChange("Done")}>
          Done
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterChange("Undone")}>
          Undone
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filter;
