import express from 'express'
import warehouseRouter from '../router/waterhousesRouter.js';

export const routes = express();

routes.use('/warehouses', warehouseRouter);
// routes.use('/shipments')
// routes.use('/vehicles')
// routes.use('/drivers')

export default routes