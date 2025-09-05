import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import mongoose, { Schema, Document } from "mongoose";

interface Batch {
  batchId: string;
  expiryDate: Date;
  quantity: number;
  addedAt: Date;
}

interface MedicineDoc extends Document {
  medicineId: string;
  batches: Batch[];
}

const BatchSchema = new Schema<Batch>({
  batchId: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
});

const MedicineSchema = new Schema<MedicineDoc>({
  medicineId: { type: String, required: true },
  batches: { type: [BatchSchema], default: [] },
});

const Medicine = mongoose.model<MedicineDoc>("Medicine", MedicineSchema);

const app = new Koa();
const router = new Router({ prefix: "/medicines" });
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    const status = err.status || 500;

    if (process.env.NODE_ENV === "development") {
      ctx.status = status;
      ctx.body = {
        error: err.message,
        stack: err.stack,
      };
    } else {
      ctx.status = status;
      ctx.body = {
        error: "Something went wrong. Please try again later.",
      };
    }

    console.error(`[Error] ${status} - ${err.message}`);
  }
});

router.post("/batch", async (ctx) => {
  const { medicineId, batchId, expiryDate, quantity } = ctx.request.body as {
    medicineId: string;
    batchId: string;
    expiryDate: string;
    quantity: number;
  };

  if (!medicineId || !batchId || !expiryDate || !quantity) {
    ctx.throw(400, "All fields are required");
  }

  let med = await Medicine.findOne({ medicineId });
  if (!med) {
    med = new Medicine({ medicineId, batches: [] });
  }

  if (med.batches.some((b) => b.batchId === batchId)) {
    ctx.throw(409, "Batch already exists");
  }

  med.batches.push({
    batchId,
    expiryDate: new Date(expiryDate),
    quantity,
    addedAt: new Date(),
  });

  await med.save();
  ctx.status = 201;
  ctx.body = { message: "Batch added", medicineId };
});

router.get("/:medicineId/stock", async (ctx) => {
  const { medicineId } = ctx.params;
  const med = await Medicine.findOne({ medicineId });

  if (!med) {
    ctx.throw(404, "Medicine not found");
    return;
  }

  const totalStock = med.batches.reduce((sum, b) => sum + b.quantity, 0);
  ctx.body = { medicineId, totalStock, batches: med.batches };
});

router.post("/:medicineId/sell", async (ctx) => {
  const { medicineId } = ctx.params;
  const { quantity } = ctx.request.body as { quantity: number };

  if (!quantity || quantity <= 0) {
    ctx.throw(400, "Quantity must be positive");
  }

  const med = await Medicine.findOne({ medicineId });
  if (!med) {
    ctx.throw(404, "Medicine not found");
    return;
  }

  med.batches.sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime());

  let remaining = quantity;
  const fromBatches: { batchId: string; sold: number }[] = [];

  for (const batch of med.batches) {
    if (remaining <= 0) break;
    const sellQty = Math.min(batch.quantity, remaining);
    batch.quantity -= sellQty;
    remaining -= sellQty;
    if (sellQty > 0) fromBatches.push({ batchId: batch.batchId, sold: sellQty });
  }

  med.batches = med.batches.filter((b) => b.quantity > 0);
  await med.save();

  ctx.body = {
    medicineId,
    sold: quantity,
    fromBatches,
    remainingStock: med.batches.reduce((s, b) => s + b.quantity, 0),
  };
});

app.use(router.routes()).use(router.allowedMethods());

mongoose
  .connect("mongodb://127.0.0.1:27017/medicine_inventory")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () =>
      console.log("Server running at http://localhost:3000")
    );
  })
  .catch((err) => console.error(err));
