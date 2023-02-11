import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as admin from "firebase-admin";
import { credential, ServiceAccount } from "firebase-admin";

import { accessRouters } from "./src/routers/accessCode.routes";

import serviceConfigJson from "./src/config/service.config.json";
import { gitHubRoutes } from "./src/routers/github.routes";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || "3000";

app.use(cors());
app.use(express.json());

app.get("/hi", (req: Request, res: Response) => res.send("Welcome to Server!"));
app.use(accessRouters);
app.use(gitHubRoutes);

admin.initializeApp({
  credential: credential.cert(<ServiceAccount>serviceConfigJson),
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
