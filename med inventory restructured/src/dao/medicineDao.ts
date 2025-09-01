import MedicineModel, { Medicine } from "../models/Medicine";

export class MedicineDao {
  async findById(id: string): Promise<Medicine | null> {
    return MedicineModel.findById(id).exec();
  }

  async create(medicineData: Partial<Medicine>): Promise<Medicine> {
    const medicine = new MedicineModel(medicineData);
    return medicine.save();
  }
}
