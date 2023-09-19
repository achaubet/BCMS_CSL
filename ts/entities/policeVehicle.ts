import { Entity, PrimaryColumn } from 'typeorm';

@Entity("Police_vehicle")
export default class policeVehicle {
    @PrimaryColumn()
    police_vehicle_name: string;
}