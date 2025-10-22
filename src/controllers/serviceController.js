import { ServiceModel } from "../models/serviceModel.js";

export const ServiceController = {
  async getAll(req, res) {
    try {
      const services = await ServiceModel.getAll();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const service = await ServiceModel.getById(req.params.id);
      res.json(service);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const svc = await ServiceModel.create(req.body);
      res.status(201).json({
        message: "Layanan baru berhasil ditambahkan",
        data: svc
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const svc = await ServiceModel.update(req.params.id, req.body);
      res.json(svc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await ServiceModel.remove(req.params.id);
      res.json({ message: "Layanan berhasil dihapus" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
