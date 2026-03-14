import "dotenv/config";
import app from "./app/app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT as string;
const MONGO_URL = process.env.MONGO_URL as string;

connectDB(MONGO_URL);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
