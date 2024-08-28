
import { useState } from "react";
import style from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

function Task({ task, updateTask, markTaskAsDone }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdateTask = () => {
    updateTask({ ...task, title: newTitle, description, lastUpdated: new Date() });
    setIsEditing(false);
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
                onChange={() => markTaskAsDone(task.id)}
              />
            </div>
          </div>
          <small className={style.lastUpdated}>Last updated: {task.lastUpdated.toLocaleString()}</small>
        </div>
      )}
    </div>
  );
}

export default Task;
