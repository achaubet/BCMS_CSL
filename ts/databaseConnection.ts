import { DataSource } from "typeorm"
import Crisis from "./entities/Crisis";
import fireTruck from "./entities/fireTruck";
import fireTruckInCrisis from "./entities/fireTruckInCrisis";
import policeVehicle from "./entities/policeVehicle";
import policeVehicleInCrisis from "./entities/policeVehicleInCrisis";
import Route from "./entities/Route";
import bcmsDAOFactory from "./dao/bcmsDAOFactory";

export let factory: bcmsDAOFactory;

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

AppDataSource.initialize().then(()=> {
    factory = new bcmsDAOFactory(AppDataSource);
    console.log("DataBase initialized!");
});

