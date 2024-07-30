import { Router } from "express";
import { _delete, getAll, insertNewShipment, update } from "../controllers/shipmentsController.js";

const shipmentsRouter = Router();

shipmentsRouter.get('/', getAll)
shipmentsRouter.post('/', insertNewShipment)
shipmentsRouter.put('/:id', update)
shipmentsRouter.delete('/:id', _delete)

export default shipmentsRouter