import { createVehicle, deleteVehicleModel, findAll, updateVehicleModel } from "../models/vehiclesModels.js"

//Get all vehicles
export const getAll = async (_, res) =>{
    try {
        const vehicles = await findAll()

        if(!vehicles){
            throw new Error('The connection failed')
        }

        res.status(201).json({ message: 'ok', data: vehicles})
    } catch (err) {
        res.status(404).json({ message: err})
    }
}

//Create vehicle
export const insertVehicle = async (req, res) => {
    try {
        const { model, year, driver_id } = req.body
        const vehicleCreated = await createVehicle({ model, year, driver_id })
        
        if(!vehicleCreated){
            res.status(204).json({ message: 'Driver not found'})
        }

        res.status(201).json({ message: 'Vehicle created', data: vehicleCreated})
    } catch (err) {
        res.status(204).json({ message: "The new vehicle could not be create"})
    }
}

//Update vehicle
export const updateVehicle = async (req, res) => {
    const vehicleId = req.params.id
    const { model, year, driver_id } = req.body

    try {
        const update = await updateVehicleModel(vehicleId, {model, year, driver_id})

        res.status(200).json({ message: 'Update succesfuly', response: update })
    } catch (err) {
        res.status(204).json({ message:' something went wrong with the request ', err})
    }
}

//Delete a vehicle
export const _delete = async (req, res) => {
    const vehicleId = req.params.id

    try {
        const vehicleDeleted = await deleteVehicleModel(vehicleId)

        res.status(201).json({ message: "Delete succesfuly", response: vehicleDeleted})
    } catch (error) {
        res.status(400).json({ message: "Can't be possible connect with dataBase", error})
    }
}