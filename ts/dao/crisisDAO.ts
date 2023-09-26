import { DataSource, InsertResult, Repository } from "typeorm";
import Crisis from "../entities/Crisis";


export default class crisisDAO {
    private crisisRepo: Repository<Crisis>;
    constructor(dataSource: DataSource) {
        this.crisisRepo = dataSource.getRepository(Crisis);
    }
    public async create(crisis: Crisis): Promise<InsertResult> {
        let max_id = await this.crisisRepo.maximum("crisis_id");
        console.log("Max id is: " + max_id);
        if(max_id == null) {
            crisis.crisis_id = 0;
        } else {
            crisis.crisis_id = max_id + 1;
        }
        
        return await this.crisisRepo.insert(crisis);
    }
    public async findOne(crisisId: number): Promise<Crisis> {
        return await this.crisisRepo.findOneBy({
            crisis_id: crisisId
        });
    }
    public async findAll(): Promise<Crisis[]> {
        return await this.crisisRepo.find();
    }
    public async update(crisis: Crisis) {
        await this.crisisRepo.update(crisis.crisis_id ,crisis);
    }
    public async delete(crisis: Crisis) {
        await this.crisisRepo.remove(crisis);
    }
}