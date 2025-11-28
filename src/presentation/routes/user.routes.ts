import "reflect-metadata";
import { Router } from "express";
import { RegisterController } from "../controllers/User/register.controller";

const router = Router();

var registerController = new RegisterController();

router.post("/register", (req, res) => registerController.handle(req, res));

export default router;
