import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Crisis from './Crisis';
import policeVehicle from './policeVehicle';
import Route from './Route';

@Entity("Police_vehicle_in_crisis")
export default class policeVehicleInCrisis {
    @PrimaryColumn()
    crisis_id: number;

    @PrimaryColumn()
    police_vehicle_name: string;

    @Column()
    route_name: string;

    @Column()
    police_vehicle_status: string;

    @ManyToOne((type) => Crisis, (Crisis) => Crisis.policeVehiclesInCrisis)
    @JoinColumn({ name: "crisis_id"})
    crisis: Crisis;

    @ManyToOne((type) => policeVehicle, (policeVehicle) => policeVehicle.police_vehicle_name)
    @JoinColumn({ name: "police_vehicle_name"})
    police_vehicle: policeVehicle;

    @ManyToOne((type) => Route, (route) => route.policeVehicleInCrisis)
    @JoinColumn({ name: "route_name" })
    route: Route;
}