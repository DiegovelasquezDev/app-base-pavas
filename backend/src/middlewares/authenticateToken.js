import jwt from "jsonwebtoken";

const secretKey = process.env.API_KEY_TOKEN;

export const authenticateToken = async (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader)
    return res.status(401).json({ error: "Acceso no autorizado" });

  const [_, token] = tokenHeader.split(" ");

  jwt.verify(token, secretKey, { ignoreExpiration: false }, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expirado" });
      } else {
        return res.status(403).json({ error: "Token no válido" });
      }
    }

    req.user = user;
    next();
  });
};
