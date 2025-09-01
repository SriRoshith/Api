"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const medicineService_1 = require("../services/medicineService");
const router = new router_1.default({ prefix: "/medicines" });
const service = new medicineService_1.MedicineService();
router.get("/:id", async (ctx) => {
    const medicine = await service.getMedicine(ctx.params.id);
    ctx.body = medicine || { message: "Not found" };
});
router.post("/", async (ctx) => {
    const medicineData = ctx.request.body; // 👈 FIX HERE
    const medicine = await service.addMedicine(medicineData);
    ctx.body = medicine;
});
exports.default = router;
