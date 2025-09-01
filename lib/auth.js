import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env.local");
}

export function signToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}


export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { userId: decoded.id, ...decoded }; // ✅ Normalize to userId
  } catch (error) {
    return null;
  }
}
