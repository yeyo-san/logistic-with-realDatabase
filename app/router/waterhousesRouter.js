import { Router } from "express";
import { _delete, getAll, insertNewWarehouse, update } from "../controllers/warehouseController.js";

const warehouseRouter = Router();

warehouseRouter.get('/', getAll)
warehouseRouter.post('/', insertNewWarehouse)
warehouseRouter.put('/:id', update)
warehouseRouter.delete('/:id', _delete)

export default warehouseRouter;