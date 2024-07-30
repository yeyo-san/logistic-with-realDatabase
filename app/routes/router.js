import express from 'express'
import warehouseRouter from '../router/waterhousesRouter.js';
import driverRoutes from '../router/driversRoutes.js';
import vehiclesRoutes from '../router/vehiclesRoutes.js';
import shipmentsRouter from '../router/shipmentsRoutes.js';

export const routes = express();

routes.use('/warehouses', warehouseRouter);
routes.use('/drivers', driverRoutes)
routes.use('/vehicles', vehiclesRoutes)  
routes.use('/shipments', shipmentsRouter) 

export default routes