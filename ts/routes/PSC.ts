// Police Station Coordinator
import express from "express";
import { instanceBCMS } from "../bcmsStateMachine";

export const PSC = express.Router();


PSC.get('/', (res, req) => {
    console.log("Policeman connected");
    req.send().status(200);
})

PSC.post('/', (req, res) => {
    switch(req.body.type) {
        case "connection":
            console.log("Policeman connected!");
            instanceBCMS.send("PSC_connection_request");
            res.send().status(200);
            break;
        case "number_vehicles":
            console.log("Number of vehicle is: " + req.body.number);
            instanceBCMS.send("state_police_vehicle_number", { number_of_police_vehicle_required: req.body.number });
            res.send().status(200);
            break;
        default:
            res.status(400).json({
                error: "Bad JSON request"
            });
    }
});