import { DataSource, InsertResult, Repository } from "typeorm";
import Route from "../entities/Route";


export default class routeDAO {
    private RouteRepo: Repository<Route>;
    constructor(dataSource: DataSource) {
        this.RouteRepo = dataSource.getRepository(Route);
    }
    public async create(Route: Route): Promise<InsertResult> {
        return await this.RouteRepo.insert(Route);
    }
    public async findOne(name: string): Promise<Route> {
        return await this.RouteRepo.findOneBy({
            route_name: name
        });
    }
    public async findAll(): Promise<Route[]> {
        return await this.RouteRepo.find();
    }
    public async update(Route: Route) {
        await this.RouteRepo.update(Route.route_name, Route);
    }
    public async delete(Route: Route) {
        await this.RouteRepo.remove(Route);
    }
}