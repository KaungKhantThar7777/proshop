import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  const auth = req.headers.authorization;
  if (auth && auth.includes("Bearer ")) {
    try {
      token = auth.split(" ")[1];
      const decode = jwt.decode(token, process.env.JWT_SECRET);
      req.user = decode.id;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized, no token");
  }
};
