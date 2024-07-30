import { Router } from "express";
import { _delete, getAll, insertDriver, updateDriver } from "../controllers/driverController.js";

const driverRoutes = Router();

driverRoutes.get('/', getAll)
driverRoutes.post('/', insertDriver)
driverRoutes.put('/:id', updateDriver)
driverRoutes.delete('/:id', _delete )

export default driverRoutes