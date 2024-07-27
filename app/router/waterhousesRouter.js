import { Router } from "express";
import { getAll, insertNewWarehouse } from "../controllers/warehouseController.js";

const warehouseRouter = Router();

warehouseRouter.get('/', getAll)
warehouseRouter.post('/', insertNewWarehouse)
// warehouseRouter.put('/', )

export default warehouseRouter;