export const getUserId = (req, res, next) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.userId = userId; 
  next();
};