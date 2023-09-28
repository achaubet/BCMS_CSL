import { createMachine, assign, interpret } from "xstate";

interface Context {
  FSC_credentials: String;
  PSC_credentials: String;
  number_of_fire_truck_required: Number;
  number_of_police_vehicle_required: Number;

}

const bcmsStateMachine = createMachine<Context>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCEDCBZAygOgJYDtcAXAYgDFNUB9AYwHt98wajcGqAnMARwFc4iAbQAMAXUSgADnVjE2+CSAAeiAIwA2AMzYAnHp0B2Q+oAc6gwFZhAJgA0IAJ6ITwnbvUAWU6p2aLVrwBfQPs0LDxCUgAFSloGJhZ5Th5+WCExRWlZVgZFFQRVDxNsAw8LD2tNUwNVa2sdO0dnE1VsFsr1HQ9VC06LE2DQjBwKanpGZiJIEhix+Mmkrj4BEXEkECy5XPX8g00DNobVVU0Tf2ETg3snBAbhbF6bE4trc16dQZAwnFm4iZZpqM-gkcvhkss0qtMjItgodohLMUajYWsIyt1rFcmggzNYSh5uqVNJd-AZPt9sKgOLhZLAqBAwEQAIa4AA2dLAShoAAsmfgYCQ0kyplQAGa4LhUIgcXg0ADWVHwvAAtgAjMAcKHrTagvJqfytNHWEw6EwE6xWSrXRCk7DdTTCSzqdQ9AwmAYhL7DSnU2n0xks9lUTk8vkCoUi6Ss3A0MBUABuYG5MdZcaVao1WqkMN18IKFk0HjtLm6zt8zosqmtCHU5WwaLMtYJFksNXJ3oAcir1RwqHRRWKJXHpbKFQzxUwIILmZG6NHYwmkym093MxltTn5Hr82aSv0XCdji4zNXy9gep0PGi9BY9B52+Euxne-2qFGY3HE8maKn-RPphGcbipKI7yoqq6auu2bZFueY+KoxQeFUDSVp0xz7NWqhouo56aH4vi3lh1jCOoD44JgUySFQmhUKgdB0BwEAEMK8jYBRYCSHSeFMqo1GaEy1hUB2YBQHQrAsQw2AAEp0LwIqigxg4gTK8p0gyiasnQkjKmA+BENJsnyYpwHDipcp0kQdBUOqb4cFpMjTHZclAcZQ5SmZsBZhsm7bKA+QALS3sUxJdLWmg6J4ASYS0BwmNYWEXKYVQWmRbGUdRtH0YxzGgmlHFcfxvHcYJwmieJuUyc5Yqucpo5qWAGlaTpekGVVCm9iZ7l1YOSiArETGwEyUBcHAVBMqqhlKaZo6cIZYBeTqsF+Yg-mGG4PReGaFYmAYNTRZoeLEsIFxmi2lRkp6FLsVRNF0QxTH4BJ+B5ZxfE8W9JUiWJuBPa1RkdW5oHmf6jXabp+mVf9U1dapPV9dQQ0jXS42TZ1QOzc5C0+XCy0IIFFQlKoRjCP0Hh6MemFdPcB2uBFJh+F4F1DOE10ZXd2WPbl10Fe9xVCV95WsZDLkA7VsPqWAmlgy1wvVaL02w+KvVTkCiNgKNKNydD6NOVMgiqGs0Gwtu-mvAcrxbbWtP7B41bEfs2C1m6NQGK8OiOqRl3eqzt1ZQ9v3c29RX8Z9ZU-RVc1y2+c4fou36pvVoPNRDkftdH86fkuP6jZZ1lxpIdlZI5qeKe+C5fsunlQd5MG+coK39AcEW+C0DS4mamH1PcSEu8I4Vxb0qU+5l905axgfccHAn82Hv2y2nZeZ-Ho0S1Lyd-SL6exxX2d0kr8P0jSasaxNWuL3Hy4Y3r1eLXXAV6NoDqYj0rw+C6Jid+7dr7ETfemhantmbkXSr7UenNx6UR5lPUO3054l17OfHeCcQaSyauDDeUdEFZ2QfvFWsRj7I1PkQLe5dsFxl1vNG+2MTaFm0K7AwjoXg02EGcTCBJWiXBIgwvuNtNBDxASPDmAdIFBw+jPWBEc2qlxjqQ5eidUHSxTlIhBMil6VzhnghGw11aEMmlg5eV95oG2hLXHG9c8bP2wK8Fs5N6YnGsASTCB1tCYj0H3FoJxjz8I4lQDwVAAAiNJJDCh5AQKAJA0ZmUPrAYJRAeSQCxqY7clQSa6CCjtJCB03ROOdPWfY7tKhmDdN4qifjAkxJCcmfkJBdKySgNybWHlomxPiRARJxs4LuiLDoF4ewCRugLFWbEroLDnkKEUdQ9R6jlEAV6Fm6UylBMqWEkg+jL4DRadyBJVCkl5nOhw44joigFh6WUTuLZHamnKMdFsLQ+Fe3mT4xZFS4lVPCbU3g9SSFqN3s0yp2zDY1w6bjBCZR6wnKJq8R0XRbbDKQqMzEcUwqnGdEzOZOAACCrJWSNO6hs-5U41nZz+a8gFJjgXmKOjhWstYWxolobCm4hRCyOyvF4IorsUKzIpFinFkS8VLNJVOD5XyiXIPxUK9puYQWeFaP0ZKlg6j7CxEyjwDCrFnH8GUBoXcLCpV5d8i+vyJWtIiYDKJJqtltJ2RS-IxJwp2jKLeQwZQjBE0wq4A4-QlXwoYZUfV2LDVIJXoK01IqGn8vFqGq1UqlrmP8l4UZ6hjoOlxA4roGFsT1GwMSMohRm7GlKF0EpVALBUAxRwak8YmSsjNWLBUqouBMjlBAOgAB3fAsa76IAOniOKLhFXcI9tWUoVii37ALGTUwrwS1lorVWmtqzVFGt-I2sAzbW0dq7WYgKewc2u37vTXaWFazVisOCw5DjazER1dy726U52VtwNW2tkaG2aXlGSjcuzcb02KNYrJhZjqYk0NWWscq4oXAQrUE0eqHnAJ8Y+hdtaxVxlVB+uUX6jbSvMVhCKJQbCmg0MRGoRQR0XKI3sC07sCxnFneWp9L6SA0F9DSKgbHlQMTjLABqGpKGAtvjutQxocJkxYQhd+8VQPYl6EWOoPgbCVDqPTej87n2LpYzSNjbGE50h44mLg27twaAQo6-+h53S9Ewrtc8ZRxMFgdBUPuqnGM1uwGQc13UmSudZO5zzsNvNVpWeG3FAXGNYaBThgKqIc32oMM6B0+wWjVntVYqw7ofARSMEUFzyHsBRGXcG5GPn8uFbIcVoL1SQuoYq8+hJxjv22pWjUNwFRyhqotBUXaFgz27kLL0UozZk3+vg5SOgypJCplBH2AcdBVQACsFiJlgMxzSPGjNwUsEWCoO14u7X2AdRliAkJ4lQj03afdJmdHuUAl6paGN5YKxnFdGsStPe3uVsajHgv4DqQ0mrX2q0RcEybA9jtjoeKA54VhMns16D2JYPujoag3fRXdpD6nfMefrbVl9fmceA+fT9v7oXgaBbq20hr2G412rVeeFhJFk0tlOIWI7CB6gcP8H4M4g3jT3k+L9hk8B1jfHJVFlaR5RlPxqC8F0EUELVkCsUBC5QikFhIi8VKBBiBi5pxLvCdoQNdF8G6Y50mbiQcuWTHQtQsKWALKlIE4wQSQF192hAWq0kQ+NFUHa1YTT3ANFhE4WgwqqFSr8Z3kxXeNfFx7uslYLTxbOGq8KOh-cHRKH4exF27yo4pFSLT9VmRsg5FyXk-IwBu6EwUK81NiMWnpuaIZFv4sapImcP9eEyipSfD2GbpO-wEBj9T93CE0RWNpcYSs3WR0uDaP4Z0Zx6gmjo6NvvGoB+oaH5Oavxmel0MZw47oRzdpgcrA8SDR4YNdA9Ld4e7N-Y4ZB3mfy6EDjS5fnL9+p5azf1dq4MmvQlUCWqAkIlzCIpPGIqVBInGi-rjG-iwm4J-rLm-ArsMiTHiCbj4C0AWE2KAYIk-hAvlKInzDAYLJJPPDVArMDKvGgnpHvq-kRAcBtKYF4LWLtphKim0PFCTBOvUH4AQY-mPJJBPIVNAQLOHELPAqTvImvOglQfLDDMDLnDZAXPZDxhAIwQgQwjhKcIYPFvFIqo0EyvbjmrwRrsSG6PsEIX7CIc9GIbzCHOIhQc9IobISgvITLDIW+nvLgMrNofGsmvcEUneJ0Ltq4NFLuLbuZhygSPnvej4mAUQaIZAeIWQZIXAsoh4XQYohgmnL4WNJIOoYmFobHnrnjOYPcD4P0Oliwv2j1lmpdnaI6CnloJWI6LYWAsIiQVARkbPJIlDADrkcnIEQFFhN0DmjYDLq-PLh-MMoUN3D-EUsdH3EhF0eAcQa9H0c4eQVIZQTIcMbxl4UokMWVnIlKFZGoYXA5GUaPjXv5DUHiMNhoO6EYXUCqsJpiLoD-IquyoUGildAIsIeAqkb0ekbsZkYMZvEcUnAoYceceorgmMQ3HoO4C3D4CJnzk4uej3L-P3AAhsSkQ4WkU4dPHsVkWcc9kVp4fQacTCYib8kyMUXZKUSiXjEYDhC0E3jYN-ugaqj0sWMmuYPQpOvzvfgsgEtGmEuyS-HiCkmYDwpiMfk4gSHaKUPUa3AwpYAGnyv5rQdGiPpFhUXUP4A8MSC2FYLyR3HCl-Isd0LckTLUbqUGp9pakafAeYnUF4OeP-PaFUMmmcgsY6PiJZn3BoFkrlpjuyW-rUNoASJMgwkhHhvyWoBPmqiehiSruKWjqzBjnjtjjQbjjWjGRMW4EYC6rKrKoUJTK0IYFhAOonj0OUFGQWfqcWVju2YTvGDKeUe7ogRcCUPDv8dWY0TcK4uqXbscKaEUC4Heo8lRPmW5oWcoR2dgAaoUeTmyX2Q8cSKysaC0C6FUadClvFLoG6AzgdqsWYK2W5u9rIuoluSWTuSbHbqMgmZiPSimfMTcEUPcPbK7IMvTOFLWLeb5veT8sgk+eBYyVBd9vyKWdMY6omV+a4KmR7uYARr7qrqcMRHBhKYhg9pjqVtSZ9tBeuYGgDluR6dQkwXugaFYC2OwUYCYYgFbLFplh1nhgSKlHRBNlNkkK+HNotokMtrKTbI7P4K8PFOBmaJ8QgGTAitRg6CHhFPOTgAAKL4AQAD6aa0iylvHnj7Z+CuDuimDVjJmT6XjEgRmEj87BBAA */
  id: "BCMS",
  initial: "init",
  predictableActionArguments: true,
  context: {
    FSC_credentials: "",
    PSC_credentials: "",
    number_of_fire_truck_required: 0,
    number_of_police_vehicle_required: 0,
  },
  schema: {
    events: {} as
    | { type: "FSC_connection_request" }
    | { type: "PSC_connection_request" }
    | { type: "Crisis_details_exchange"}
    | { type: "Number_of_fire_truck_defined"}
    | { type: "Number_of_police_vehicle_defined"}
    // Terminer cette partie ...
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
      }
    },

    PSC_connected: {
      on: {
        FSC_connection_request: "Crisis_details_exchange"
      }
    },

    Crisis_details_exchange: {
      on: {
        state_fire_truck_number: {
          target: "Number_of_fire_truck_defined",
          actions: assign({
            number_of_fire_truck_required: (_, event) =>
              event.data.number_of_fire_truck_required,
          }),
        },
        state_police_vehicle_number: {
          target: "Number_of_police_vehicle_defined",
          actions: assign({
            number_of_police_vehicle_required: (_, event) =>
              event.data.number_of_police_vehicle_required,
          }),
        },
      },
    },

    Number_of_fire_truck_defined: {
      on: {
        state_police_vehicle_number: "Step_3_Coordination",
      },
    },

    Number_of_police_vehicle_defined: {
      on: {
        state_fire_truck_number: "Step_3_Coordination",
      },
    },

    Step_3_Coordination: {
      states: {
        Route_for_police_vehicles_development: {
          states: {
            Route_for_police_vehicles_to_be_proposed: {
              on: {
                route_for_police_vehicles: "Route_for_police_vehicles_fixed"
              }
            },

            Route_for_police_vehicles_fixed: {
              on: {
                FSC_agrees_about_police_vehicle_route: "Route_for_police_vehicles_approved",
                FSC_disagrees_about_police_vehicle_route: "Route_for_police_vehicles_to_be_proposed"
              }
            },

            Route_for_police_vehicles_approved: {}
          },

          initial: "Route_for_police_vehicles_to_be_proposed"
        },

        Route_for_fire_trucks_development: {
          states: {
            Route_for_fire_trucks_to_be_proposed: {
              on: {
                route_for_fire_trucks: "Route_for_fire_trucks_fixed"
              }
            },

            Route_for_fire_trucks_fixed: {
              on: {
                FSC_disagrees_about_fire_truck_route: "Route_for_fire_trucks_to_be_proposed",
                FSC_agrees_about_fire_truck_route: "Route_for_fire_trucks_approved"
              }
            },

            Route_for_fire_trucks_approved: {}
          },

          initial: "Route_for_fire_trucks_to_be_proposed"
        },

        Steps_33a1_33a2_Negotiation: {
          states: {
            Route_for_fire_trucks_development: {
              states: {
                Route_for_fire_trucks_to_be_proposed: {
                  on: {
                    route_for_fire_trucks: "Route_for_fire_trucks_fixed"
                  }
                },

                Route_for_fire_trucks_fixed: {
                  on: {
                    FSC_disagrees_about_fire_truck_route: "Route_for_fire_trucks_to_be_proposed",
                    FSC_agrees_about_fire_truck_route: [{
                      target: "Route_for_fire_trucks_approved",
                      cond: "BCMS.not_in_Route_for_police_vehicles_approved"
                    }, {
                      target: "#BCMS.Step_4_Dispatching",
                      cond: "BCMS.in_Route_for_police_vehicles_approved"
                    }]
                  }
                },

                Route_for_fire_trucks_approved: {
                  type: "final"
                }
              },

              initial: "Route_for_fire_trucks_to_be_proposed"
            },

            Route_for_police_vehicles_development: {
              states: {
                Route_for_police_vehicles_to_be_proposed: {
                  on: {
                    route_for_police_vehicles: "Route_for_police_vehicles_fixed"
                  }
                },

                Route_for_police_vehicles_fixed: {
                  on: {
                    FSC_disagrees_about_police_vehicle_route: "Route_for_police_vehicles_to_be_proposed",
                    FSC_agrees_about_police_vehicle_route: [{
                      target: "Route_for_police_vehicles_approved",
                      cond: "BCMS.not_in_Route_for_fire_trucks_approved"
                    }, {
                      target: "#BCMS.Step_4_Dispatching",
                      cond: "BCMS.in_Route_for_fire_trucks_approved"
                    }]
                  }
                },

                Route_for_police_vehicles_approved: {
                  type: "final"
                }
              },

              initial: "Route_for_police_vehicles_to_be_proposed"
            }
          },

          type: "parallel"
        }
      },

      type: "parallel"
    },

    Step_4_Dispatching: {
      on: {
        fire_truck_dispatched: {
          target: "Step_4_Dispatching",
          cond: "areEnoughFireTrucksDispatched",
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
          target: 'All_fire_trucks_dispatched',
        },
        enough_police_vehicles_dispatched: {
          target: 'Step_5_Arrival',
        },
      },
    },

    All_police_vehicles_dispatched: {
      on: {
        fire_truck_dispatched: {
          target: 'All_police_vehicles_dispatched',
        },
        enough_fire_trucks_dispatched: {
          target: 'Step_5_Arrival',
        },
      },
    },

    Step_5_Arrival: {
      type: 'parallel',
      states: {
        Fire_trucks_arrival: {
          initial: 'Fire_trucks_arriving',
          states: {
            Fire_trucks_arriving: {
              on: {
                enough_fire_trucks_arrived: [{
                  cond: "BCMS.no_more_dispatched_fire_trucks_and_not_in_All_police_vehicles_arrived",
                  target: 'All_fire_trucks_arrived',
                }, {
                  target: "#BCMS.Completion_of_objectives",
                  cond: "BCMS.no_more_dispatched_fire_trucks_and_in_All_police_vehicles_arrived"
                }],
              },
            },

            All_fire_trucks_arrived: {
              type: "final"
            }
          },
        },

        Police_vehicles_arrival: {
          initial: 'Police_vehicles_arriving',

          states: {
            Police_vehicles_arriving: {
              on: {
                enough_police_vehicles_arrived: [{
                  target: "#BCMS.Completion_of_objectives",
                  cond: "BCMS.no_more_dispatched_police_vehicles_and_in_All_fire_trucks_arrived"
                }, {
                  cond: "BCMS.no_more_dispatched_police_vehicles_and_not_in_All_fire_trucks_arrived",
                  target: 'All_police_vehicles_arrived',
                }]
              },
            },
            All_police_vehicles_arrived: {
              type: "final"
            },
          }
        }
      },
      on: {
        fire_truck_breakdown: {

        },
        police_vehicle_breakdown: {

        },
        fire_truck_blocked: 'Crisis_details_exchange',
        police_vehicle_blocked: 'Crisis_details_exchange',
        crisis_is_more_severe: 'Crisis_details_exchange',
        crisis_is_less_severe: [
          {
            target: 'Completion_of_objectives',
            actions: ['sendFireTruckRecalled', 'sendPoliceVehicleRecalled'],
          },
        ],
      },
    },

    Completion_of_objectives: {
      on: {
        close: 'End_of_crisis',
      },
    },

    End_of_crisis: {
      type: 'final',
    }
  },
});

export const instanceBCMS = interpret(bcmsStateMachine).onTransition((state) => {
  console.log(state.value)
});
instanceBCMS.start();