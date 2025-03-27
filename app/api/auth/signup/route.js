// app/api/auth/signup/route.js
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return NextResponse.json({ token, user: { id: user._id, email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
};