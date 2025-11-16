import { useState, useEffect } from "react";
import * as api from "../services/api";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all tasks for the logged-in user
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.fetchTasks();
      setTasks(response);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new task
  const addTask = async (taskData) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Mark task complete/incomplete
  const toggleComplete = async (id, isCompleted) => {
    try {
      const updated = await api.updateTask(id, { is_completed: isCompleted });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  // ✅ Update task details (like description or due_date)
  const updateTask = async (id, updates) => {
    try {
      const updated = await api.updateTask(id, updates);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, deleteTask, toggleComplete, updateTask };
}
