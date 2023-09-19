import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import fireTruckInCrisis from "./fireTruckInCrisis";
import policeVehicleInCrisis from "./policeVehicleInCrisis";


@Entity()
export default class Route {
    @PrimaryColumn()
    route_name: string;
    
    @OneToMany((type) => fireTruckInCrisis, (fireTruckInCrisis) => fireTruckInCrisis.route_name)
    fireTruckInCrisis: fireTruckInCrisis[];
  
    @OneToMany((type) => policeVehicleInCrisis, (policeVehicleInCrisis) => policeVehicleInCrisis.route_name)
    policeVehicleInCrisis: policeVehicleInCrisis[];
}