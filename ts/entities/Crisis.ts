import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import fireTruckInCrisis from "./fireTruckInCrisis";
import policeVehicleInCrisis from "./policeVehicleInCrisis";


@Entity()
export default class Crisis {
    @PrimaryColumn()
    crisis_id: number;

    @Column()
    fire_truck_number: number;

    @Column()
    police_vehicle_number: number;

    // Mapping avec la classe fireTruckInCrisis
    @OneToMany((type) => fireTruckInCrisis, (fireTruckInCrisis) => fireTruckInCrisis.crisis_id)
    fireTrucksInCrisis: fireTruckInCrisis[];

    // Mapping avec la classe policeVehicleInCrisis
    @OneToMany((type) => policeVehicleInCrisis, (policeVehicleInCrisis) => policeVehicleInCrisis.crisis_id)
    policeVehiclesInCrisis: policeVehicleInCrisis[];
    
}