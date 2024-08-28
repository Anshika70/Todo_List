import { useState } from "react";
import style from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

function Task({ task, updateTask, markTaskAsDone }) {
  // State to manage the editing mode, task title, and description
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  // Function to handle updating the task on the backend and updating the UI
  const handleUpdateTask = () => {
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle, // Updated title from input
        description, // Updated description from textarea
        lastUpdated: new Date(), // Set the current date and time as lastUpdated
        completed: task.completed, // Retain the current completion status
      }),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((updatedTask) => {
        updateTask(updatedTask);
        setIsEditing(false);
      });
  };

  return (
    <div className={`${style.task} ${task.completed ? style.completed : ""}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleUpdateTask}>Save</button>
        </div>
      ) : (
        <div>
          <div className={style.taskcontent}>
            <div className={style.left}>
              <h3>{task.title}</h3>
              <p>{description}</p>
            </div>
            <div className={style.right}>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => setIsEditing(true)}
              />
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  fetch(`http://localhost:5000/tasks/${task.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      ...task,
                      completed: !task.completed,
                    }),
                  })
                    .then((response) => response.json())
                    .then((updatedTask) => markTaskAsDone(updatedTask.id));
                }}
              />
            </div>
          </div>
          <small className={style.lastUpdated}>
            Last updated: {task.lastUpdated.toLocaleString()}
          </small>
        </div>
      )}
    </div>
  );
}

export default Task;
