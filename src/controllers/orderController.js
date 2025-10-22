import { OrderModel } from "../models/orderModel.js";

export const OrderController = {
  async create(req, res) {
    try {
      const order = await OrderModel.create(req.body);
      res.status(201).json({
        message: "Pesanan baru berhasil ditambahkan",
        data: order
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const { status } = req.query;
      const orders = await OrderModel.getAll();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const order = await OrderModel.getById(req.params.id);
      res.json(order);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "sedang dikerjakan", "selesai"].includes(status)) {
        return res.status(400).json({ error: "Status tidak valid" });
      }
      const updated = await OrderModel.updateStatus(id, status);
      res.json({
        message: "Status berhasil diperbarui",
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await OrderModel.remove(req.params.id);
      res.json({ message: "Pesanan berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
