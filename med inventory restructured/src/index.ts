import Koa from "koa";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import medicineRouter from "./controllers/medicineController";

const app = new Koa();

app.use(bodyParser());

app.use(medicineRouter.routes()).use(medicineRouter.allowedMethods());

const MONGO_URL = "mongodb://127.0.0.1:27017/medicine_inventory"; // 👈 update if needed
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
