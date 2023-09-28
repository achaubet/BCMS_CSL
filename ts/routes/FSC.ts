// Fire Station Coordinator
import express from "express";
import { instanceBCMS } from "../bcmsStateMachine";

export const FSC = express.Router();


FSC.get('/', (res, req) => {
    console.log("Fireman connected");
    req.send().status(200);
})

FSC.post('/', (req, res) => {
    switch(req.body.type) {
        case "connection":
            console.log("Fireman connected!");
            instanceBCMS.send("FSC_connection_request");
            res.send().status(200);
            break;
        case "number_trucks":
            console.log("Number of firetruck is: " + req.body.number);
            instanceBCMS.send("state_fire_truck_number", { number_of_fire_truck_required: req.body.number });
            res.send().status(200);
            break;
        default:
            res.status(400).json({
                error: "Bad JSON request"
            });
    }
});