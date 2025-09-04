import { Router } from "express";
import controller from "./users.controller.js";

const router = Router();

router.post("/users", controller.create);
router.get("/users", controller.getAll);
router.get("/users/:id", controller.getOne);
router.put("/users/:id", controller.update);
router.delete("/users/:id", controller.delete);

export default router;
