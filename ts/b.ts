import { createMachine } from 'xstate';

const BCMSMachine = createMachine(
  {
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
        on: {
          

        },
      },
    },
  },
);

export default BCMSMachine;
