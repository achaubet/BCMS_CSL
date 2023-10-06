// Police Station Coordinator
import express from "express";
import { instanceBCMS } from "../bcmsStateMachine";

export const PSC = express.Router();


PSC.get('/', (res, req) => {
    req.send("Policeman Router Base Path\nAdd /help to this path see all the paths available\n").status(200);
});

PSC.get('/help', (res, req) => {
    req.send("Available paths:\n" +
    "Using GET method:\n" +
    "/status: Shows the current Crisis Status in JSON format\n" +
    "Using POST method:\n" +
    "/connexion : Connect a Policeman to the crisis\n" +
    "/set_vehicle_number: Set the number of vehicle for the crisis\n"
    ).status(200);
});

PSC.get('/status', (res, req) => {
    req.send(instanceBCMS.getSnapshot()).status(200);
});

PSC.get('/get_route_fire_truck', (res, req) => {
    req.send(instanceBCMS.getSnapshot().context.route_fire_truck_proposal).status(200);
});

PSC.post('/connexion', (req, res) => {
    console.log("Policeman connected!");
    instanceBCMS.send("PSC_connection_request");
    res.send().status(200);
});

PSC.post('/set_vehicle_number', (req, res) => {
    console.log("Number of vehicle is: " + req.body.number);
    instanceBCMS.send("state_police_vehicle_number", { number_of_police_vehicle_required: req.body.number });
    res.send().status(200);
});

PSC.post('/set_route_vehicle', (req, res) => {
    instanceBCMS.send('route_for_police_vehicles', { route_police_vehicle_proposal: req.body.route });
    res.send().status(200);
});

PSC.post('/dispatch_police_vehicle', (req, res) => {
    instanceBCMS.send('police_vehicle_dispatched');
    res.send().status(200);
});

PSC.post('/enough_police_vehicles_dispatched', (req, res) => {
    instanceBCMS.send('enough_police_vehicles_dispatched');
    res.send().status(200);
});

PSC.post('/enough_police_vehicles_arrived', (req, res) => {
    instanceBCMS.send('enough_police_vehicles_arrived');
    res.send().status(200);
});