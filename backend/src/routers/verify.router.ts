import { Router } from "express";
import verifyService from "../services/verify.service";

const verifyRouter = Router();

verifyRouter.post("/", verifyService.verify);

export default verifyRouter;
