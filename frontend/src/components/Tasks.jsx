import { useState, useEffect } from "react";
import api from "../api/axios";
import Sidebar from "./Sidebar";
import "./Tasks.css";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <div className="tasks-header">
          <div>
            <h1>My Tasks</h1>
            <p>Stay organized and get things done.</p>
          </div>

          <button className="add-task-button">+ Add Task</button>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet. Create your first task</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="task-card"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <span className={`task-status status-${task.status}`}>
                {task.status.replace("_", " ")}
              </span>

              <span className={`task-priority priority-${task.priority}`}>
                {task.priority}
              </span>

              <div className="task-meta">
                <span>
                  📅{" "}
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString("en-IN")
                    : "No due date"}
                </span>

                <span>⏱️ {task.estimated_minutes} min</span>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default Tasks;
