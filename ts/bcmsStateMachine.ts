import { createMachine, assign } from "xstate";

interface Context {
  FSC_credentials: String;
  PSC_credentials: String;
  number_of_fire_truck_required: Number;
  number_of_police_vehicle_required: Number;

}

const bcmsStateMachine = createMachine<Context>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCEDCBZAygOgJYDtcAXAYgDFNUB9AYwHt98wajcGqAnMARwFc4iAbQAMAXUSgADnVjE2+CSAAeiAIwA2AMzYAnHp0B2Q+oAc6gwFZhAJgA0IAJ6IDAFlXZNqnaqMXTF62EXAF9g+zQsPEJSAAVKWgYmFnlOHn5YITFFaVlWBkUVBA1tfUNjM0sbeycEIx1sEy9VTSCDA00LDtDwjBwKanpGZiJIEjiBxOGUrj4BEXEkEBy5fMXCi0sG1WsXCwsXExMAzU1q5zcPJt9-QJCwkAiccYShllH+l6S8-FTZjPnsjIVgo1ogNgZsH4dtZLAZ1DoTNZVGdanott4Wi42h0uvdHthUBxcLJYFQIGAiABDXAAG1JYCUNAAFpT8DASBlKSMqAAzXBcKhEDi8GgAayo+F4AFsAEZgDgAxbLb4FNR+FweHTCLRWZpmIIo2HYdTWbzQzw6FyW7oPXoEokkskU6l0qgM5ms9mc7nSGm4GhgKgANzATP9NMDktl8sVUiBKtBRXVmu1HWEevUBsciHU6nc5gsls0B3UnU8NvxADlpXKOFQ6DzefzA0KReLyXymBAOVSfXQ-QHg6Hw5GazGskr4-JVUmTBrLId055VCZhGYUTpNOpsKo-JagnpC9a8Xbq9G6w2qL7-YGQ2GaBGnZ3Rt7A3yBa2xRKxwqJ3HctOiZeO02DtC48LCDo6hYi4G7bMaUIwiYbQuC4wiaBWdoAEp0LwPo0qyTohjSdCSFKYD4KQHC4dyPJ0HW74tsKYqwLGSxTqsoCFKhuhaKujQmFuJo2LB2ZFAc9QGMIBjbJoWorsYmGRDheGBpIBE-OSxGkeRlEkNRqm8vRV79jeQ73hGrF-uxAGccoiCaAY1gIXmOiFmYu7CBYKLNHJ2DCNJRxOZoJibpuSk4Cp+GEVpYAkWRFGkPgdBUFK9GBgZ3IRjymQLP+wIzhY8EIr4ezgYWW4+T49RIl40kIrupoYSeyk0W+xmMYKzGiqSfJKO88SUlAXBwFQlIyjRTYft1nBtWxyqAVxiBzvO6HWMWK4BcWJg+Vi9QWIizR5q4phQRF2BRe1DHNl1ba9bg-Xdh8Q0jaS42TZ1n7iplYCCKoeU2QViZwiY2C7J4mZahsB3ImJGhYv5iKBNJJpIrm52XUZ13TXdTaPeQ8QQMSL1gKN714VNTFtrNqnzRxIJLbUBig+DGiQV5C6wzUu6HJCh1rnm1jwnOGNtVjJkDrew4PqNfUDdQJNkxNFPXoOd4jjTIx07ZDP2QggmSSuRxBDYpZOT5ckWA0UFaqWdWGBYouGXRdaq1LFmyw98tjcNpNvcrRAS2Z6sy5rv3-YCOszitoFrRtq7oQcPmdMIiOBMha4dNY1gmE7tHGW75kjvd+MfETsCK-7k2FyHj4-drQOM40zlSZo61yauWrrnDSL7UjHRaFtyF51dlO3SxY2SJI1Eht2ADu1KBzX0uWQ3CaM1uqemnmq7FoElhc2ohzbtJtWmIuIV3D0rXOwXplqyvZNTzPowAOqL2PX1FzLVkAwtdmFFUGhCE6ZvCoWaHCQwO04a7CtjnNu8IpKLlMCPcWn1uqklivFXSgciApTlFeaiORRiVjAHPMOaCbpfV-pHRuesjrblzOYXcckbBAJ8quDUAUAobCCNnNhqCXZBwfh7TBYBtIJUooKfBakiEyBIWQihQjl6iLXotPWC5jRMM3DJNwKEqrWCticYxfgTR7HMOdTAIxJBUBcFQAAIsSSQXJmQECgCQdB1Ny7OKIMySAaiAGIHWl5XQ7lkIuBOEhC2uZ-KOS1OtCoucWo4CsWAGxdjHGwB8a4tkJAKK4SgEyT+GCyROJcUyfx1l-660AYcDUbkYTFixEcTwydNiqCASWU0pp9jqEsdY2xDiym+LDLklRGtvHlMqX-emM51oyR3B06SBxOhuV2D5QxEJhb7B4czZo-S0mDMydk0Z7j8m8EKcI92xdSlZKmRAAJNSj67H8qsnwQt6qoV2h0bASEhZljMBY5J2AACCNIaTFNxpMkZoxxmh2hX4h5VTZmJk8NqFyewpIROxd8jU0EgjQWQt0vw50wUQs8RPBFFTuznMuXCyytyTnTNoeveh0F3AHS3DCAI8yDC7Skr8o4ZVCzZyhqS8FVzv4MqpaMCl7ZhmIseTOTwflUJ7D0K4DY3g+Vw0ghCA62diwdCkutcVEL6WjRlTS5KFyilyswQq6lSrExoX8twgKehEQhU6KJGoPF3XpiAWuVCXkDk2IsFQEFHAiRBkpDSDxVCZoyi4JSUUEA6Bz3wM6xmqgtrGhWcBLlzQ7Bwzbv5ZGoqTjYq0GGqgEao0xrjSQC1VBk1gFTemzN2a9YlTBqaPZOwipmhRI0SEyN0xoRcIY0KOha31ujbgWN8a5WtpImKZlk4o6JkEqDf5bcwIBUaSiO2fNAgdObqFR2wLUnhsjQupdzb77XNDjKNdooN35VZYAyC24TUNWEro6BNQjQNXaIYqG3q513sbfGmgDpiRUAQ2lAUsBxHyl+sirdOac7bitGuFcO8kSnDEsmbOdVDXZ0ElBhti6m1weJAhhDllSSoZDFwbtgDfLGh0IEKCclc1CRRI5CEiIsSip2FBJE1H71xuwGQRNuNKQyZpHJhTE8lMxrcQmnGX4NOLo-YDL9Dl0KhM8LsYoIU9BCaFmO9M60tRYiKtJmD2AYhPqlWTZTrn3O1085psZPnH5jXvQZ6pyqThg0clabYnd0LoRRCWWzLCp3+AQedVAdApTqQpCkS8dAZQACspghlgCQB88iONqgRLoVMuwILepRFYbQQltRDpkkO0I9xkrkngIsR4LL1GFAALSORRENiJYNShbjcj4bU6NgUEGIANwJCAp2GgOL8joc4ETt0Eqoc6HxBhfEgMtp5q21w7gk6uPYXhPA6uAxcRo2q3I3G1OdZ4R3hgnc3XQ7iF3Si5kLHmPMh99YBUuDx9Mer4R5nS-BsRVJaT0kZCyNkYBTszl8lbA4ESTQHGZoY493gIe3eLDNvpwKzy1nrI2FdHYCDfc-YNo+QRfmlkLHCIqbRvJiWZqnIVuYjimlCkcc6VP5Q08lb5p8DOIAY6AoJCErCtBTsOBiUHph6k2D2HOIIomKfX0imLdSMU0PYMSvLxmPETid3+WhNu5UfJrmctvduQQ3CK8ER1NTPU8aM8M8zhATWGimGKGVIwIVk4tFPemaCWgVxe9doF0Rfu5c-aM0HzMHhKjbUEltUHQDTSno6eBWBQDE+QvU8-Ogs9Lf0MCC79CGYQoyQ0D5aC+qkYBThGR+bhuLpi2Ucnm5lJq+1-T4Ho6GoDZTpaB0LE921Qrn8laB2wDd4GAr-aoicUdKJWka22RpF5Fp6ZytjpXhTPAT8IcQIxHuYHXqM73NHkhYIivraG++ck+Sw82IiROCB+BC08x+qGp+Ae5+0kEI60TQ6EcknO6gVU0ergt+gkFUWctaGSjqbidegCPKm2AscBMIOwvqagTSYMrga4hwwE0kV6-eZKlevuVquBQShiVsnQu4lQpsc4u0WoO4k6nBjQC4dBn+OADBFqDqdyMK4BYWiY2c4EO4O2bgJwuYQQPO3MuaEIKBxsEM+6zmtGNILBRQBeRUtmAsKWbQhwIh+IN6da0GBhqmOmvuemS6RhhYKI9m5aAUzcJoEeew+hS6jhVM6mXm8mThb096OBE+kBi+CA+6Xhu4PGQCPGpq16Ay86LmYRwRzhXmDB2+Lh-ushjM8IGoFUBOoqVB1mICZ6IqyRhqARsmbmv+vmERMGbhOgQmaINgS44EyEFQ1gDRKmTRwcj8rRDhwxIiI+kRbIRhmhCWyECRPqQsLSQsgx3mzRoxwWLm4hw+P8Wx+mMhKKjMbQ9QzC4Sbgua8C8x1R6YSxqWqxwKGWWWEY3wku+WRWyQJWsxxq2eq+twBw2wiBJGJmgKrWwEu4Xg50AAovgBAJLvRiSLMVJKnGBFaIcGTiaEBmCDYMaGzGifMm5FRp1kAA */
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
    | { type: "PSC_connection_request" },
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
        state_police_vehicle_number: "Route_plan_development",
      },
    },
    Number_of_police_vehicle_defined: {
      on: {
        state_fire_truck_number: "Route_plan_development",
      },
    },
    Route_plan_development: {
      on: {
        route_for_fire_trucks: "Route_for_fire_trucks_fixed",
        route_for_police_vehicles:"Route_for_police_vehicles_fixed",
        no_more_route_left: "Step_4_Dispatching",
      },
    },
    Route_for_fire_trucks_fixed: {
      on: {
        FSC_agrees_about_fire_truck_route: [
          {
            cond: "isRouteForPoliceVehiclesApproved",
            target: "Step_4_Dispatching",
          },
          {
            target: "Route_for_fire_trucks_approved",
          },
        ],
        FSC_disagrees_about_fire_truck_route:
          "Route_for_fire_trucks_development_to_be_proposed",
      },
    },
    Route_for_police_vehicles_fixed: {
      on: {
        FSC_agrees_about_police_vehicle_route: [
          {
            target: "Step_4_Dispatching",
            cond: "isRouteForFireTrucksApproved",
          },
          {
            target: "Route_for_police_vehicles_approved",
          },
        ],
        FSC_disagrees_about_police_vehicle_route:
          "Route_for_police_vehicles_development_to_be_proposed",
      }
    },
    Route_for_fire_trucks_approved: {
      on : {
        wait_police_vehicles : "Route_for_police_vehicles_fixed"
      }
    },
    Route_for_police_vehicles_approved: {
      on: {
        Wait_fire_truck_vehicles: {
          target: "Route_for_fire_trucks_fixed"
        }
      }
    },
    Route_for_fire_trucks_development_to_be_proposed: {
      on: {
        New_route_for_fire_trucks : "Route_for_fire_trucks_fixed",
      },
    },
    Route_for_police_vehicles_development_to_be_proposed: {
      on: {
        New_route_for_police_vehicles: {
          target: "Route_for_police_vehicles_fixed",
        },
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
                fire_truck_arrived: [
                  {
                    cond: 'areEnoughFireTrucksArrived',
                    target: 'All_fire_trucks_arrived',
                  },
                ],
              },
            },
            All_fire_trucks_arrived: {},
          },
        },
        Police_vehicles_arrival: {
          initial: 'Police_vehicles_arriving',
          states: {
            Police_vehicles_arriving: {
              on: {
                police_vehicle_arrived: [
                  {
                    cond: 'areEnoughPoliceVehiclesArrived',
                    target: 'All_police_vehicles_arrived',
                  },
                ],
              },
            },
            All_police_vehicles_arrived: {},
          },
        },
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
    },
  },
});


export default bcmsStateMachine;