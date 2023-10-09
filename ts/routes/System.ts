// System Route
import express from "express";
import { instanceBCMS } from "../bcmsStateMachine";
import { factory } from "../databaseConnection";
import fireTruck from "../entities/fireTruck";
import policeVehicle from "../entities/policeVehicle";

export const System = express.Router();


System.get('/', (res, req) => {
    req.send("System Router Base Path\n").status(200);
});

System.get('/status', (res, req) => {
    req.send(instanceBCMS.getSnapshot()).status(200);
});

System.post('/start_crisis', (req, res) => {
    instanceBCMS.start();
    res.send().status(200);
});

System.post('/stop_crisis', (req, res) => {
    instanceBCMS.stop();
    res.send().status(200);
});

System.post('/add_fire_truck', async (req, res) => {
    let fireTruckDAO = factory.getFireTruckDAO();
    let fire_truck = new fireTruck();
    fire_truck.fire_truck_name = req.body.name;
    await fireTruckDAO.create(fire_truck);
    res.send("Fire truck: " + fire_truck.fire_truck_name + " added successfully\n").status(200);
});

System.post('/add_police_vehicle', async (req, res) =>{
    let policeVehicleDAO = factory.getPoliceVehicleDAO();
    let police_vehicle = new policeVehicle();
    police_vehicle.police_vehicle_name = req.body.name;
    await policeVehicleDAO.create(police_vehicle);
    res.send("Vehicle: " + police_vehicle.police_vehicle_name + " added successfully\n").status(200);
});