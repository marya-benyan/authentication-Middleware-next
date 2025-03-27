// app/api/auth/profile/route.js
const { NextResponse } = require("next/server");
const connectDB = require("../../../../lib/db");
const User = require("../../../../lib/models/user");
const jwt = require("jsonwebtoken");

exports.GET = async function (req) {
  await connectDB();

  const token = req.headers.get("authorization")?.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ id: user._id, email: user.email });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token or server error" }, { status: 401 });
  }
};