import { Router } from "express";
import { router as author } from "./author";
import { router as newsletter } from "./newsletter";
import { router as register } from "./register";

const router = Router();

router.use("/newsletter", newsletter);
router.use("/register", register);
router.use("/author", author);

export { router };
