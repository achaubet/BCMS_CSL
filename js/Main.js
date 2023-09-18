"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Crisis_1 = require("./entities/Crisis");
const AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: process.cwd() + "/db/database.db",
    entities: [
        Crisis_1.default
    ]
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    let crise = new Crisis_1.default();
    AppDataSource.manager.findOneBy(Crisis_1.default, {
        crisis_id: 1
    }).then((val) => {
        console.log(val);
    });
    crise.crisis_id = 2;
    crise.fire_truck_number = 8;
    crise.police_vehicle_number = 6;
    AppDataSource.manager.save(crise);
    AppDataSource.manager.findOneBy(Crisis_1.default, {
        crisis_id: 2
    }).then((val) => {
        console.log(val);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
