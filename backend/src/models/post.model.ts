import { Schema, model } from "mongoose";

const postSchema = new Schema({
  imageUrl: { type: String },
  caption: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const postModel = model("posts", postSchema);

export default postModel;
