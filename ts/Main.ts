import { DataSource } from "typeorm"
import Crisis from "./entities/Crisis";


const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.cwd() + "/db/database.db",
    entities: [
        Crisis
    ]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        let crise = new Crisis();
        AppDataSource.manager.findOneBy(Crisis, {
            crisis_id: 1
        }).then((val) => {
            console.log(val);
        });
        crise.crisis_id = 2;
        crise.fire_truck_number = 8;
        crise.police_vehicle_number = 6;
        AppDataSource.manager.save(crise);

        AppDataSource.manager.findOneBy(Crisis, {
            crisis_id: 2
        }).then((val) => {
            console.log(val);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    