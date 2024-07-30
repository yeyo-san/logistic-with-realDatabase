import { Router } from "express";
import { _delete, getAll, insertVehicle, updateVehicle } from "../controllers/vehiclesContoller.js";

const vehiclesRoutes = Router()

vehiclesRoutes.get('/', getAll)
vehiclesRoutes.post('/', insertVehicle)
vehiclesRoutes.put('/:id', updateVehicle)
vehiclesRoutes.delete('/:id', _delete)

export default vehiclesRoutes