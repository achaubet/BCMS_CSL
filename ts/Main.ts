import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { FSC } from "./routes/FSC";
import { PSC } from "./routes/PSC";
import { System } from "./routes/System";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = 3000;

// curl -X GET http://localhost:3000/FSC
// curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/FSC
app.use('/FSC', FSC);
app.use('/PSC', PSC);
app.use('/System', System);
app.listen(port, () => {
    console.log(`Barbados Crisis Management System server is listening on port ${port}`)
});
