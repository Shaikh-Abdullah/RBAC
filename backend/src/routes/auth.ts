import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PortalUser from "../models/PortalUser";
import Roles from "../models/Roles";
import { permission } from "node:process";

const routes = Router();

routes.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "name, email, password, and role are all required" });
    }

    const roleDoc = await Roles.findOne({ name: role });
    if (!roleDoc) {
      return res.status(400).json({ message: `Role "${role}" does not exist` });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await PortalUser.create({
      name,
      email,
      password: hashedPassword,
      role: roleDoc._id,
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      password: user.password,
      role: roleDoc.name,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: "Signup failed" });
  }
});

routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await PortalUser.findOne({ email }).populate("role");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const roleDoc = user.role as any;
    const token = jwt.sign(
      {
        id: user._id,
        role: roleDoc.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // role: user.role,
        role: roleDoc.name,
        permission: roleDoc.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default routes;
