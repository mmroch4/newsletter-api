import cors from "cors";
import express from "express";
import helmet from "helmet";
import { corsConfig } from "./config/cors";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors(corsConfig));

app.use(router);

export { app };
