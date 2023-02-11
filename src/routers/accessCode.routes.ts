import { Router } from "express";
import {
  createNewAccessCode,
  validateAccessCode,
} from "../controllers/accessCode.controllers";

export const accessRouters = Router();

accessRouters.post("/access-code/new", createNewAccessCode);
accessRouters.post("/access-code/validate", validateAccessCode);
