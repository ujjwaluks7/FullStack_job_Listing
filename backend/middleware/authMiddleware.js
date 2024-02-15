import Labour from "../models/labour.model.js";
import Contractor from "../models/contractor.model.js";
import Jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const bearerToken = req.header("authorization");

  if (!bearerToken) {
    return res
      .status(404)
      .json({ success: false, message: "User not authorised" });
  }
  const jwtToken = bearerToken.split(" ")[1];

  if (!jwtToken) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide valid token" });
  }

  // verify jwt token
  try {
    const { userId, role } = Jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    if (!userId || !role) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Please provide valid token", false));
    }

    let user;
    if (role === "Contractor") {
      user = await Contractor.findById(userId).select("-password");
    } else if (role === "Labour") {
      user = await Labour.findById(userId).select("-password");
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `${role} is not found` });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export default authMiddleware;
