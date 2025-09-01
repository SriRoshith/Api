import MedicineModel, { Medicine } from "../models/Medicine";

export class MedicineDao {
  async findById(id: string): Promise<Medicine | null> {
    return MedicineModel.findById(id).exec();
  }

  async create(medicineData: Partial<Medicine>): Promise<Medicine> {
    const medicine = new MedicineModel(medicineData);
    return medicine.save();
  }

  async updateMedicineStock(id: string, quantity: number): Promise<Medicine | null> {
    const medicine = await MedicineModel.findById(id).exec();
    if (!medicine) return null;

    if (medicine.quantity < quantity) {
      throw new Error("Not enough stock available");
    }

    medicine.quantity -= quantity;
    return medicine.save();
  }
}
