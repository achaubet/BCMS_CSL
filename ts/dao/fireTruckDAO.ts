import { DataSource, InsertResult, Repository } from "typeorm";
import fireTruck from "../entities/fireTruck";


export default class fireTruckDAO {
    private fireTruckRepo: Repository<fireTruck>;
    constructor(dataSource: DataSource) {
        this.fireTruckRepo = dataSource.getRepository(fireTruck);
    }
    public async create(fireTruck: fireTruck): Promise<InsertResult> {
        return await this.fireTruckRepo.insert(fireTruck);
    }
    public async findOne(fireTruckName: string): Promise<fireTruck> {
        return await this.fireTruckRepo.findOneBy({
            fire_truck_name: fireTruckName
        });
    }
    public async findAll(): Promise<fireTruck[]> {
        return await this.fireTruckRepo.find();
    }
    public async update(fireTruck: fireTruck) {
        await this.fireTruckRepo.update(fireTruck.fire_truck_name, fireTruck);
    }
    public async delete(fireTruck: fireTruck) {
        await this.fireTruckRepo.remove(fireTruck);
    }
}