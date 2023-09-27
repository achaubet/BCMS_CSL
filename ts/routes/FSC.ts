// Fire Station Coordinator
import express from "express";

export const FSC = express.Router();


FSC.get('/', (res, req) => {
    console.log("Fireman connected");
    req.send().status(200);
})

FSC.post('/', (req, res) => {
    console.log(req.body);
    let jsonData = JSON.parse(req.body);
    switch(jsonData) {
        case "ajouter_camion":
            console.log("Nom du camion: " + req.body.nom_camion);
        default:
            res.status(404);
    }
    res.status(201).json({
        message: "Bien reçu!"
    });
});