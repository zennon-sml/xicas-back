import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Product from "./product.js"; // Importando para criar relação
import Admin from "./admin.js"; // Importando para criar relação

class Sale extends Model {}

Sale.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } },
    admin_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: Admin, key: "id" } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    sale_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "sales",
    timestamps: false,
  }
);

export default Sale;