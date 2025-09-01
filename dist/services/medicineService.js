"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineService = void 0;
const medicineDao_1 = require("../dao/medicineDao");
class MedicineService {
    constructor() {
        this.dao = new medicineDao_1.MedicineDao();
    }
    async getMedicine(id) {
        return this.dao.findById(id);
    }
    async addMedicine(medicineData) {
        return this.dao.create(medicineData);
    }
}
exports.MedicineService = MedicineService;
