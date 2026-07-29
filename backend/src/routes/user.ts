import { Router } from "express";
import bcrypt from "bcrypt";
import PortalUser from "../models/PortalUser";
import Roles from "../models/Roles";

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

export default routes;
