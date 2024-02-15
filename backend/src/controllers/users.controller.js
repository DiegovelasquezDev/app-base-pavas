import { pool } from "../db.js";
import { userQueries } from "../database/queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.API_KEY_TOKEN;

export const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    const [user] = await pool.query(userQueries.getUserById, [id]);

    if (user.length === 0) {
      return res.status(404).json({ errorMessage: "Usuario no encontrado" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const getUserSession = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ errorMessage: "Token no proporcionado" });
    }

    const decodedToken = jwt.verify(token, secretKey);

    const userQueryResult = await pool.query(userQueries.getSession, [
      decodedToken.userId,
    ]);

    const user = userQueryResult[0];

    if (user.length === 0) {
      return res.status(401).json({ errorMessage: "Usuario no encontrado" });
    }

    return res.status(200).json({ userSession: user });
  } catch (error) {
    return res
      .status(401)
      .json({ errorMessage: "Error al verificar el token" });
  }
};

export const paginationUser = async (req, res) => {
  const { search, orderPagination, orderColumn, numberPage, itemsPerPage } =
    req.query;

  console.log(search)

  try {
    const result = await pool.query(
      "CALL sp_paginationUser(?, ?, ?, ?, ?, @totalRecords, @totalPages)",
      [
        search || null,
        orderPagination || "created_at",
        orderColumn || "DESC", // asc o desc
        numberPage <= 0 ? 1 : numberPage || 1,
        itemsPerPage <= 0 ? 4 : itemsPerPage || 8,
      ]
    );

    const [output] = await pool.query(
      "SELECT @totalRecords AS totalRecords, @totalPages AS totalPages"
    );

    const { totalRecords, totalPages } = output[0];
    const rows = result[0][0];

    res.send({
      totalRecords,
      totalPages,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await pool.query(userQueries.searchEmail, [email]);

    if (user.length === 0) {
      return res.status(401).json({ errorMessage: "Credenciales inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: "Credenciales inválidas" });
    }

    const token = jwt.sign({ userId: user[0].id }, secretKey, {
      expiresIn: "1h",
    });

    const userResponse = {
      dni: user[0].dni,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      email: user[0].email,
      token: token,
    };

    res.status(200).json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const [listUsers] = await pool.query(userQueries.getAllUsers);

    const simplifiedUserList = listUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    res.status(200).json(simplifiedUserList);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { dni, firstName, lastName, email, password } = req.body;

    const existingUser = await pool.query(userQueries.searchUserDni, [dni]);

    if (existingUser[0] && existingUser[0].length > 0) {
      return res
        .status(400)
        .json({ errorMessage: "El usuario ya existe con este documento" });
    }

    const existingEmail = await pool.query(userQueries.searchEmail, [email]);

    if (existingEmail[0] && existingEmail[0].length > 0) {
      return res
        .status(400)
        .json({ errorMessage: "el email no esta disponible" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(userQueries.addUser, [
      dni,
      firstName,
      lastName,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateUser = async (req, res) => {

  try {
    const { id } = req.query;

    const { password } = req.body;
    console.log({ id, password })

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(userQueries.updateUser, [
      hashedPassword,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ errorMessage: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool.query(userQueries.deleteUser, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ errorMessage: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Se eliminó el usuario exitosamente" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};
