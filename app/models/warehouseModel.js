import { pool } from "../../config/db.mjs";

export async function findAll(){
    try {
       const [warehouses] = await pool.query("SELECT * FROM warehouses")

       return warehouses;
    } catch (err) {
        console.error(err)
    }
}

export async function createWarehouse(warehouse){
    try {
        const [ resolve ] = await pool.query("INSERT INTO warehouses ( name, location ) VALUES ( ?, ? )", [warehouse.name, warehouse.location])
        const [[ warehouseCreated ]] = await pool.query('SELECT * FROM warehouses WHERE id = ?', [resolve.insertId])
        
        return warehouseCreated
    } catch (error) {
        throw new Error('Ocurrio un error', err)
    }
}