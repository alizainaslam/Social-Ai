import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
});

const userModel = model<IUser>("users", userSchema);

export default userModel;
