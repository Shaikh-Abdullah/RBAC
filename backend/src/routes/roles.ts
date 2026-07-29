import { Router } from "express";
import Roles from "../models/Roles";
import { requireAuth } from "../middleware/auth";
import { requirePermission } from "../middleware/requirePermission";

const route = Router();

route.get("/", requireAuth, async (req, res) => {
  try {
    const role = await Roles.find().sort({ name: 1 });
    if (!role) {
      res.status(400).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch roles" });
  }
});

route.get("/:name", requireAuth, async (req, res) => {
  try {
    const role = await Roles.findOne({ name: req.params.name });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    console.error("GET /roles/:name error:", error); // add this line
    res.status(500).json({ message: "Failed to fetch role" });
  }
});

route.put(
  "/:name",
  requireAuth,
  requirePermission("roles:manage"),
  async (req, res) => {
    try {
      const { permissions } = req.body;

      if (!Array.isArray(permissions)) {
        res.status(400).json({ message: "permission should array of strings" });
      }

      const updateRole = await Roles.findOneAndUpdate(
        { name: req.params.name },
        { permissions },
        { returnDocument: "after" },
      );

      if (!updateRole) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.json(updateRole);
    } catch (error) {
      res.status(500).json({ message: "Failed to update role" });
    }
  },
);

export default route;
