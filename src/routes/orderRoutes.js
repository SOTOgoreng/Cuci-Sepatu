import express from "express";
import { OrderController } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", OrderController.create);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.put("/:id/status", OrderController.updateStatus);
router.delete("/:id", OrderController.remove);

export default router;
