// Fire Station Coordinator
import express from "express";
import { instanceBCMS } from "../bcmsStateMachine";

export const FSC = express.Router();


FSC.get('/', (res, req) => {
    req.send("Fireman Router Base Path\nAdd /help to this path see all the paths available\n").status(200);
});

FSC.get('/help', (res, req) => {
    req.send("Available paths:\n" +
    "/connexion : Connect a Fireman to the crisis\n" +
    "/set_firetruck_number: Set the number of firetruck for the crisis\n"
    ).status(200);
});

FSC.post('/connexion', (req, res) => {
    console.log("Fireman connected!");
    instanceBCMS.send("FSC_connection_request");
    res.send().status(200);
});

FSC.post('/set_firetruck_number', (req, res) => {
    console.log("Number of firetruck is: " + req.body.number);
    instanceBCMS.send("state_fire_truck_number", { number_of_fire_truck_required: req.body.number });
    res.send().status(200);
});