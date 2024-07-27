import { Router } from "express";

export const warehouseRouter = Router();

warehouseRouter.get('/', (_, res) => {
    res.send("this is working papi")
})