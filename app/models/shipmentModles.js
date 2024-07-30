import { pool } from "../../config/db.mjs";
import { deleteQuery, findById, update } from "./utils/Crud.js";

//Get all shipmetns
export async function findAll(){
    try {
        const [ shipments ] = await pool.query("SELECT * FROM shipments")

        if(!shipments){
            throw new Error('Not found')
        }

        return shipments
    } catch (err) {
        res.status(404).json({ message: err })
    }
}

//Function for witch is undefined
export const witchIsUndefined = (warehouse, driver, vehicle) => {
    if(!warehouse && !driver && !vehicle){
        return 'Ninguno de los id ingresados es valido'
    }else if(!warehouse){
        return 'No se encontro el almacen indicado por id' 
    }else if(!driver){
        return 'No se encontro conductor indicado por id'
    }else if(!vehicle){
        return 'No se encontro vehiculo indicado por id'
    }else{
        return undefined
    }
}

//Create a shipments
export async function createShipment(shipment){
    try {
        const query1 = 'warehouses';
        const query2 = 'drivers';
        const query3 = 'vehicles';

        const warehouseFound = await findById(shipment.warehouse_id, query1);
        const driverFound = await findById(shipment.driver_id, query2);
        const vehicleFound = await findById(shipment.vehicle_id, query3);

        const validation = witchIsUndefined(warehouseFound, driverFound, vehicleFound)

        if(validation){
           throw new Error(validation) 
        }

        const [ resolve ] = await pool.query("INSERT INTO shipments ( item, quantity, warehouse_id, vehicle_id, driver_id) VALUES ( ?, ?, ?, ?, ?)", [shipment.item, shipment.quantity, warehouseFound.id, vehicleFound.id, driverFound.id])
        console.log(resolve);
    
        return resolve
    } catch (err) {
        console.error('Error', err)
    }
}

//Update shipments
export async function updateShipment(id, shipment){
    try {
        const query1 = 'warehouses';
        const query2 = 'drivers';
        const query3 = 'vehicles';

        const warehouseFound = await findById(shipment.warehouse_id, query1);
        const driverFound = await findById(shipment.driver_id, query2);
        const vehicleFound = await findById(shipment.vehicle_id, query3);

        const validation = witchIsUndefined(warehouseFound, driverFound, vehicleFound)

        if(validation){
           throw new Error(validation) 
        }

        await update(id, shipment, 'shipments')

        return 'Shipment update'
    } catch (err) {
        console.error('Error', err)
    }
}

//Delete driver model
export async function deleteShipmentModel(id){
    try {
        const query = 'shipments'
        const foundId = await findById(id, query)
        await deleteQuery(foundId.id, query)

        return 'Shipment deleted'
    } catch (error) {
        throw new Error('Shipment has not been delete', error)
    }
}

