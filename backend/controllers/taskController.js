const db = require("../config/db");

// Get all tasks
exports.getTasks = (req, res) => {
  const sql = "SELECT * FROM tasks ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tasks", error: err });
    }
    res.json(result);
  });
};

// Add new task
exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task title is required" });
  }

  const sql = "INSERT INTO tasks (title, status) VALUES (?, ?)";
  db.query(sql, [title, "pending"], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error creating task", error: err });
    }
    res.status(201).json({ message: "Task created successfully", id: result.insertId });
  });
};

// Update task status
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  const sql = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";
  db.query(sql, [title, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating task", error: err });
    }
    res.json({ message: "Task updated successfully" });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tasks WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting task", error: err });
    }
    res.json({ message: "Task deleted successfully" });
  });
};