import { DataSource, InsertResult, Repository } from "typeorm";
import policeVehicleInCrisis from "../entities/policeVehicleInCrisis";


export default class policeVehicleInCrisisDAO {
    private policeVehicleCrisisRepo: Repository<policeVehicleInCrisis>;
    constructor(dataSource: DataSource) {
        this.policeVehicleCrisisRepo = dataSource.getRepository(policeVehicleInCrisis);
    }
    public async create(policeVehicle: policeVehicleInCrisis): Promise<InsertResult> {
        return await this.policeVehicleCrisisRepo.insert(policeVehicle);
    }
    public async findOne(crisisID: number, policeVehicleName: string): Promise<policeVehicleInCrisis> {
        return await this.policeVehicleCrisisRepo.findOneBy({
            crisis_id: crisisID,
            police_vehicle_name: policeVehicleName
        });
    }
    public async findAll(): Promise<policeVehicleInCrisis[]> {
        return await this.policeVehicleCrisisRepo.find();
    }
    public async update(policeVehicle: policeVehicleInCrisis) {
        await this.policeVehicleCrisisRepo.update({ 
            crisis_id: policeVehicle.crisis_id, 
            police_vehicle_name: policeVehicle.police_vehicle_name
        }, policeVehicle);
    }
    public async delete(policeVehicle: policeVehicleInCrisis) {
        await this.policeVehicleCrisisRepo.remove(policeVehicle);
    }
}