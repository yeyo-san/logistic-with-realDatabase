import { createDriver, deleteDriverModel, findAll, updateDriverModel } from "../models/driverModels.js"

//Get all drivers
export const getAll = async (_, res) =>{
    try {
        const drivers = await findAll()

        if(!drivers){
            throw new Error('The connection failed')
        }

        res.status(201).json({ message: 'ok', data: drivers})
    } catch (err) {
        res.status(404).json({ message: err})
    }
}

//Create driver
export const insertDriver = async (req, res) => {
    try {
        const { name, warehouse_id } = req.body
        const driverCreated = await createDriver({ name, warehouse_id })
        if(!driverCreated){
            res.status(204).json({ message: 'Warehouse not found'})
        }

        res.status(201).json({ message: 'Driver created', data: driverCreated})
    } catch (err) {
        res.status(204).json({ message: "The new driver could not be create"})
    }
}

//Update driver
export const updateDriver = async (req, res) => {
    const driverId = req.params.id
    const { name, warehouse_id } = req.body

    try {
        const update = await updateDriverModel(driverId, {name , warehouse_id})

        res.status(200).json({ message: 'Update succesfuly', response: update })
    } catch (err) {
        res.status(204).json({ message:' something went wrong with the request ', err})
    }
}

//Delete a driver
export const _delete = async (req, res) => {
    const driverId = req.params.id

    try {
        const driverdeleted = await deleteDriverModel(driverId)

        res.status(201).json({ message: "Delete succesfuly", response: driverdeleted})
    } catch (error) {
        res.status(400).json({ message: "Can't be possible connect with dataBase", error})
    }
}