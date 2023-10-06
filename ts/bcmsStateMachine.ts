import { createMachine, assign, interpret } from "xstate";
import { raise } from "xstate/lib/actions";

interface Context {
  FSC_credentials: String;
  PSC_credentials: String;
  number_of_fire_truck_required: Number;
  number_of_police_vehicle_required: Number;
  route_police_vehicle_proposal: String;
  route_fire_truck_proposal: String;
  fire_trucks_dispatched: number;
  police_vehicle_dispatched: number;
  fire_trucks_arrived: number;
  police_vehicle_arrived: number;
}

const bcmsStateMachine = createMachine<Context>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCEDCBZAygOgJYDtcAXAYgDFNUB9AYwHt98wajcGqAnMARwFc4iAbQAMAXUSgADnVjE2+CSAAeiAIwAmAMzYA7AFZ1e1Zp0A2Tap2W9AGhABPRAA5hq7ABYAnHs+nVe-ScAzwBfELs0LDxCUgAFSloGJhZ5Th5+WCExRWlZVgZFFQRjT2w9J1NPbxdhdxcAu0cETx1hbHUnExdVJ38jTTCIjBwKanpGZiJIEnixpMnUrj4BEXEkEFy5AvWinU11bEr3K3d3C39VU0bnVw9vX39A8sGQSJxZxImWadHP5Pz8GllplVjkZFsFDtEDpWmUnOphMJ4adKk53NdmrCOl1XL09EZ3C83thUBxcLJYFQIGAiABDXAAG0pYCUNAAFrT8DASJlaVMqAAzXBcKhEDi8GgAayo+F4AFsAEZgDig9abAGFRDqdzCHTtYQGTRo9Ta1SXDGmPRtcq6zyXHQdIKE8KvYYkskUqk0+lMqgs9mc7m8-nSBm4GhgKgANzAbPDDMjssVytVUnBGqhCC0pgOiL0+18OjOtXRDkQ7iMcINe08WlUviJboAcvKlRwqHQBYLhZGxRLpdShUwIDy6SG6GGI9HY-HE62U9k1en5JqEABaIvtHMOu2BTyaY4Ynp7MomdQaeEuE2mRtRFvJ9udqih8ORmNxmgJr1D6bByNCkU+ylGV5xVRc0zyFdMzPbBhBNfRLkuTRND0S0jzqNp1B0CoK1MUwKlcPRbxwTApkkKhNCoVA6DoDgIAIPl5BICAGDAbA-2wYlSLAcjKOo2j6PwRiGFTDZl22UAig6BFsDRVQkQdbU0SuMtinKNxWg6OozTMSwBhdLiyIoqiaLohiAWwbjJEpZDaVUCjNFpdQqCbMAoDoVhhPwbAACU6F4fkBVo7tAPFKVKWpGMGToSQ5TAfAiF8-zAuCgDezCyVKSIOgqCVZ8OBimRpgKgL-1SntRQy2BRPVKDJLUYQTDKO1dRMM5NHMTQj3xUoTUNPFWncYxiMsoy+NMwSvNGnibMc+zbOc1z3M8iy-NKwVytC-sIrAKKYrihKkvWoL2zSyrtu7JQfgSejYFpKAuDgKhaQVZKQvS-tOGSsAavEyF6uKRq9R8eS9iLZDOu64RSl6HNDB0Tx3A6aGRqs4z+LMoSLKs2a7IcpyXLcjzcCmtaUtOiqgMyr09ti+LErJsqKa28LLuu6h7seykXres6qa+0rfsgiTlDUHMnFkobHQrXVTDqbrLFkqpUNMRF2qw1GxpMgTzPkabrPx+bHMWomVr1xmNvbF8p3fWcdtpg6Ge+y3nwnV9pw-BMspyvLJAK3Jiudk7XcnN8Z0-OAhYhVd5N6MoDEqVCrHUFoj33bRVbljpUPUS0dE1nj0Ym3WGH13GjYJpbidJoPgutsPPaeyKwGiunDot4P649u22ZHX5bs5sAnp5gKQ-d22I4FqYo4zAHY9MbAWjwtEHVBo94QXg8NGMfFz0MAveO1zGppxw38ZN5aSdW2urbdm3w69mmW-2+mjvJsf78bykhSuvuEkH4er1R5dwnl+Eq09wJiWFv9UWxQizuA8EjUwexjBogMOvA8HhtT4hMDmSw+cDJujRu4KgAARckkg+TsgIFAEgfMMpUgoVQtkkAZ51VgWueSBxtKtFXqcdweEVJNG1PhWC+ZBFOCdH4G8hCojELIUwog1CuQkHiv5KAbJ3rnVZrdShSiWEQDYSLIodRtCaBaHsCoKcNAIlsKpbUXhsBnktEYIw8JdQHyoCQ8hsA9HKNoSAh+kZdHMNYZA2qxjEBri3rJXUSIjSaGhoWIRWotKyQMLWAR2JaieO8Yo-xqj8DqM0YEr+jDfGhMMeEv6q5kJtHkkidOZp-B4QxPBbQPQdR1BQT4fSQwogAEEGQMi0VTCK+SDEkFKbOcpfiDFGJgUUO0bg5atERvsRElour2KTk41o8kBGdA6rnEaQyRn0IuiE-R0w1G8A0R-BuPcrnsjCWsCC0dMwaCPOoU5wyHndwjuMip1yRwXOAs8+Z1ToEx2hhLWF+5XB+APOUNp-hSj6DMAIuCudElEVkTgM5-zQFNwmTcopdzNFguphC15YJoWZgRAvBCRZeinBhJnI8F5F61DMFUII+EnAEP6SRIyegqADI4GSKMtIGTMVYuxMcbFDKFzFRKqVMqFkxwMHoXQclaiMpTkjDE+wJbGBTmefEtQNBCtdHI0V4rJW4GlbKqluUuC0klCxAA7vgTVmYrASxNPuXprgWi5wxDCMR-LjmI3kqEfF+sqCqsdc6qZd9HmTwVO6z1dAfV+rnsIS0uhWjmLZQ6M4pYmiRoNEEU0WErQEk8cm9VLrKYMIVNFKUtKlz0rnvhNwng1bnh5SadQGIDBwoRAjA8JhPBOibQ6ltabQ4Aq-B2ugXaqlvKgR8vtDpZKqzOLWJemyLQGjET4K0MIYQHmdMKxNzanUypIDQD05IqDvrlLRSMsBdrKh+lC3dsD7QLwrENFCCJXAVgxEjBBgqXCDtxX4KofTbUipVYup9srX3knfe+r2lJf0xi4Pm4D+IJZWhzIh3eU6MRrjlrJSwhbsLHCcN4FOC61VYewGQNtF1aQpplTxvjrMBNSpoYU4poyqrPRTd295s9YGJO0GiaG5gcIoeg6pDqepOiDvLcg2sZo71oYfZh512BYjptXcPQTDJLPWeJdzFNEnbn3OmYC2TUr5M7sU0UZC2gU75jnRWWstRtlNAnbBPC9ZfDIV6BxhN1E5SSATACDsXY6AKgAFYLBjLAF90Vf2kakshNwIj8yWDC-sY1FhdCnD0EjRrJgoMEJdEU6k8B1hvDpUBoo0S2OxNaJ0ToSTkEpPXP4A4FgrDQ3rJUFrqHiQEGIL1vzUS-AXoRvWXCaCx2qTYwvWsAQsLanPHaJwI1fjjH+JANb7CTFmDKHmcxB5dReA6hibodwfB+ACOUYII0Pg3cmHdntfXED4h1bHQtwQrRnYxC0TCnRsK4j6MNJLb6dp0kZMyVkHIuRgHu5ErMGgF6InexB3EaFVLlCO4k440kWiXBGveNsGXpOfUHAQMHCmHtROM7oX7+YzsuH0BNy4tZdAmACNhFCvSZH3rZ8qDnHmvzc+HMTxZAuAjYHrP4Y45jC1ml8OhFw7RsJyxVgRfwnjxo6yxuwiJ2uED4gXsg2oVpBVDQsd844TjLi538BYFHPyE1o3t8fbGZFy7n0JpfLyWvVyHsOINL3RZ6wwiPMhODgf9DmvC-G+9Eej6TWjzNM+C14-V2vsdTaH0dF-tbo7JPmZLQHA9zLb3medDoRNAH8Wg7GuGANHb0vJdvKn1shXC+NfzY30543h2r8O71+0dTbKuVIx+0Kr+iAreAatDaJ39PPus+qQuDqlCOpXFQ4CKoMfGMy96yn3NOPVczal1X8zBv1Km8v3bgXypW-lwF-gP2AxMD1ARlQhRB0m8AVl00awND6ChysEf2Lkd1Llfzxirw-yvnnzrx-3X3tmfjbidkIMX2plpEkB3xjH33B3WyzFOycVal1ARDtBQgVnd1qDGz3nQIdxPhj0r2Nmr0-28m-yJSCRIOb3pnAKKGXkXlgx6DghQkuErTUEsUlmtX7XYOOH4KjxfyEOn3f1NnwK-wXzVybn-zILfiZkkLKU319n9iKnoL5xJysCOyUKvFULlgwTcEFTtCqEajRDnRtWVUPifwnzLmEMrlMJrgoMsOkIAPIPfkSN7jkLUCxXaCOSdFm0RicAwQQVnVi2CK8EFX0OfywKMLf1wLiNr1SMcykKfhkMAISMaLKWoNoN51835yzFLTKFjiwixS0nUOKCOT1xTm1FmyGiGjxWLyMjyWBX8QyOKEHT13rBzywmTjYwiy1BQgXmtUIgNDcRhF+XORE2pVJVcJ6JJxR0YzcXKDCytFGIcVKGcXxAuHcTCLdEJTSJpWuOd1XGGz1xaBwh0n8DglRVhBhGOFC0FQRCCE4zsxWLNDTjcGa16EuCRGCwf3D3tS4ws14xZioORIYN6J8DaQRlgjOBZQPH5URm+LtQwwJKEyJN-2cxbWE2JI5KdRoRRN1GNWQV0H3HGwMDqHFiRM5LZOIK8240JWANlLoP5NQicTFI0BziCHzEFIXma3wi9yCD5SWyIXxLswcxXSc0VJlRWIpNUiPQtwUg+NgO1ElO4ys3NKaLE1dPaJ7k9KjD5LJJJzXlpw6FginTlh6EkTqEuzxOZNNLdPHg9NNN+O9M819O6MBM+TNAljCwERQhrWQXHVzmLSRBsUay8BZySzoBSzS1SCfCy1yxSHyxROvWe0HXiRMDNFcFqzcBKORkRmOzRBGgAFF8AIAOccMKQVj61tBfBBUfBll79jUU5FC2Nmck4AgwgwggA */
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
    police_vehicle_arrived: 0
  },
  schema: {
    events: {} as
    | { type: "FSC_connection_request" }
    | { type: "PSC_connection_request" }
    | { type: "Crisis_details_exchange" }
    | { type: "Number_of_fire_truck_defined"; data: { number_of_fire_truck_required: number } }
    | { type: "Number_of_police_vehicle_defined"; data: { number_of_police_vehicle_required: number }}
    | { type: "Route_for_fire_trucks_fixed"; data: { route_fire_truck_proposal: String }}
    | { type: "Route_for_police_vehicle_fixed"; data: { route_police_vehicle_proposal: String }}
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

  },
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


