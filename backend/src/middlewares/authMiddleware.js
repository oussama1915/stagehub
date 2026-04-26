import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 1. récupérer le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // 2. format attendu : "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    // 3. vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. ajouter user à la requête
    req.user = decoded;

    // 5. passer au prochain middleware / controller
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;