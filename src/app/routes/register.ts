import { Router } from "express";
import { RegisterController } from "../controllers/register";
import { ConfirmController } from "../controllers/register/confirm";

const router = Router();

router.post("/", new RegisterController().handle);
router.get("/:token", new ConfirmController().handle);

export { router };
