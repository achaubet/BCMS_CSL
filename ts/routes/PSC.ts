// Police Station Coordinator
import express from "express";

export const PSC = express.Router();


PSC.get('/', (res, req) => {
    console.log("Policeman connected");
    req.send().status(200);
})

PSC.post('/', (req, res) => {
    console.log(req.body);
});