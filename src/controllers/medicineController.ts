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

router.post("/:id/sell", async (ctx) => {
  try {
    const { quantity } = ctx.request.body as { quantity: number };
    if (!quantity || quantity <= 0) {
      ctx.status = 400;
      ctx.body = { error: "Quantity must be positive" };
      return;
    }

    const updated = await service.sellMedicine(
      ctx.params.id,
      quantity
    );

    if (!updated) {
      ctx.status = 404;
      ctx.body = { error: "Medicine not found" };
      return;
    }

    ctx.body = { message: "Medicine sold", medicine: updated };
  } catch (err: any) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
});

export default router;
