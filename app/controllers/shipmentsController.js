import { createShipment, deleteShipmentModel, findAll, updateShipment } from "../models/shipmentModles.js"

//Get all shipments
export const getAll = async (_, res) =>{
    try {
        const shipments = await findAll()

        if(!shipments){
            throw new Error('The connection failed')
        }

        res.status(201).json({ message: 'ok', data: shipments})
    } catch (err) {
        res.status(404).json({ message: err})
    }
}

//Create new shipment 
export const insertNewShipment = async (req, res) => {
    const { item, quantity, warehouse_id, vehicle_id, driver_id } = req.body

    try {
        const shipmentCreated = await createShipment({ item, quantity, warehouse_id, vehicle_id, driver_id })

        if (!shipmentCreated) {
            throw new Error('Something thats wrong with this request')
        }

        res.status(201).json({ message: 'Shipment created', data: shipmentCreated})
    } catch (err) {
        res.status(400).json({ message: err})
    }
}

//Update shipment
export const update = async (req, res) => {
    const shipmentId = req.params.id
    const { item, quantity, warehouse_id, vehicle_id, driver_id } = req.body

    try {
        const shipmentUpdated = await updateShipment(shipmentId, {item, quantity, warehouse_id, vehicle_id, driver_id})

        res.status(200).json({ message: 'Update succesfuly', response: shipmentUpdated })
    } catch (err) {
        res.status(204).json({ message:' Something went wrong with the request ', err})
    }
}

//Delete shipment 
export const _delete = async (req, res) => {
    const shipmentId = req.params.id

    try {
       const shipmentDelete = await deleteShipmentModel(shipmentId)

        res.status(201).json({ message: "Delete succesfuly", response: shipmentDelete})
    } catch (err) {
        res.status(204).json({ message:' Something went wrong with the request ', err})
    }
}