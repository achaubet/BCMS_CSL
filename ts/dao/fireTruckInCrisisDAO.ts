import { DataSource, InsertResult, Repository } from "typeorm";
import fireTruckInCrisis from "../entities/fireTruckInCrisis";


export default class fireTruckInCrisisDAO {
    private fireTruckCrisisRepo: Repository<fireTruckInCrisis>;
    constructor(dataSource: DataSource) {
        this.fireTruckCrisisRepo = dataSource.getRepository(fireTruckInCrisis);
    }
    public async create(fireTruck: fireTruckInCrisis): Promise<InsertResult> {
        return await this.fireTruckCrisisRepo.insert(fireTruck);
    }
    public async findOne(crisisID: number, fireTruckName: string): Promise<fireTruckInCrisis> {
        return await this.fireTruckCrisisRepo.findOneBy({
            crisis_id: crisisID,
            fire_truck_name: fireTruckName
        });
    }
    public async findAll(): Promise<fireTruckInCrisis[]> {
        return await this.fireTruckCrisisRepo.find();
    }
    public async update(fireTruck: fireTruckInCrisis) {
        await this.fireTruckCrisisRepo.update({ 
            crisis_id: fireTruck.crisis_id, 
            fire_truck_name: fireTruck.fire_truck_name
        }, fireTruck);
    }
    public async delete(fireTruck: fireTruckInCrisis) {
        await this.fireTruckCrisisRepo.remove(fireTruck);
    }
}