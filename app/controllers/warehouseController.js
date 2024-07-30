import { createWarehouse, deleteWarehouseModel, findAll, updateWarehouseModel } from "../models/warehouseModel.js";

//Get all warehouses
export const getAll = async (_, res) => {
   try {
    const warehouses = await findAll()

    res.status(201).json({ message: 'Ok', data: warehouses})
   } catch (error) {
        throw new res.status(404).json({ message: 'The connection failed'})
   }
}

//Create a warehouse
export const insertNewWarehouse = async(req, res) => {
    try {
        const { name, location, vehicle_id } = req.body;
        const warehouseCreated = await createWarehouse({ name, location, vehicle_id })
        
        res.status(201).json({ message: "Warehouse created!", data: warehouseCreated})

    } catch (error) {
        res.status(500).json({ message: 'The new warehouses could not be created'})
    }
}

//Update warehouse
export const update = async (req, res) => {
    const warehouseId = req.params.id
    const { name, location, vehicle_id } = req.body

    try {
        const updateWarehouse = await updateWarehouseModel(warehouseId, {name, location, vehicle_id})

        res.status(200).json({ message: 'Update succesfuly', response: updateWarehouse })
    } catch (err) {
        res.status(204).json({ message:' something went wrong with the request ', err})
    }
}

//Delete a warehouse
export const _delete = async (req, res) => {
    const warehouseId = req.params.id

    try {
        const warehouseDelete = await deleteWarehouseModel(warehouseId)

        res.status(201).json({ message: "Delete succesfuly", response: warehouseDelete})
    } catch (error) {
        res.status(400).json({ message: "Can't be possible connect with dataBase", error})
    }
}