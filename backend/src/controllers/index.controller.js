import { pool } from "../db.js";

export const ping = async (req, res) => {
  try {
    const [result] = await pool.query('select "pong" AS result');
    res.json(result[0]);
  } catch (error) {
    res.json(error);
  }
};
