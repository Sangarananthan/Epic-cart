import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "fU";
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Ensures cookie is sent over HTTPS in production
    sameSite: "strict", // Prevents cross-site request forgery (CSRF)
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time (30 days in milliseconds)
  });

  return token;
};

export default generateToken;
