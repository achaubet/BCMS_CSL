import { createMachine, assign, interpret } from "xstate";
import { factory } from "./databaseConnection";
import Crisis from "./entities/Crisis";
import Route from "./entities/Route";
import fireTruckInCrisis from "./entities/fireTruckInCrisis";
import policeVehicleInCrisis from "./entities/policeVehicleInCrisis";

interface Context {
  FSC_credentials: String;
  PSC_credentials: String;
  number_of_fire_truck_required: number;
  number_of_police_vehicle_required: number;
  route_police_vehicle_proposal: string;
  route_fire_truck_proposal: string;
  fire_trucks_dispatched: number;
  police_vehicle_dispatched: number;
  fire_trucks_arrived: number;
  police_vehicle_arrived: number;
  Crisis: Crisis;
  routePolice: Route;
  routeFireman: Route;
  firetruckCrisis: fireTruckInCrisis[];
  policeVehicleCrisis: policeVehicleInCrisis[];
}

const bcmsStateMachine = createMachine<Context>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCEDCBZAygOgJYDtcAXAYgDFNUB9AYwHt98wajcGqAnMARwFc4iAbQAMAXUSgADnVjE2+CSAAeiAIwAmAMzYA7AFZ1e1Zp0A2Tap2W9AGhABPRAA5hq7ABYAnHs+nVe-ScAzwBfELs0LDxCUgAFSloGJhZ5Th5+WCExRWlZVgZFFQRjT2w9J1NPbxdhdxcAu0cETx1hbHUnExdVJ38jTTCIjBwKanpGZiJIEnixpMnUrj4BEXEkEFy5AvWinU11bEr3K3d3C39VU0bnVw9vX39A8sGQSJxZxImWadHP5Pz8GllplVjkZFsFDtEDpWmUnOphMJ4adKk53NdmrCOl1XL09EZ3C83thMFNJFRNFRUHQ6BwIAQAIYAklk2AUzQM1TshnqKgAOTAUDorCZ8hIEAYYGwmSZUuJpLA5Mp1Np9PwooYLMVbM0HK5up5-MFwtwGvwoPWmwBiiaxk07mwvVM6kMOk87g6wk8diK6ndpg8dX2OncpmEHVOROGWqVVJpdMZzIVkh1eu5vIFQpFzIASnReFMqAAzWnF3BcKhEDi8GgAazZEDAADcwAAbOiSAC2YHwRGweYLYGLpaL5aHVZr9crdCoACMh5IOB2ZNMl4PhxwyxWJ3XYBapODrVDisITGVPKphHsQ7rzJoMX1Si6DJo8a13MYo1FkxS46rE-IMappy6ZGlmpq5vmhYlpuo7btWu5UI2Lbtl2PZ9gO0EjmOlYIVOo5KD8CT0rADJQFwcBUAys5QVu454ZwUFgPuGyHvIhRqKeOjnpe15nJod4PnoXqOpcz5uh6LihOErzRj+yrxmqZpAdy+ochmxrZoBmFDjBdG4ZODbNm2Hbdr2-ZMRu+k7vhuCERA5AJGRFFstRtFwfRk6MYOLFWuxx5iU4jofh0aLCWYdRCZYjpVHophhrUurqDoX44PJf4JuqSasqpoGZiayk6VZ0itrgNBDi2AAWZWtpRyEmWh5lFXpJVlRVYDVTQtVskQM7zlQi7LrAq6WS1dCleVVBVTVcC+Wx2ygEUl69GUBiVHFVh+joD6eLqhzCKYklxeopgBKlMa-iqmXKcmwFqYa+VaZqzWlq1k3TV1dXGahZkYaNr3jW1U0dTNbIEUR1Akc5YCUW5BYDYD70g593lTHNeT+YtnEVNgLTxWiOjqLxD7wgG9oaMY+JE4Y53pVdSnZdquUGhp4GFf9m5ve1nXdUh32mehFnrmNE3c6DZb2Y51DQ7DNHw1zwM80Oa5o9klrzZCWPFCGDqnCdezGGF6gk-aHjqO4+ImM6lgpTJ8pklQ7hUAAIrgsCSEyNDVfgUAkB5Bl1khbse0QXuQOjEIcQgAC0l4HHUlhXkTpyhvFGLm6YQXCHoAn40EoaXLTDtO677ue97vs9vmUCVdZeENsH5fh2rB4YwtyiIEG2CaC0ewVH6GgIrYDiIObXjd4Tp1GEY8JXkXiqOy7jehxXJAKx9tVB2XK-N2sreR8e0fk46V5Iq+mher4ZjpxGjoGJ4GfYrU8-kiXy9ewQlf4NXtfr8jvMkRDmHCAEcjxa11G0S8SJdrnH8GnEeCAXR7GwD0dwtQnAGx8AMO20YACCrZWx10MlvIBlVph-yViQpuICW6sTbprDuzRVBuEOq0d0+xESnXvAgwwphuImFcLUTOt4TrnXwYQ-2NkG7b2ASQKuvAa4I1ForcWgDqGgMxowjQD51BiIIUooGG86rvzIQ5SRDE1E7xoXvOhB8taXk8FnRxu1XB+HtOUdO-hSj6AimGF05hs56MIRQ1RJjpjyMUeY4hljgEaPbkUaOvDDj6H9OGEMJ10QIOYZnbuFsPR1CREEPQL8qB6CoLgjgHBcBNgZK2cUkppREFlNge2C8ykVKqTU1scSGFLQMHoXQaJLwegOn6D0GJ9hBWMH6EwhhhIhVtkMb8Dt2mVOqbUv2OEbJzi4AyWsEoADu5paF+XidCHo7QZlYNcC0E6GIYTYGzkEcwzp3QOJKaszpGyQko1nLs-ZdAjk9KjpeU6uhWg91ODCc29p7ncSeQYBZwkCQfPKWsrpmz4JeVnO2Osu8wT0JBZnNwnhEQemGYTF0GIDBZwRG6e0JhHF6EJDg5ZbS0VfLqT8zeOK6B4usQSuxWi+EHAqIlB+eNOEYjDAM7OPhwowj2JGVlaUVkcvWXUmgVTZBsjdlQTstIhzDRbFwYFAU+EBjyZTBErgLYYnyY6HQUlTzZz8FUbBSzVXso6RqkgWq3Z6r1d1NkxqwCmpORrEF+IgrCVeaeKmdKMTR0OqJVofCCZOG8H6VFPqunYDIFs+uVF0W1PzYW4hDJ0Wfzkd-BRtcomIUrZ0-F6tCXHgvtoNEXpzAVC8LtO1CCBLcU6KSwmoY3RE1UCyz1F1PkauwLERGYtPquRLa2BdS6VEruLZ06tETf6bqMau5tArW1CqKLqbQfoc6OItg-RK1KOiPPiqoKod5ejZpVdgaknZJC1QBFQOgRZAOzgAFYLBbLAP17Zhpmq1loCw7RQw50sPe-YEzEM62ZYYM4rQp2LNklEVA2q9WNiabgVsbIwBKC9gyH2YASAykLPgXgnZ5wcDg4womTqUGkqvGGXorRtpZNqAcbw2dsQej8P4c6xGA0hqacx1j7Gy1YsDixtjYbGmyiIep5TYbyAafY3zUcTBT37zAYw3ULQUFOE6FC8M+GMTeDcEOzQ09pmGGkjOuTOqqBMaHEZgzEomDaamC06Mvm9UBaoEFjjEa23gNfW4CdfgXTun6Doq8KC0HuvWqh2TJGFM6bixu5RRjYv6Y4GFhch7-6BaqzMOLJmCAtos5o30GCgp7AHvFAw+gDrOdfeChlZgugWGKS8b+jZ4DrDeIKyzCTXylBcK0TonRL4WqTf4A4FghMYJQ7Fc6BBiALY64gZNbg5VulfRbTOFtjYIMzQGB+ARkrmyJheJw51fjjH+JAM7ZyEDHADMJbOPd7RXi8AJDE3Q7g+D8AEcowRzofD+5MAHZ7FuIHxAM5aB1gjCQ+85rEnQnW4j6J+L9UWjLkco1QajtH6OA96aPDQAZERQ-cwiHop1qU4xcccDoW1C5frpopAC7dTms4QPiAMfDajCQwR+XuOjjjd0uBYXaLoCm6LFw7BS-4sqAVuszdSYECqWel1HMMDoFcWyRCGV9MIHy6gdE6c22ddpE5KYb66jMUxm4eppCC2kOa6anPVH66EWc24MMkxXjuVcu6yR6XblwM+9pfN9-XC8-cMxNzlA091WaW7D8LbCanI-80an9CvsFy2IV6nOBcS5ciY-a0D1obR7dK6d6rrJ09u7Muzn0XHVhfcZQL5qU3xe8oh-ZvXiPRkUICyauHhttl7Kx4CiYbibo4oomYQfqKw6R-T1xwEVQk-6aS-wCpOfLMLdPXvy9BvVeV8NV+kLLC7-PKNskEGhbAgB33g3e27ivAvkJi9Epiinl1qE22phvwl2NxnyLzTCf0elD2enD25S+lX1r1AMYXxlxnyR6HDHc0uEyVtD7mCmYS8GdC0EzmQKNxunQJAkwIX0giXzwM-2j3Xx4LqyVh6j6lbyGg71sWxwQCsBezIJcC0CMEOhNjcAwQvCqFPDREcQI1aVjFv1QPv1nwwPNywMX1-wMSRmEL5gIO-zf3MOXV5nBhAKx3O2KFDDaGxFfGZSsC9EiiyXswnjUNJVfC8AwRYP90LyZkf2MK4PLzMN4KsK-0FlsPiIZEAKXGAKIN9EhTKGWmSjcIjGoLUE6G0A0AfmOGGSnRk1z1fiXhkQrkyLUFJRQVfTd2Sk2kzW4SaAUIDA0Dw2RRnhhCCWXyoSsQaIQDJ1EhnnKHvXmXTlOFKFmSnguFnm0LwX0XiJiVMTGLW14ydUOmP38HDE8VhBhGODvQwQRCCBzTXTGOYR2jcGZVzjTwsBMEsGuM5VU3-ynCbQ1TGJ8HTjdEeTOFOkzgUJOlMHePnQLQ-x3ShMb2+KrR9luKvAmT4V0F2gtURX7hzxnR-DnTzWhK+OPXnXEWGJ+IyOcKB0vDimH3Ng0GOiKU6MQFzjKGBKCEKR8EcQ9UIy9XJHxNLUXXK3q2JK6T+O9AQTOCfDW1fVOg-HDD11xLVVzQFKEPFnJJVKFMsPJM-mROEyaBpUeTpX2LszRDs0hLzUFMMWFNhLzVJJSPRQkOtwCmYSCnvVDHcyeT4UfQDBhCREHmZS8FFx8zoF-X-VSCAxA3AxSEg1uMVTKC9ERGKKsEvFUAwzcFfVJU9HdFezRHOgAFF8AIBANgN-UdUxjkoc5cZM4UkLxHhUzB0-RSDM0Wg4EfFCt5N-NFMGtNMOByybxBkfFDo71X1h4mgX1ckRzijM0nd2y-MYtStLSLCZpKsey+yLwByAghyfARz7l1chks1kp+5JsfMitOySsqtPiA5awVz2MxiIEBkIUMSNAe54omTpDyhu53NOgBMrYehZzosuybytNFz7DuyVMYs8CgLezKSZdsRvEDsIphzvBYdTZyZfA8ZzYgj-zislMeyysrTKFSs+Qqtiy7Ct1N5GxTNHTI1jwOgjBmjXAnU0QLBiiHwEDDSjAQwudEzsKzzcKVNCSryoKasI8oK7yTAHQXj9gcRhcrgntThHQvyDpjg1DeheL5yLzBLtkiKSKIzN8WszNxLKzHyBJnzfBzA2LQwcsfC+FNoBMwgwggA */
  id: "BCMS",

  initial: "init",
  predictableActionArguments: true,

  context: {
    FSC_credentials: "",
    PSC_credentials: "",
    number_of_fire_truck_required: 0,
    number_of_police_vehicle_required: 0,
    route_police_vehicle_proposal: "",
    route_fire_truck_proposal: "",
    fire_trucks_dispatched: 0,
    police_vehicle_dispatched: 0,
    fire_trucks_arrived: 0,
    police_vehicle_arrived: 0,
    Crisis: new Crisis(),
    routePolice: new Route(),
    routeFireman: new Route(),
    firetruckCrisis: [],
    policeVehicleCrisis: [],
  },

  schema: {
    events: {} as
    | { type: "FSC_connection_request" }
    | { type: "PSC_connection_request" }
    | { type: "Crisis_details_exchange" }
    | { type: "Number_of_fire_truck_defined"; data: { number_of_fire_truck_required: number } }
    | { type: "Number_of_police_vehicle_defined"; data: { number_of_police_vehicle_required: number }}
    | { type: "Route_for_fire_trucks_fixed"; data: { route_fire_truck_proposal: string }}
    | { type: "Route_for_police_vehicle_fixed"; data: { route_police_vehicle_proposal: string }}
  },

  states: {
    init: {
      on: {
        FSC_connection_request: "FSC_connected",
        PSC_connection_request: "PSC_connected",
      },
    },

    FSC_connected: {
      on: {
        PSC_connection_request: "Crisis_details_exchange",
      },
    },

    PSC_connected: {
      on: {
        FSC_connection_request: "Crisis_details_exchange",
      },
    },

    Crisis_details_exchange: {
      entry: () => instanceBCMS.send('state_number'),
      on: {
        state_number: "Crisis_state_number"
      }
    },

    Crisis_state_number: {
      states: {
        Police_vehicle_number: {
          states: {
            state_police_vehicle_number: {
              on: {
                set_police_vehicle_number: {
                  target: "Number_of_police_vehicle_defined",
                  actions: assign({
                    number_of_police_vehicle_required: (context, event) => {
                      context.Crisis.police_vehicle_number =  event.number_of_police_vehicle_required;
                      return event.number_of_police_vehicle_required;
                    }
                  }),
                },
              }
            },

            Number_of_police_vehicle_defined: {
              type: "final"
            }
          },

          initial: "state_police_vehicle_number"
        },

        Fire_truck_number: {
          states: {
            state_fire_truck_number: {
              on: {
                set_fire_truck_number: {
                  target: "Number_of_fire_truck_defined",
                  actions: assign({
                    number_of_fire_truck_required: (context, event) => {
                      context.Crisis.fire_truck_number = event.number_of_fire_truck_required;
                      return event.number_of_fire_truck_required;
                    },
                  }),
                },
              }
            },

            Number_of_fire_truck_defined: {
              type: "final"
            }
          },

          initial: "state_fire_truck_number"
        }
      },

      type: "parallel",

      onDone: "Step_3_Coordination"
    },

    Step_3_Coordination: {
      entry: async (context) => {
        let daoCrisis = factory.getCrisisDAO();
        context.Crisis = await daoCrisis.create(context.Crisis);
        console.info(context.Crisis);
      },
      type: "parallel",
      states: {
        Steps_33a1_33a2_Negotiation: {
          type: "parallel",
          states: {
            Route_for_fire_trucks_development: {
              states: {
                Route_for_fire_trucks_to_be_proposed: {
                  on: {
                    route_for_fire_trucks: {
                      target: "Route_for_fire_trucks_fixed",
                      actions: assign({
                        route_fire_truck_proposal: (context, event) => {
                          return event.route_fire_truck_proposal;
                        }
                      }),
                    },
                  },
                },
                Route_for_fire_trucks_fixed: {
                  on: {
                    FSC_disagrees_about_fire_truck_route:
                      "Route_for_fire_trucks_to_be_proposed",
                    FSC_agrees_about_fire_truck_route: [
                      {
                        target: "Route_for_fire_trucks_approved",
                      },
                    ],
                  },
                },
                Route_for_fire_trucks_approved: {
                  entry: (context) => {
                    context.routeFireman.route_name = context.route_fire_truck_proposal;
                    let routeDAO = factory.getRouteDAO();
                    routeDAO.create(context.routeFireman);
                  },
                  type: "final",
                },
              },
              initial: "Route_for_fire_trucks_to_be_proposed",
            },
            Route_for_police_vehicles_development: {
              states: {
                Route_for_police_vehicles_to_be_proposed: {
                  on: {
                    route_for_police_vehicles: {
                      target: "Route_for_police_vehicles_fixed",
                      actions: assign({
                        route_police_vehicle_proposal: (context, event) => {
                          return event.route_police_vehicle_proposal;
                        }
                      }),
                    },
                  },
                },

                Route_for_police_vehicles_fixed: {
                  on: {
                    FSC_disagrees_about_police_vehicle_route:
                      "Route_for_police_vehicles_to_be_proposed",
                    FSC_agrees_about_police_vehicle_route: [
                      {
                        target: "Route_for_police_vehicles_approved",
                      },
                    ],
                  },
                },

                Route_for_police_vehicles_approved: {
                  entry: (context) => {
                    context.routePolice.route_name = context.route_police_vehicle_proposal;
                    let routeDAO = factory.getRouteDAO();
                    routeDAO.create(context.routePolice);
                  },
                  type: "final",
                },
              },

              initial: "Route_for_police_vehicles_to_be_proposed",
            },
          },
          onDone: {
            target: "#BCMS.Step_4_Dispatching",
          },
        },
      },
    },

    Step_4_Dispatching: {
      entry: async (context) => {
        let fireTruckDAO = factory.getFireTruckDAO();
        let policeVehicleDAO = factory.getPoliceVehicleDAO();
        for(let i = 0; i < context.number_of_fire_truck_required; i++) {
          let firetruck = await fireTruckDAO.findOne("Fire truck #" + (i + 1));
          let firetruckCrisis = new fireTruckInCrisis();
          firetruckCrisis.crisis_id = context.Crisis.crisis_id;
          firetruckCrisis.fire_truck_name = firetruck.fire_truck_name;
          firetruckCrisis.route_name = context.routeFireman.route_name;
          firetruckCrisis.fire_truck_status = "Dispatched";
          await factory.getFireTruckInCrisisDAO().create(firetruckCrisis);
        }
        for(let i = 0; i < context.number_of_police_vehicle_required; i++) {
          let policevehicle = await policeVehicleDAO.findOne("Police Vehicle #" + (i + 1));
          let policevehicleCrisis = new policeVehicleInCrisis();
          policevehicleCrisis.crisis_id = context.Crisis.crisis_id;
          policevehicleCrisis.police_vehicle_name = policevehicle.police_vehicle_name;
          policevehicleCrisis.route_name = context.routePolice.route_name;
          policevehicleCrisis.police_vehicle_status = "Dispatched";
          await factory.getPoliceVehicleInCrisisDAO().create(policevehicleCrisis);
        }
      },
      on: {
        fire_truck_dispatched: {
          target: "Step_4_Dispatching",
          actions: assign({
            fire_trucks_dispatched: (context, event) => {
              return context.fire_trucks_dispatched++;
            }
          }),
          cond: 'areEnoughFireTrucksDispatched',
        },
        enough_fire_trucks_dispatched: {
          target: "All_fire_trucks_dispatched",
        },
        police_vehicle_dispatched: {
          target: "Step_4_Dispatching",
          cond: "areEnoughPoliceVehiclesDispatched",
        },
        enough_police_vehicles_dispatched: {
          target: "All_police_vehicles_dispatched",
        },
      },
    },

    All_fire_trucks_dispatched: {
      on: {
        police_vehicle_dispatched: {
          target: "All_fire_trucks_dispatched",
        },
        enough_police_vehicles_dispatched: {
          target: "Step_5_Arrival",
        },
      },
    },

    All_police_vehicles_dispatched: {
      on: {
        fire_truck_dispatched: {
          target: "All_police_vehicles_dispatched",
        },
        enough_fire_trucks_dispatched: {
          target: "Step_5_Arrival",
        },
      },
    },

    Step_5_Arrival: {
      type: "parallel",
      states: {
        Fire_trucks_arrival: {
          initial: "Fire_trucks_arriving",
          states: {
            Fire_trucks_arriving: {
              on: {
                enough_fire_trucks_arrived: [
                  {
                    target: "All_fire_trucks_arrived",
                  },
                ],
              },
            },

            All_fire_trucks_arrived: {
              type: "final",
            },
          },
        },

        Police_vehicles_arrival: {
          initial: "Police_vehicles_arriving",

          states: {
            Police_vehicles_arriving: {
              on: {
                enough_police_vehicles_arrived: [
                  {
                    target: "All_police_vehicles_arrived",
                  },
                ],
              },
            },
            All_police_vehicles_arrived: {
              type: "final",
            },
          },
        },
      },
      on: {
        fire_truck_breakdown: {},
        police_vehicle_breakdown: {},
        fire_truck_blocked: "Crisis_details_exchange",
        police_vehicle_blocked: "Crisis_details_exchange",
        crisis_is_more_severe: "Crisis_details_exchange",
        crisis_is_less_severe: [
          {
            target: "Completion_of_objectives",
            actions: ["sendFireTruckRecalled", "sendPoliceVehicleRecalled"],
          },
        ],
      },
      onDone: {
        target: "Completion_of_objectives",
      },
    },

    Completion_of_objectives: {
      entry: () => instanceBCMS.send('close'),
      on: {
        close: "End_of_crisis",
      },
    },

    End_of_crisis: {
      type: "final",
    },
  }
},
{
  guards: {
    areEnoughFireTrucksDispatched: (context) => {
      return context.number_of_fire_truck_required == context.fire_trucks_dispatched;
    },
    areEnoughPoliceVehiclesDispatched: (context) => {
      return context.number_of_police_vehicle_required == context.police_vehicle_dispatched;
    }
  },
}
);

export const instanceBCMS = interpret(bcmsStateMachine).onTransition((state) => {
  console.log(state.value);
  // console.log("Actual NB of firetruck required: " + state.context.number_of_fire_truck_required);
  // console.log("Dispatched: " + state.context.fire_trucks_dispatched);
}).onDone(() => {
  console.log("Fin de la crise");
});
instanceBCMS.start();


