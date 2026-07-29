import mongoose from "mongoose";
import dotenv from "dotenv";
import Roles from "./models/Roles";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URL is not defined in your .env file");
}

const roles = [
  {
    name: "super_admin",
    label: "Super Admin",
    permissions: ["*"],
  },
  {
    name: "admin",
    label: "Admin",
    permissions: [
      "bookings:view",
      "bookings:edit",
      "bookings:delete",
      "staff:view",
      "staff:manage",
      "finance:view",
      "reports:view",
      "roles:manage",
    ],
  },
  {
    name: "administrative_officer",
    label: "Administrative Officer",
    permissions: ["bookings:view", "staff:view", "reports:view"],
  },
  {
    name: "operation_manager",
    label: "Operation Manager",
    permissions: [
      "bookings:view",
      "bookings:edit",
      "bookings:assign",
      "dispatch:view",
      "staff:view",
      "staff:manage",
    ],
  },
  {
    name: "carwash_operation",
    label: "Carwash Operation",
    permissions: ["bookings:view", "bookings:assign", "staff:view"],
  },
  {
    name: "call_center",
    label: "Call Center",
    permissions: ["bookings:view", "bookings:create", "bookings:edit"],
  },
  {
    name: "finance",
    label: "Finance",
    permissions: ["finance:view", "payout:approve", "reports:view"],
  },
  {
    name: "audit",
    label: "Audit",
    permissions: [
      "bookings:view",
      "staff:view",
      "finance:view",
      "reports:view",
      "logs:view",
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connecting to db seeding role");

  for (const role of roles) {
    await Roles.findOneAndUpdate({ name: role.name }, role, {
      upsert: true,
      new: true,
      returnDocument: "after",
    });
    console.log(`Seeding ${role.name}`);
  }
  console.log("Done Seeding...");
  await mongoose.disconnect();
}
seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
