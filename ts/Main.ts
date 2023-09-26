import { DataSource } from "typeorm"
import Crisis from "./entities/Crisis";
import fireTruck from "./entities/fireTruck";
import fireTruckInCrisis from "./entities/fireTruckInCrisis";
import policeVehicle from "./entities/policeVehicle";
import policeVehicleInCrisis from "./entities/policeVehicleInCrisis";
import Route from "./entities/Route";
import bcmsDAOFactory from "./dao/bcmsDAOFactory";


const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.cwd() + "/db/database.db",
    synchronize: true,
    entities: [
        Crisis,
        fireTruck,
        fireTruckInCrisis,
        policeVehicle,
        policeVehicleInCrisis,
        Route
    ]
});

async function testDAO() {
    await AppDataSource.initialize().then(async () => {
        let daoFactory = new bcmsDAOFactory(AppDataSource);
        let crisisDAO = daoFactory.getCrisisDAO();
        let fireTruckDAO = daoFactory.getFireTruckDAO();
        let fireTruckInCrisisDAO = daoFactory.getFireTruckInCrisisDAO();
        let policeVehicleDAO = daoFactory.getPoliceVehicleDAO();
        let policeVehicleInCrisisDAO = daoFactory.getPoliceVehicleInCrisisDAO();
        let routeDAO = daoFactory.getRouteDAO();
        // Test DAO
        // Instance des classes
        let crise = new Crisis();
        let camionPompier1 = new fireTruck();
        let voiturePolice1 = new policeVehicle();
        let fireTruckCriseA = new fireTruckInCrisis();
        let route = new Route();
        crise.fire_truck_number = 0;
        crise.police_vehicle_number = 1;
        camionPompier1.fire_truck_name = "Camion 1";
        voiturePolice1.police_vehicle_name = "Voiture 1";
        route.route_name = "Route 66";
        await crisisDAO.create(crise);
        await fireTruckDAO.create(camionPompier1);
        await policeVehicleDAO.create(voiturePolice1);
        await routeDAO.create(route);
        fireTruckCriseA.crisis = crise;
        fireTruckCriseA.crisis_id = crise.crisis_id;
        fireTruckCriseA.fire_truck = camionPompier1;
        fireTruckCriseA.fire_truck_name = camionPompier1.fire_truck_name;
        fireTruckCriseA.fire_truck_status = "En Route";
        fireTruckCriseA.route = route;
        fireTruckCriseA.route_name = route.route_name;
        await fireTruckInCrisisDAO.create(fireTruckCriseA);
        crise.fire_truck_number = 200;
        await crisisDAO.update(crise);
        let getVoiture = await policeVehicleDAO.findOne("Voiture 1");
        let getCamion = await fireTruckDAO.findOne("Camion 1");
        let getCrise = await crisisDAO.findOne(crise.crisis_id);
        console.log(getCrise);
        console.log(getCamion);
        console.log(getVoiture);
        // Test suppression avec les références obtenues via les DAO
        await fireTruckInCrisisDAO.delete(fireTruckCriseA);
        await fireTruckDAO.delete(getCamion);
        await policeVehicleDAO.delete(getVoiture);
        await crisisDAO.delete(getCrise);
    });
}

async function testEntities() {
    AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        let crise = new Crisis();
        let voiturePolice = new policeVehicle();
        let camionPompier = new fireTruck();
        let route = new Route()
        crise.crisis_id = 1;
        crise.fire_truck_number = 0;
        crise.police_vehicle_number = 1;

        await AppDataSource.manager.save(crise);

        route.route_name = "Route 66";
        await AppDataSource.manager.save(route);

        voiturePolice.police_vehicle_name = "Voiture Police #1";
        camionPompier.fire_truck_name = "Camion Pompier #1";

        await AppDataSource.manager.save(voiturePolice);
        await AppDataSource.manager.save(camionPompier);

        let voiturePoliceCrise = new policeVehicleInCrisis(); 
        voiturePoliceCrise.police_vehicle_name = voiturePolice.police_vehicle_name;
        voiturePoliceCrise.crisis_id = crise.crisis_id;
        voiturePoliceCrise.route_name = route.route_name;
        voiturePoliceCrise.police_vehicle_status = 'En Route';

        await AppDataSource.manager.save(voiturePoliceCrise);
        await AppDataSource.manager.save(crise);

        await AppDataSource.manager.findOneBy(Crisis, {
            crisis_id: 1
        }).then((val) => {
            console.log(val);
            
        });
        await AppDataSource.manager.remove(voiturePoliceCrise);
        await AppDataSource.manager.remove(voiturePolice);
        await AppDataSource.manager.remove(camionPompier);
        await AppDataSource.manager.remove(route);
        await AppDataSource.manager.remove(crise);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}

testDAO();
//testEntities();
