import { Router } from "express";
import { PreviewController } from "../controllers/newsletter/preview";
import { SendController } from "../controllers/newsletter/send";
import { ConfirmController } from "../controllers/newsletter/send/confirm";
import { isAuthor } from "../middlewares/is-author";

const router = Router();

router.post("/send", isAuthor, new SendController().handle);
router.get("/send/:token", new ConfirmController().handle);

router.post("/preview", isAuthor, new PreviewController().handle);

export { router };
