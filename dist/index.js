"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const mongoose_1 = __importDefault(require("mongoose"));
const medicineController_1 = __importDefault(require("./controllers/medicineController"));
const app = new koa_1.default();
app.use((0, koa_bodyparser_1.default)());
app.use(medicineController_1.default.routes()).use(medicineController_1.default.allowedMethods());
const MONGO_URL = "mongodb://127.0.0.1:27017/medicine_inventory"; // 👈 update if needed
mongoose_1.default
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
