// Police Station Coordinator
import express from "express";
import { instanceBCMS } from "../bcmsStateMachine";

export const PSC = express.Router();


PSC.get('/', (res, req) => {
    req.send("Policeman Router Base Path\nAdd /help to this path see all the paths available\n").status(200);
});

PSC.get('/help', (res, req) => {
    req.send("Available paths:\n" +
    "/connexion : Connect a Policeman to the crisis\n" +
    "/set_vehicle_number: Set the number of vehicle for the crisis\n"
    ).status(200);
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