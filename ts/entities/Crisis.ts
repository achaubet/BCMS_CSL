import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Crisis {
  @PrimaryGeneratedColumn()
  crisis_id: number;

  @Column()
  fire_truck_number: number;

  @Column()
  police_vehicle_number: number;
}