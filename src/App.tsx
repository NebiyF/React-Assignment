//import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";

//function App() {
  //return (
    //<>
      //<Header />
      //<Assignments />
    //</>
  //);
//}

//export default App;

//import styles from "./components/Header/header.module.css"
import "./styles/global.css";
import { Header } from "./components/Header";
import { Assignment } from "./components/Assignment";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';


interface Assignment {
  id: number;
  title: string;
  completed: boolean;
}

const AssignmentForm: React.FC = () => {
  const [assignment, setAssignment] = useState<string>('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignment(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (assignment.trim() !== '') {
      const newAssignment: Assignment = {
        id: Date.now(),
        title: assignment,
        completed: false,
      };
      setAssignments([...assignments, newAssignment]);
      setAssignment('');
    }
  };

  const handleDelete = (id: number) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={assignment}
          onChange={handleInputChange}
          placeholder="Enter your assignment"
        />
        <button type="submit" disabled={!assignment.trim()}>Create</button>
      </form>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id} style={{ display: 'flex', alignItems: 'center' }}>
            <FaCheckCircle
              style={{ color: assignment.completed ? 'green' : 'gray', cursor: 'pointer' }}
              onClick={() => handleToggleComplete(assignment.id)}
            />
            <span style={{ textDecoration: assignment.completed ? 'line-through' : 'none', marginLeft: '8px' }}>
              {assignment.title}
            </span>
            <FaTrash
              style={{ color: 'red', cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => handleDelete(assignment.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentForm;

 
