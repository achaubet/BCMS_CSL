declare const BCMSMachine: import("xstate").StateMachine<{
    FSC_credentials: string;
    PSC_credentials: string;
    number_of_fire_truck_required: number;
    number_of_police_vehicle_required: number;
    fire_trucks_dispatched: any[];
    police_vehicle_dispatched: any[];
    fire_trucks_arrived: any[];
    police_vehicle_arrived: any[];
    negotiation_limit: string;
    timeout_reason: string;
}, any, import("xstate").AnyEventObject, {
    value: any;
    context: {
        FSC_credentials: string;
        PSC_credentials: string;
        number_of_fire_truck_required: number;
        number_of_police_vehicle_required: number;
        fire_trucks_dispatched: any[];
        police_vehicle_dispatched: any[];
        fire_trucks_arrived: any[];
        police_vehicle_arrived: any[];
        negotiation_limit: string;
        timeout_reason: string;
    };
}, import("xstate").BaseActionObject, import("xstate").ServiceMap, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, import("xstate").AnyEventObject, import("xstate").BaseActionObject, import("xstate").ServiceMap>>;
export default BCMSMachine;
