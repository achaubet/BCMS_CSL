import { createMachine, assign, interpret } from "xstate";

interface Context {
  FSC_credentials: String;
  PSC_credentials: String;
  number_of_fire_truck_required: Number;
  number_of_police_vehicle_required: Number;
  fire_trucks_dispatched: string[];
  police_vehicle_dispatched: string[];
  fire_trucks_arrived: string[];
  police_vehicle_arrived: string[];
}

const bcmsStateMachine = createMachine<Context>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCEDCBZAygOgJYDtcAXAYgDFNUB9AYwHt98wajcGqAnMARwFc4iAbQAMAXUSgADnVjE2+CSAAeiAIwA2AMzZhATj0AWAByaDus1s0AaEAE9E6gwHZsRjQCYnqk+-e7NmgC+gTZoWHiEpAAKlLQMTCzynDz8sEJiitKyrAyKKgga2nqGJmYWATb2CE7C6tiahaqaeu7qwgCswaEYOBTU9IzMRJAkMf3xQ0lcfAIi4kggWXK5C-ntTtrtuqrCmu1aTm4GqpUOzq4eXj5+AV0gYThjcYMsI33PCTn4yTNpc5kyZYKVaIdbtereAzCdwGdruIxOMynaq1CFaJotNqdEL3HrYVAcXCyWBUCBgIgAQ1wABsSWAlDQABYU-AwEhpCnDKgAM1wXCoRA4vBoAGsqPheABbABGYA4-wWSy+eTU-nBDTc2xaqic7mR7QM2n0+mENU8e3cQRxD3xhOJpPJVNpVHpTJZbI5XOk1NwNDAVAAbmBGb7qf6JTK5QqpIDlSCCmqIZqdrp3Dq9XZEAYzNgnLr1k51ppPDrsd1wgA5KWyjhUOjcnl8-2C4Vism8pgQdmUr10H1+wPB0Ph6tRjKK2PyFUIYtGbCp4Sw9RGda+BoGZEaIzCbCqEs60pGXT+O42quR2v1qje33+oMhmhhh0dkae-28-kt0Xi0fy8cx7Ip3jTRdR0XxCw0Qo9nUdpN2MHdPCMRx9mXNpVDLXFwkwYZJCoTQqFQOg6A4CACE5eQSAgBgwGwN9sBtbCwFw-DCOI0j8HIhho0WScVlAfJ4XcHcjGOYQEV8YwDHUTd2jcXNoREtwdXUHUrXLHBGOYgiiJIsivmwTSSQCClVDwzQKXcKgKzAKA6FYTj8GwAAlOheC5bliMbT8hVFEkySDak6EkSUwHwIhnNc9zPI-ZsfJFEkiDoKhZWvDggpkEY0rc99oqbAU4tgbilSA-i1F2Fwth2DZEQCSwZK2bBfDhTQ3HWRcmlPPFNLw7S2L0+QDJwozzNM4zLOs2z7P0lzsp5XLvNbPywACoKQrCiLZo82sYvyxbGyUN5YlI2AKSgLg4CoClpUirzYtbThIrAIreOBUqCnK7BKtNEDDU0OrMwKdo9AudQmqccx4T0TqsJwnrWN0jj9MMsyTJR8abLs3AHI2qLtryr94odFbgtC8KZtx27dt8-bDuoU7zpJK6bp2gmHuy57AL45Q1FBucRL3IwRKBpxHCMGSdVcY8UOERcAk8aGNNhlidPY7HkeM0bzPRyasemx65trG8B3vYcluJtayf1rbrz7W9BwfMMEqSlLJDSrJMqtzyjbvIdHzgDmgWnKqdxqZxSy8CCMyqZSXE8U1HD+3RQZhBXBqYuGVf6hg08kYbUbGqyMamgbyZyw3beN33HaJsBApJ9bS4Nm3+x9h2Lt5A6u3eY76bAC6mbc5u7ZNv22eGAO4ze4P5LDwsI-aPdNwj1wVMNdx2hQ9RC1T7rlb6xGBvVka0cLnXscb63vft02a7ri2cbLofK7bkkO9py6zr7xnrsHq+R6fLK49-w8U5q9bmBRdRzh1KaDougjxNGLEvde85sx5k8OoLeqgk471hgYKgAARIkkhORMgIFAEgLM4qkiISQxkkAJ4lXAU0XQuYjzbj+oWKEbgnDIktMIVQuZvAy1aKmAw8trRdVwQQmhRBSGshIKFVyUBGSUwJn5GRTJ6HAOKlzNYexXB+C0J4EWqYYK8L+u4T6gsTC7A3rCDCDEpGENgMQ2RIZ5F-yrv6Y6rjNEQAYbotQi8AZNUsc0I8+hixJy3jg9OeDnG+PceQxRvBlFP1bjfHxtCtHzAAoHeM7R9FGEMcWPM6hTGwRCTCFhy4ZZJ28OvPMDi8QAEFqTUlUQVahLjsldk8W3bpiSckAlAdOcwLhtxmiaN4DewSqiWh2NgLQUlfDHmOB1CR4Q2kdMoXtLJbiRgpLSf0zJGi6H+O0S9IOUc1DuFTts9J18-bqJ6Qcrsuzvz7L8QEsB+Q4E7n2CJexsJRIbhCVglw+Z9j+C8O1e57THn-wul885Cj8BKJUR8wmKLhkTlGfGYpm4miWLhPHVoK5CmIlibhdoVAWkcEJAGCk1JKLUVoj2Gijj060vpYy5lPyg5wnBIcUFQlQYQ2RLOXcUSQLryBsccR6kc5UB5Qy3ATKWVYuSlwCkIoqIAHd8ACvjFcRqNwtjNAha0ZEeYdCyX2BY8wKZqUqrpWqjVJATmj2lDqvVdBDXGqnrUYVNRNDmGcLqQ0YKqi2o6CuGEe5CwdFUAYF1qq+WavxlQ6UgVRS4ryZPJhUk5wb2XAvQsKkN5iwBgvHcqDoTRNQo4dQaa3UZs9RXDJ3rc0inzSA-JU9i2fUBeW-Y6FZL6gaiuNoYiG2gy8K23l6rmUkBoHaIkVAN2SmIv6WAy05RPUufiwdy5h1ltLJWidAMpICN2NuVS7U42LvdSutdRIN0bsdiSPdQYuCBqYVWz6tQ-C2LhEJHhAMAC0jgLg1C3iJQ4ug4S6GfRm7AZAs17QpC+6k6HMPU2w4yshaKMWdKw+6vtOjfmIGaNoESegtBITMP4WEkqt6uDDaaGEW9UyqBTah5duGoidqedXQjgnsDCZbqJ-u7riNHJUV6sTFGLm5P7YW-IARtB+EKXA2EC5DT6nhDoDBWCk4BDcH4VOhFJSSDDF8OsDY6DSgAFaTCDLAVdgU93-oEgEAR3HCk6gXIggG-nczZgNOvQ0NQU1OGCDidFZJ4ALAeCMgd4DIMgWRJB9CljFxRr3Cm2SppU4EGIOljTWYbkIHKSwlcCra0FbEand4AxPiQEq4w-IUJwRwKQm4cpIFoTIkcJCmoc8Wp7APKnJ47WhidbxRlnrqJ41-VrXuYslSY2ojjuDJjLUdPWfXUtSkNI6QMmZKyMAXXAkQNRAaDekSQIQWsDWqdOw4SFm3CuDQqdzw1kc2Rz5YAXwQFu9RhA6xNy1J0IN3YLUVKWhbZsnAAO5RA6U940HBBFsFu6w4CD0d4KNX8w0NMcDGkur3gjByEPpylqWaHIGCJji6DzJuGEUDTClvAs0Yw1Peq06RkNFGmsLKn0xnTpbVXauLiZ4uFniIIVE7UAEdUKlBZ7g6P5lDqPlU09ViLpiedxfayl3rTa807rU38rXVapN6fxhgpYreiuxLK-Z6rgoYiSXwLnbUQszSYbp0N1nRyR985a0l8XbOF9rdU2xfuu+pMH5NyxU7ZK-pXbpT3eDmXBOUQ7jd7CD3bOOcA3QuheoBpk0b3rwu-Xu8hdG8PqLjWJ8JoW5Lp7PGC1bfJ4dw3XvwPCZv3z-ju7TRbXg32NmFSwXttqHLa4WvC968b0b0q5v8NW-Z0j2bmPuse9W77zbpP5tU-x7P4nxmkgc9Bgn+pwv4EwnfS43oJoS-AYaCWYuPQScaYdyTeSsLe4eOcpuneRcx+ceI+WOZs9u9cRATub0LuCuperOKuMOzQSypgzQ7OfCoMguu+4BB+UBZ8luFM8Bt8Q+lsp+iKXimeLsbsGUT+VG04NQxezOZeWBleuo2gYaTq24ho7UqgxBmcB8++7ex8BcXesejk1+DBL8NBSBael8ImSKr8uAncKBRa2YOgfGxwPgOoIsSC4IESRhssoh4h+8as0hUeEuchMBChcBGhjBKh98ih1BFI9+aUj+uhfmhwpOgsbQDQDG0OfBMISyZQpmYky4qaIBcS0iryciUAARqoO4fG-gpgxiAs-g5i+wu4cc6EHQC8CI8W+uDyGegyvS6RCAxS4I6EvGKaYiJW0aiAyO4IssWghSgKVKlRCK1BOKbBVyBKskjUlaC+bQSEKkvC68liTQsI3CFm-Cweis3KbagmdRfGm4qYcO2wU2G8vgbCAmGqeG-ehM4mGqdRWwvC4MaI6yuoWCLRpxzK5x5+jMOG7xt+l0cmrI2xpobGkK-gW8LuxgvMrxuGGGFxnxaGVR+GlxKmAJhRFojWvMG8b2VQf0dQBof0K4YkK4x4JgkJkmbhyhVxzKNxugyIhoLCuJxguoIsUksIakmE6xNKmxZxUmw87hFJQmZJN8VxZCAJ3ucIc40I8cRhgsxgRgJJ3Jz8gpXxDy3hSJBeU+fGc4BmPRcaW8RmdQeYYke40WZgf2+uNmdm5ISQV4zmbmiQHm2xeYFUxQYkAQXgOwJwYWDQu4x4CkhgqYskCRSqAAovgBAEDm+sSHUZ4IUvOMuIWMeHxusB6ViX4CghEl4PsHPAloEEAA */
  id: "BCMS",
  initial: "init",
  predictableActionArguments: true,
  context: {
    FSC_credentials: "",
    PSC_credentials: "",
    number_of_fire_truck_required: 0,
    number_of_police_vehicle_required: 0,
    fire_trucks_dispatched: [],
    police_vehicle_dispatched: [],
    fire_trucks_arrived: [],
    police_vehicle_arrived: []
  },
  schema: {
    events: {} as
    | { type: "FSC_connection_request" }
    | { type: "PSC_connection_request" }
    | { type: "Crisis_details_exchange" }
    | { type: "Number_of_fire_truck_defined"; data: { number_of_fire_truck_required: number } }
    | { type: "Number_of_police_vehicle_defined"; data: { number_of_police_vehicle_required: number }}
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
      },
    },

    PSC_connected: {
      on: {
        FSC_connection_request: "Crisis_details_exchange",
      },
    },

    Crisis_details_exchange: {
      on: {
        state_fire_truck_number: {
          target: "Number_of_fire_truck_defined",
          actions: assign({
            number_of_fire_truck_required: (context, event) => {
              return event.number_of_fire_truck_required;
            },
          }),
        },
        state_police_vehicle_number: {
          target: "Number_of_police_vehicle_defined",
          actions: assign({
            number_of_police_vehicle_required: (context, event) => {
              return event.number_of_police_vehicle_required;
            }
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
      type: "parallel",
      states: {
        Steps_33a1_33a2_Negotiation: {
          type: "parallel",
          states: {
            Route_for_fire_trucks_development: {
              states: {
                Route_for_fire_trucks_to_be_proposed: {
                  on: {
                    route_for_fire_trucks: "Route_for_fire_trucks_fixed",
                  },
                },
                Route_for_fire_trucks_fixed: {
                  on: {
                    FSC_disagrees_about_fire_truck_route:
                      "Route_for_fire_trucks_to_be_proposed",
                    FSC_agrees_about_fire_truck_route: [
                      {
                        target: "Route_for_fire_trucks_approved",
                        cond: "BCMS.not_in_Route_for_police_vehicles_approved",
                      },
                    ],
                  },
                },
                Route_for_fire_trucks_approved: {
                  type: "final",
                },
              },
              initial: "Route_for_fire_trucks_to_be_proposed",
            },
            Route_for_police_vehicles_development: {
              states: {
                Route_for_police_vehicles_to_be_proposed: {
                  on: {
                    route_for_police_vehicles:
                      "Route_for_police_vehicles_fixed",
                  },
                },

                Route_for_police_vehicles_fixed: {
                  on: {
                    FSC_disagrees_about_police_vehicle_route:
                      "Route_for_police_vehicles_to_be_proposed",
                    FSC_agrees_about_police_vehicle_route: [
                      {
                        target: "Route_for_police_vehicles_approved",
                        cond: "BCMS.not_in_Route_for_fire_trucks_approved",
                      },
                    ],
                  },
                },

                Route_for_police_vehicles_approved: {
                  type: "final",
                },
              },

              initial: "Route_for_police_vehicles_to_be_proposed",
            },
          },
        },
      },
      onDone: {
        target: "Step_4_Dispatching",
      },
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
                    cond: "BCMS.no_more_dispatched_fire_trucks_and_not_in_All_police_vehicles_arrived",
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
                    cond: "BCMS.no_more_dispatched_police_vehicles_and_not_in_All_fire_trucks_arrived",
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
      on: {
        close: "End_of_crisis",
      },
    },

    End_of_crisis: {
      type: "final",
    },
  },
});

export const instanceBCMS = interpret(bcmsStateMachine).onTransition((state) => {
  console.log(state.value);
  // console.log("Actual NB of firetruck required: " + state.context.number_of_fire_truck_required);
});
instanceBCMS.start();