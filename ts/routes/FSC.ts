// Fire Station Coordinator
import express from "express";
import { instanceBCMS } from "../bcmsStateMachine";

export const FSC = express.Router();


FSC.get('/', (res, req) => {
    req.send("Fireman Router Base Path\nAdd /help to this path see all the paths available\n").status(200);
});

FSC.get('/help', (res, req) => {
    req.send("Available paths:\n" +
    "Using GET method:\n" +
    "/status: Shows the current Crisis Status in JSON format\n" +
    "/get_route_police_vehicle: Return the route proposed by the Police\n" +
    "Using POST method:\n" +
    "/connexion: Connect a Fireman to the crisis\n" +
    "/set_firetruck_number: Set the number of firetruck for the crisis\n" +
    "/set_route_firetruck: Set the Route for the firetrucks\n"
    ).status(200);
});

FSC.get('/status', (res, req) => {
    req.send(instanceBCMS.getSnapshot()).status(200);
});

FSC.get('/get_route_police_vehicle', (res, req) => {
    req.send(instanceBCMS.getSnapshot().context.route_police_vehicle_proposal).status(200);
});

FSC.get('/next_state', (res, req) => {
    console.info(instanceBCMS.nextState);
});

FSC.post('/connexion', (req, res) => {
    console.log("Fireman connected!");
    instanceBCMS.send("FSC_connection_request");
    res.send().status(200);
});

FSC.post('/set_firetruck_number', (req, res) => {
    console.log("Number of firetruck is: " + req.body.number);
    instanceBCMS.send("state_fire_truck_number", { name_of_route_for_fire_trucks: req.body.number });
    res.send().status(200);
});

FSC.post('/set_route_firetruck', (req, res) => {
    instanceBCMS.send('route_for_fire_trucks', { route_fire_truck_proposal: req.body.route });
    res.send().status(200);
});

FSC.post('/response_route_fire_truck', (req, res) => {
    switch(req.body.response) {
        case "agree":
            instanceBCMS.send("FSC_agrees_about_fire_truck_route");
            res.send().status(200);
            break;
        case "disagree":
            instanceBCMS.send("FSC_disagrees_about_fire_truck_route");
            res.send().status(200);
            break;
        default:
            res.send("No response provided").status(200);
            break;
    }    
});

FSC.post('/response_route_police_vehicle', (req, res) => {
    switch(req.body.response) {
        case "agree":
            instanceBCMS.send("FSC_agrees_about_police_vehicle_route");
            res.send().status(200);
            break;
        case "disagree":
            instanceBCMS.send("FSC_disagrees_about_police_vehicle_route");
            res.send().status(200);
            break;
        default:
            res.send("No response provided").status(200);
            break;
    }    
});

FSC.post('/dispatch_fire_truck', (req, res) => {
    instanceBCMS.send('fire_truck_dispatched', {fire_trucks_dispatched: 1});
    res.send().status(200);
});

FSC.post('/enough_fire_trucks_dispatched', (req, res) => {
    instanceBCMS.send('enough_fire_trucks_dispatched');
    res.send().status(200);
});

FSC.post('/enough_fire_trucks_arrived', (req, res) => {
    instanceBCMS.send('enough_fire_trucks_arrived');
    res.send().status(200);
});