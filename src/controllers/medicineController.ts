import Router from "@koa/router";
import { MedicineService } from "../services/medicineService";
import { Medicine } from "../models/Medicine";

const router = new Router({ prefix: "/medicines" });
const service = new MedicineService();

router.get("/:id", async (ctx) => {
  const medicine = await service.getMedicine(ctx.params.id);
  ctx.body = medicine || { message: "Not found" };
});

router.post("/", async (ctx) => {
  const medicineData = ctx.request.body as Partial<Medicine>; // 👈 FIX HERE
  const medicine = await service.addMedicine(medicineData);
  ctx.body = medicine;
});

export default router;
