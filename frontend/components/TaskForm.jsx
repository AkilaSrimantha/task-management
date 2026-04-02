"use client";

import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 outline-none"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
}