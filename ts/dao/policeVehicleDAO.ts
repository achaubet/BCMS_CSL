import { DataSource, InsertResult, Repository } from "typeorm";
import policeVehicle from "../entities/policeVehicle";


export default class policeVehicleDAO {
    private policeVehicleRepo: Repository<policeVehicle>;
    constructor(dataSource: DataSource) {
        this.policeVehicleRepo = dataSource.getRepository(policeVehicle);
    }
    public async create(policeVehicle: policeVehicle): Promise<InsertResult> {
        return await this.policeVehicleRepo.insert(policeVehicle);
    }
    public async findOne(policeVehicleName: string): Promise<policeVehicle> {
        return await this.policeVehicleRepo.findOneBy({
            police_vehicle_name: policeVehicleName
        });
    }
    public async findAll(): Promise<policeVehicle[]> {
        return await this.policeVehicleRepo.find();
    }
    public async update(policeVehicle: policeVehicle) {
        await this.policeVehicleRepo.update(policeVehicle.police_vehicle_name, policeVehicle);
    }
    public async delete(policeVehicle: policeVehicle) {
        await this.policeVehicleRepo.remove(policeVehicle);
    }
}