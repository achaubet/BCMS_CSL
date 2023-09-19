import { Entity, PrimaryColumn } from 'typeorm';

@Entity("Fire_truck")
export default class fireTruck {
    @PrimaryColumn()
    fire_truck_name: string;
}