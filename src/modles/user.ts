import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { timeStamp } from "node:console";
import next from "next";

export interface Iuser {
  email: string;
  password: string;
  _id: mongoose.Types.ObjectId;
  created_at?: Date;
  updated_at?: Date;
}

const UserSchema = new Schema<Iuser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.models?.User || mongoose.model<Iuser>("User",UserSchema)

export default User
