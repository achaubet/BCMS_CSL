import { DataSource } from "typeorm"
import Crisis from "./entities/Crisis";


const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.cwd() + "/db/database.db"
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        let crise = new Crisis();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


/*
async function main() {
  console.log("Current directory:", process.cwd());
  const dir = process.cwd();
  const dbpath = dir + '/db';
  console.log(dbpath);

  try {
    // open the database
    const db = await open({
      filename: dbpath + '/database.db',
      driver: Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Crisis (
        crisis_id INTEGER PRIMARY KEY AUTOINCREMENT,
        fire_truck_number INTEGER,
        police_vehicle_number INTEGER
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Fire_truck (
        fire_truck_name TEXT PRIMARY KEY
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Police_vehicle (
        police_vehicle_name TEXT PRIMARY KEY
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Route (
        route_name TEXT PRIMARY KEY
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Fire_truck_in_crisis (
        crisis_id INTEGER,
        fire_truck_name TEXT,
        route_name TEXT,
        fire_truck_status TEXT CHECK (fire_truck_status IN ('None', 'Dispatched', 'Arrived', 'Blocked', 'Breakdown')),
        PRIMARY KEY (crisis_id, fire_truck_name),
        FOREIGN KEY (crisis_id) REFERENCES Crisis (crisis_id) ON DELETE CASCADE,
        FOREIGN KEY (fire_truck_name) REFERENCES Fire_truck (fire_truck_name) ON DELETE CASCADE,
        FOREIGN KEY (route_name) REFERENCES Route (route_name)
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Police_vehicle_in_crisis (
        crisis_id INTEGER,
        police_vehicle_name TEXT,
        route_name TEXT,
        police_vehicle_status TEXT CHECK (police_vehicle_status IN ('None', 'Dispatched', 'Arrived', 'Blocked', 'Breakdown')),
        PRIMARY KEY (crisis_id, police_vehicle_name),
        FOREIGN KEY (crisis_id) REFERENCES Crisis (crisis_id) ON DELETE CASCADE,
        FOREIGN KEY (police_vehicle_name) REFERENCES Police_vehicle (police_vehicle_name) ON DELETE CASCADE,
        FOREIGN KEY (route_name) REFERENCES Route (route_name)
      )
    `);

    console.log('Database created successfully.');
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

main();
*/