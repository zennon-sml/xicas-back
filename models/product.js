import { DataTypes, Model } from "sequelize"
import sequelize from "../db"

class Product extends Model { }

Product.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		name: { type: DataTypes.STRING(150), allowNull: false },
		barcode: { type: DataTypes.TEXT },
		description: { type: DataTypes.TEXT },
		price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
		cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
		image: { type: DataTypes.TEXT },
		created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	}, 
	{
	sequelize, tableName: 'products', timestamps: false
	}
)

export default Product