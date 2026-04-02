"use client";

export default function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
        >
          <div>
            <h3
              className={`font-medium ${
                task.status === "completed" ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onToggle(task)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              {task.status === "pending" ? "Complete" : "Undo"}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}