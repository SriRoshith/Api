import { MedicineDao } from "../dao/medicineDao";
import { Medicine } from "../models/Medicine";

export class MedicineService {
  private dao: MedicineDao;

  constructor() {
    this.dao = new MedicineDao();
  }

  async getMedicine(id: string): Promise<Medicine | null> {
    return this.dao.findById(id);
}

  async addMedicine(medicineData: Partial<Medicine>): Promise<Medicine> {
  return this.dao.create(medicineData);
}

  async sellMedicine(id: string, quantity: number) {
    return this.dao.updateMedicineStock(id, quantity);
  }
}
