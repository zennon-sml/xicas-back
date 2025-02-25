import Sale from "../models/sales.js";
import Product from "../models/product.js";

export const createSale = async (req, res) => {
  const { product_id, admin_id, quantity } = req.body;

  try {
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });

    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Estoque insuficiente" });
    }

    const total = product.price * quantity;

    const sale = await Sale.create({ product_id, admin_id, quantity, total });

    await product.update({ quantity: product.quantity - quantity });

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message || "Erro ao registrar venda" });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ error: error.message || "Erro ao listar vendas" });
  }
};

export const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findByPk(id, {
      include: [{ model: Product, attributes: ["name", "price"] }],
    });
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ error: "Venda não encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "Erro ao buscar venda" });
  }
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findByPk(id);
    if (sale) {
      await sale.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Venda não encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "Erro ao deletar venda" });
  }
};

