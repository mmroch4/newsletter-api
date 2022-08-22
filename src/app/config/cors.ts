import { CorsOptions } from "cors";

const corsWhitelist: string[] = [];

const corsConfig: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export { corsConfig };
