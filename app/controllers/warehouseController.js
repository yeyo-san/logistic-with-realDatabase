import { createWarehouse, findAll } from "../models/warehouseModel.js";

export const getAll = async (_, res) => {
   try {
    const warehouses = await findAll()
    console.log(warehouses);

    res.status(201).json({ message: 'Ok', data: warehouses})
   } catch (error) {
        throw new res.status(404).json({ message: 'The connection failed'})
   }
}

export const insertNewWarehouse = async(req, res) => {
    try {
        const { name, location } = req.body;
        const warehouseCreated = await createWarehouse({ name, location})
        
        res.status(201).json({ message: "Warehouse created!", data: warehouseCreated})

    } catch (error) {
        res.status(500).json({ message: 'The new warehouses could not be created'})
    }
}