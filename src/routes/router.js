import express from 'express'
import { warehouseRouter } from './warehouseRouter.js';

export const routes = express();

routes.use('/warehouses', warehouseRouter);
// routes.use('/shipments')
// routes.use('/vehicles')
// routes.use('/drivers')