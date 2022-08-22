import { Router } from "express";
import { AuthController } from "../controllers/author/auth";
import { ConfirmController as AuthConfirmController } from "../controllers/author/auth/confirm";
import { StoreController } from "../controllers/author/store";
import { ConfirmController as StoreConfirmController } from "../controllers/author/store/confirm";
import { isAuthor } from "../middlewares/is-author";

const router = Router();

router.post("/create", isAuthor, new StoreController().handle);
router.get("/create/:token", new StoreConfirmController().handle);

router.post("/auth", new AuthController().handle);
router.get("/auth/:token", new AuthConfirmController().handle);

export { router };
