import { pool } from "../../../config/db.mjs";

export const findById = async (id, options) => {
   switch(options){
    case options = 'warehouses':
        try {
            const [[warehouseFound]] = await pool.query("SELECT * FROM warehouses WHERE id = ?", [id]);
    
            return warehouseFound
        } catch (err) {
            throw new Error('Warehouse not found :(', err)
        }
    
    case options = 'drivers':
        try {
            const [[driverFound]] = await pool.query("SELECT * FROM drivers WHERE id = ?", [id]);
    
            return driverFound
        } catch (err) {
            throw new Error('Driver not found :(', err)
        }

    case options = 'vehicles':
        try {
            const [[vehicleFound]] = await pool.query("SELECT * FROM vehicles WHERE id = ?", [id]);
    
            return vehicleFound
        } catch (err) {
            throw new Error('Vehicle not found :(', err)
        }
    
    case options = 'shipments':
        try {
            const [[shipmentFound]] = await pool.query("SELECT * FROM shipments WHERE id = ?", [id]);
    
            return shipmentFound
        } catch (err) {
            throw new Error('Vehicle not found :(', err)
        }

    default:
        return undefined
   }
}

export const update = async (id, query, options) =>{
   switch(options){
    case options = 'warehouses':
        try {
            const options = 'vehicles'
            const vehicleFound = await findById(warehouse.vehicle_id, options)

            if(!vehicleFound){
                throw new Error('Vehicle not found')
            }

            const [ resolve ] = await pool.query("UPDATE warehouses SET name = ?, location = ?, vehicle_id = ? WHERE id = ?", [query.name, query.location, query.vehicle_id, id]);
    
            return resolve
        } catch (err) {
            throw new Error('Warehouse has not been update', err)
        }

    case options = 'drivers':{
        try {
            const warehouseFound = await findById(query.warehouse_id, 'warehouses')
         

            if(!warehouseFound){
                throw new Error('Warehouse not found')
            }

            const [ resolve ] = await pool.query("UPDATE drivers SET name = ?, warehouse_id = ? WHERE id = ?", [query.name, warehouseFound.id, id]);
            return resolve
        } catch (err) {
            throw new Error('Driver has not been update', err)
        }
    }

    case options = 'vehicles':
        try {
            const driverFound = await findById(query.driver_id, 'drivers')

            if(!driverFound){
                throw new Error('Driver not found')
            }

            const [ resolve ] = await pool.query("UPDATE vehicles SET model = ?, year = ?, driver_id = ?  WHERE id = ?", [query.model, query.year, driverFound.id, id]);
            return resolve
        } catch (err) {
            throw new Error('Vehicle has not been update', err)
        }

    case options = 'shipments':
        try {
            const shipmentFound = await findById(id, 'shipments')
  
            if(!shipmentFound){
                throw new Error('Shipment not found')
            }

            const [ resolve ] = await pool.query("UPDATE shipments SET item = ?, quantity = ?, warehouse_id = ?, vehicle_id = ?, driver_id = ? WHERE id = ?", [query.item, query.quantity, query.warehouse_id, query.vehicle_id, query.driver_id, shipmentFound.id]) 
            console.log(resolve);
            return resolve 
        } catch (err) {
            throw new Error('Shipment has not been update', err)
        }

    default: undefined
   }
}

export const deleteQuery = async (id, options) => {
    switch(options){
        case options = 'warehouses':
            try {
                const [ resolve ] = await pool.query("DELETE FROM warehouses WHERE id = ?", [id]);
        
                return resolve
            } catch (error) {
                throw new Error('Warehouse has not been delete', error)
            }

        case options = 'drivers':
            try {
                const [ resolve ] = await pool.query("DELETE FROM drivers WHERE id = ?", [id]);
        
                return resolve
            } catch (error) {
                throw new Error('Driver has not been delete', error)
            }

        case options = 'vehicles':
            try {
                const [ resolve ] = await pool.query("DELETE FROM vehicles WHERE id = ?", [id]);
        
                return resolve
            } catch (error) {
                throw new Error('Vehicle has not been delete', error)
            }

        case options = 'shipments':
            try {
                const [ resolve ] = await pool.query("DELETE FROM shipments WHERE id = ?", [id])

                return resolve
            } catch (err) {
                throw new Error('Shipment has not been delete')
            }
    }
}