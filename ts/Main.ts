import { DataSource } from "typeorm"
import Crisis from "./entities/Crisis";
import fireTruck from "./entities/fireTruck";
import fireTruckInCrisis from "./entities/fireTruckInCrisis";
import policeVehicle from "./entities/policeVehicle";
import policeVehicleInCrisis from "./entities/policeVehicleInCrisis";
import Route from "./entities/Route";


const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.cwd() + "/db/database.db",
    synchronize: true,
    entities: [
        Crisis,
        fireTruck,
        fireTruckInCrisis,
        policeVehicle,
        policeVehicleInCrisis,
        Route
    ]
});

async function testEntities() {
    AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        let crise = new Crisis();
        let voiturePolice = new policeVehicle();
        let camionPompier = new fireTruck();
        crise.crisis_id = 1;
        crise.fire_truck_number = 8;
        crise.police_vehicle_number = 6;
        await AppDataSource.manager.save(crise);

        await AppDataSource.manager.findOneBy(Crisis, {
            crisis_id: 1
        }).then((val) => {
            console.log(val);
            
        });
        await AppDataSource.manager.remove(crise);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}

testEntities();
    