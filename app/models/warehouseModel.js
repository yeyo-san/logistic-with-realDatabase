import { pool } from "../../config/db.mjs";
import { findById, update, deleteQuery } from "./utils/Crud.js";

//Get all warehouses
export async function findAll(){
    try {
       const [warehouses] = await pool.query("SELECT * FROM warehouses")

       return warehouses;
    } catch (err) {
        console.error(err)
    }
}

//Create warehouse
export async function createWarehouse(warehouse){
    try {
        const query = 'vehicles'
        const vehicleFound = await findById(warehouse.vehicle_id, query)

        if(!vehicleFound){
            throw new Error('Vehicle not found')
        }

        const [ resolve ] = await pool.query("INSERT INTO warehouses ( name, location, vehicle_id ) VALUES ( ?, ?, ? )", [warehouse.name, warehouse.location, vehicleFound.id])
        const [[ warehouseCreated ]] = await pool.query('SELECT * FROM warehouses WHERE id = ?', [resolve.insertId])
        
        return warehouseCreated
    } catch (error) {
        throw new Error('Ocurrio un error', err)
    }
}

//Update warehouse by id
export async function updateWarehouseModel(id, warehouse){
    try {
        const query = 'warehouses'
        const foundId = await findById(id, query);
        await update(foundId.id, warehouse, query)

        return 'Warehouse updated'
    } catch (err) {
        throw new Error('Warehouse has not been update', err)
    }
}

//Delete warehouse by id
export async function deleteWarehouseModel(id){
    try {
        const query = 'warehouses'
        const foundId = await findById(id, query)
        await deleteQuery(foundId.id, query)

        return 'Warehouse deleted'
    } catch (error) {
        throw new Error('Warehouse has not been delete', error)
    }
}