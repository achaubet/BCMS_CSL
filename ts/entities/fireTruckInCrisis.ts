import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Crisis from './Crisis';
import fireTruck from './fireTruck';
import Route from './Route';

@Entity("Fire_truck_in_crisis")
export default class fireTruckInCrisis {
    @PrimaryColumn()
    crisis_id: number;

    @PrimaryColumn()
    fire_truck_name: string;

    @Column()
    fire_truck_status: string;

    @Column()
    route_name: string;

    @ManyToOne((type) => Crisis, (Crisis) => Crisis.fireTrucksInCrisis)
    @JoinColumn({ name: "crisis_id"})
    crisis: Crisis;

    @ManyToOne((type) => fireTruck, (fireTruck) => fireTruck.fire_truck_name)
    @JoinColumn({ name: "fire_truck_name"})
    fire_truck: fireTruck;

    @ManyToOne((type) => Route, (Route) => Route.fireTruckInCrisis)
    @JoinColumn({ name: "route_name" })
    route: Route;
}