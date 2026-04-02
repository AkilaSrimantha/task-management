"use client";

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (title: string) => {
    await createTask({ title });
    loadTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggleTask = async (task: { id: string; title: string; status: string }) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    await updateTask(task.id, {
      title: task.title,
      status: newStatus,
    });
    loadTasks();
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Task Management App</h1>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggle={handleToggleTask} />
      </div>
    </main>
  );
}