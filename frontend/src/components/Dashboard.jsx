import React from "react";

export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div className="p-4 bg-[#1a2235] rounded-lg border border-gray-700 shadow-md">
      <div className="flex justify-between items-center">
        <h4 className={`font-bold ${task.is_completed ? "line-through text-gray-500" : "text-white"}`}>
          {task.title}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={onComplete}
            className="px-2 py-1 bg-green-500 rounded hover:bg-green-400 text-white text-sm"
          >
            Complete
          </button>
          <button
            onClick={onDelete}
            className="px-2 py-1 bg-red-500 rounded hover:bg-red-400 text-white text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-2 text-gray-300">{task.description}</p>
      )}

      {task.due_date && (
        <p className="mt-1 text-sm text-gray-400">
          Due: {new Date(task.due_date).toLocaleString()}
        </p>
      )}
    </div>
  );
}
