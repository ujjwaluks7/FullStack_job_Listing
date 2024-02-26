import Contractor from "../models/contractor.model.js";
import Jwt from "jsonwebtoken";

const contractorAuthMiddleware = async (req, res, next) => {
  const bearerToken = req.header("authorization");

  if (!bearerToken) {
    return res
      .status(404)
      .json({ success: false, message: "Contractor not authorised" });
  }
  const jwtToken = bearerToken.split(" ")[1];

  if (!jwtToken) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide valid token" });
  }

  // verify jwt token
  try {
    const { userId } = Jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    if (!userId) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Please provide valid token", false));
    }

    const user = await Contractor.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `Contractor not found` });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export default contractorAuthMiddleware;
