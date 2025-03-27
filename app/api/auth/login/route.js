// app/api/auth/login/route.js
const { NextResponse } = require("next/server");
const connectDB = require("../../../../lib/db");
const User = require("../../../../lib/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.POST = async function (req) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return NextResponse.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
};