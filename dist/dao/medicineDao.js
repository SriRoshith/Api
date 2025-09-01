"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineDao = void 0;
const Medicine_1 = __importDefault(require("../models/Medicine"));
class MedicineDao {
    async findById(id) {
        return Medicine_1.default.findById(id).exec();
    }
    async create(medicineData) {
        const medicine = new Medicine_1.default(medicineData);
        return medicine.save();
    }
}
exports.MedicineDao = MedicineDao;
