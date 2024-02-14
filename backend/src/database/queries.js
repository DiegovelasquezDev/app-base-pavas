export const userQueries = {
  getAllUsers: "SELECT * FROM users",
  getUserById: "SELECT * FROM users WHERE id = ?",
  addUser:
    "INSERT INTO users (id, dni, firstName, lastName, email, password, created_at, updated_at) VALUES (UUID(), ?, ?, ?, ?, ?, NOW(), NOW())",
  updateUser: "UPDATE users SET password=?, updated_at=NOW() WHERE id=?",
  deleteUser: "DELETE FROM users WHERE id = ?",
  searchEmail: "SELECT * FROM users WHERE email = ?",
  searchUserDni: "SELECT dni FROM users WHERE dni = ?",
  getSession:
    "SELECT id, dni, firstName, lastName, email FROM users WHERE id = ?",
};
