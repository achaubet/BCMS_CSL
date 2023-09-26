import { DataSource } from "typeorm";
import crisisDAO from "./crisisDAO";
import fireTruckDAO from "./fireTruckDAO";
import policeVehicleDAO from "./policeVehicleDAO";
import routeDAO from "./routeDAO";
import fireTruckInCrisisDAO from "./fireTruckInCrisisDAO";
import policeVehicleInCrisisDAO from "./policeVehicleInCrisis";



export default class bcmsDAOFactory {
    private dataSource: DataSource;
    private crisisDAO: crisisDAO;
    private fireTruckDAO: fireTruckDAO;
    private fireTruckInCrisisDAO: fireTruckInCrisisDAO;
    private policeVehicleDAO: policeVehicleDAO;
    private policeVehicleInCrisisDAO: policeVehicleInCrisisDAO;
    private routeDAO: routeDAO;
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }
    public getCrisisDAO() {
        if (this.crisisDAO == undefined) {
            this.crisisDAO = new crisisDAO(this.dataSource);
        }
        return this.crisisDAO;
    }
    public getFireTruckDAO() {
        if (this.fireTruckDAO == undefined) {
            this.fireTruckDAO = new fireTruckDAO(this.dataSource);
        }
        return this.fireTruckDAO;
    }
    public getFireTruckInCrisisDAO() {
        if (this.fireTruckInCrisisDAO == undefined) {
            this.fireTruckInCrisisDAO = new fireTruckInCrisisDAO(this.dataSource);
        }
        return this.fireTruckInCrisisDAO;
    }
    public getPoliceVehicleDAO() {
        if (this.policeVehicleDAO == undefined) {
            this.policeVehicleDAO = new policeVehicleDAO(this.dataSource);
        }
        return this.policeVehicleDAO;
    }
    public getPoliceVehicleInCrisisDAO() {
        if (this.policeVehicleInCrisisDAO == undefined) {
            this.policeVehicleInCrisisDAO = new policeVehicleInCrisisDAO(this.dataSource);
        }
        return this.policeVehicleInCrisisDAO;
    }
    public getRouteDAO() {
        if (this.routeDAO == undefined) {
            this.routeDAO = new routeDAO(this.dataSource);
        }
        return this.routeDAO;
    } 
}