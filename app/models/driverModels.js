import { pool } from "../../config/db.mjs";
import { deleteQuery, findById, update } from "./utils/Crud.js";

//Get all drivers
export async function findAll(){
    try {
        const [ drivers ] = await pool.query("SELECT * FROM drivers")
    
        return drivers
    } catch (err) {
        console.error(err)
    }
}

//Create driver
export async function createDriver(driver){
    try {
        const query = 'warehouses'
        const warehouseFound = await findById(driver.warehouse_id, query);
       
        if(!warehouseFound){
            throw new Error('Warehouse not found')
        }
        
        const [ resolve ] = await pool.query("INSERT INTO drivers ( name, warehouse_id) VALUES ( ?, ? )", [driver.name, warehouseFound.id])
        const [[ driverCreated ]] = await pool.query("SELECT * FROM drivers WHERE id = ?", [resolve.insertId])
    
        return driverCreated
    } catch (err) {
        console.error('Error', err)
    }
}

//Update driver model
export async function updateDriverModel(id, driver){
   try {
    const query = 'drivers';
    const driverFound = await findById(id, query)

    await update(driverFound.id, driver, query)

    return 'Driver update'
   } catch (err) {
    throw new Error('Driver has not been update', err)
   }
}

//Delete driver model
export async function deleteDriverModel(id){
    try {
        const query = 'drivers'
        const foundId = await findById(id, query)
        await deleteQuery(foundId.id, query)

        return 'Driver deleted'
    } catch (error) {
        throw new Error('Driver has not been delete', error)
    }
}
