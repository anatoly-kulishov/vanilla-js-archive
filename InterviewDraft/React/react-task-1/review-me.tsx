import React from "react";

const ReviewMe = () => {
  const [taskText, setTaskText] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [taskCount, setTaskCount] = React.useState(0);

  React.useLayoutEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        addTask(taskText);
      }
    });
  });

  const addTask = React.useCallback((text) => {
    const newTask = { id: taskCount, text: text };
    setTasks([...tasks, newTask]);
    setTaskCount(taskCount + 1);
    setTaskText("");
  });

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={() => addTask(taskText)}>Add Task</button>
      <div>
        {tasks.map((task) => (
          <div>{task.text}</div>
        ))}
      </div>
      <p>Total Tasks: {taskCount}</p>
    </div>
  );
};

export default ReviewMe;
