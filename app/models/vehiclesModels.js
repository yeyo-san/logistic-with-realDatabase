import { pool } from "../../config/db.mjs"
import { deleteQuery, findById, update } from "./utils/Crud.js"

//Get all vehicles
export async function findAll(){
    try {
        const [ vehicles ] = await pool.query("SELECT * FROM vehicles")
    
        return vehicles
    } catch (err) {
        console.error(err)
    }
}

//Create vehicle
export async function createVehicle(vehicle){
    try {
        const query = 'drivers'
        const driverFound = await findById(vehicle.driver_id, query);

        if(!driverFound){
            throw new Error('Driver not found')
        }
        
        const [ resolve ] = await pool.query("INSERT INTO vehicles ( model, year, driver_id ) VALUES ( ?, ?, ? )", [vehicle.model, vehicle.year, driverFound.id])
        const [[ vehicleCreated ]] = await pool.query("SELECT * FROM vehicles WHERE id = ?", [resolve.insertId])
    
        return vehicleCreated
    } catch (err) {
        console.error('Error', err)
    }
}

//Update vehicle model
export async function updateVehicleModel(id, vehicle){
    try {
     const query = 'vehicles';
     const vehicleFound = await findById(id, query)
     console.log(vehicleFound);
 
     await update(vehicleFound.id, vehicle, query)
 
     return 'Vehicle update'
    } catch (err) {
     throw new Error('Vehicle has not been update', err)
    }
}

//Delete vehicle model
export async function deleteVehicleModel(id){
    try {
        const query = 'vehicles'
        const foundId = await findById(id, query)
        await deleteQuery(foundId.id, query)

        return 'Vehicle deleted'
    } catch (error) {
        throw new Error('Vehicle has not been delete', error)
    }
}
