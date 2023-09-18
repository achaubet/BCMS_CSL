"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
const BCMSMachine = (0, xstate_1.createMachine)({
    id: 'BCMS',
    initial: 'Init',
    context: {
        FSC_credentials: '',
        PSC_credentials: '',
        number_of_fire_truck_required: 0,
        number_of_police_vehicle_required: 0,
        fire_trucks_dispatched: [],
        police_vehicle_dispatched: [],
        fire_trucks_arrived: [],
        police_vehicle_arrived: [],
        negotiation_limit: '180s',
        timeout_reason: '',
    },
    states: {
        Init: {
            on: {},
        },
    },
});
exports.default = BCMSMachine;
