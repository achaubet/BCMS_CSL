import { createMachine, assign } from "xstate";

interface Context {
  FSC_credentials: String;
  PSC_credentials: String;
  number_of_fire_truck_required: Number;
  number_of_police_vehicle_required: Number;
}

const bcmsStateMachine = createMachine<Context>({
  /** @xstate-layout N4IgpgJg5mDOIC5QCEDCBZAygOgJYDtcAXAYgDFNUB9AYwHt98wajcGqAnMARwFc4iAbQAMAXUSgADnVjE2+CSAAeiAIwA2AMzZhATj2rhAFnUBWVUdW6ATABoQAT0QB2Vc+xHdX9euumAHEbWmqYAvqH2aFh4hKQACpS0DEws8pw8-LBCYorSsqwMiioIGtp6BsZmFlZ2ji7Optheuv4tmhZGnurhkRg4FNT0jMxEkCQJg8kjaVx8AiLiSCB5coVLxabO2qb6uq7qzkaah872Tgiu7p7evgFBIT0gUTgTScMsYwNvKQX46XNZBa5GSrBTrRCbRrtfzWDT+BrNM71RrNVr+dqdLqPZ7YVAcXCyWBUCBgIgAQ1wABsiWAlDQABZk-AwEhZMmjKgAM1wXCoRA4vBoAGsqPheABbABGYA4QKWK1+RTUpgC2FcO2sR1UIWEzlq53Uup0DS2qmswk07WcumxfVx+MJxNJFOpVFpDKZLLZHOklNwNDAVAAbmB6f7KYGxVKZXKpCDFeCSir-GrVBqtTq9UiEOZrE1NLpNLrjjY-LbogA5CXSjhUOicrk8wP8wUikncpgQVnkn10P0B4Oh8OR6sxnLy+PyJU5-VqXxGNWeIzOZxmXSmaya8s4KvR2v1qi+-2BkNhmgRp0dsbewPc3kt4Wi0ey8dx-JTxO+bNphrYTRGYxtR1IwN00bdsAAJToXgfUpJknRDSk6EkcUwHwUgOGgjlOToWs72bAVhVgWNlknNZQA2Q01WsPVdHUPZNENGFv2seFsFaQ49msfQC38cCoJgwNJDgv4SUQ5DUPQkhMMErlcMPPtj0HM8I2I19SPfcjlAhZxhGo2j6K2JjZxKXx3DNEDdCMdEfE6MIIieO0BNg+CxLAJCULQ0h8DoKhxVwwMZI5CNOWyRY31BadNj0vUDIY4zv0sdw9XUeFjk3LxN34rDb3k-C+UIoUiW5JRPkSMkoC4OAqDJSUsMbe9Cs4HKSIVD8KLUC1tFS1R-F1Yx-3o0wWL2bAN01I4QOsHx-Hs3pomc3K8KbArW2K3BSq7L4Kqqolavq-KHxFIKwEEVRwo0yLE0MS1sB6vrdMmoaWOs7BVCA60LBCFpugcnFFrk5bGrWxtNvIRIIAJHawGq-aYIagjW2awTWrIsEOpKYRgju-xev6p712-XrdDu7UlxXPrTBA7LZJw2sjwHU9h3WsHtsqmG9rq+GGZPIdz0Clr1LarTinevR2L2fQ+vUTpdDcb8Ancf9dQadEbAxGnsPknnlOZ0GyuoaHYa5ogFP7XmVIFlHzuBTT0e0zGvAl61hGl2X5bqJNjnzNMVfUNxNECTWlrNpSmf5lmDeJKH2eN+qdfDi8TtRu3pzFkmOKl4QZc8D3zlKdRFzogD1WOPVwMwUZJCoIwqAAEQJSR2QZAgoBIQ6msh2Am6IBlIBTq6MZowx8xXLZ118f3hs97UDjuzcNDMmFx4rqua-rxvm7DZkSDQ6CoHpBHVqI6Pu63-uhbRqKTNhTodAOKpTHadoyz+u1K7Aava4bs-e+3tuE58wvF3HufcIADwTEPVK2gLDWhsKYGW49vzQmwLCdowgrD0XNIHVen914-1Af-XePleAH1DozIB1UQHn3AZfVOn4b4WlUG9RWwhTBY0xM4cCABBSklIj5HSJNQv+YxAGW1PoQi+F1hb22KJ0bQew9SBCLDRFcmhszmhsG9bUGVYReFmkYHhfCBGFSEZvERXY96kMPmIvWwiwEQPag7M0LEjH8NsRHCRND24rSOl4ixjiRaIGXIXLY-h-ZaALMYHY35JaoMAn1GErRXY2jftEXh7jFIUMtmY3+YDiH70Ph3EG9j6RSNtoPZxJkzS4OrqYKg3COD4iDGSSkPjgaPklFwMkQoIB0AAO74ECbItQaZmGdH8OiNhrhCywg0SYDwVMppFnGpYWpVB6mNOaa0kgHiLxdLAD0vpgzhlp21I0YI4TXBdWEEw2J7homBzgVPII6zNlNNwC0tpxTOlIWFOUic9CMaGDlk0KmAR6JFg0NmBByV1wmBaL1A4Gg3kNI+V83ZWSLbDioJKP5QoAURUgc4gwYKQLhMLBg9Q2ZfBlE3Iceiy4NBplRVsz5OyaAOgJFQbl-leSwDACGLgpzrqkvhRCyl0LPa5jGj1II6IrDsMMWknAH86lou2W0zlBJuXctUkSAVQrTp0MqaLMV4KKVQupZ7XGqCaLTQLEWLQ2cuEquwGqjZGr2WUmwGQXxpiarotab6-1IMyTotbu0xGj5w3NMJZdYlciME6BAvIrGxwNyHA0f7VBgcrJU21HLZwfE3UeveZq7AcQsW608bG71lbq2J1hhGneezAx1pDLQ6RV9ExHD0tcdcAds6bBMpYEmNhdTol4laFU4FUB0HFMJUkaQDx0ElAAK2mCGWAJBzwyGNd2oFziEGF16r1aa01aUNCJoXHY5RzBLnhC0cIDkfIkngEsZ4FTE2IAALSMWzL+38i96LwjNDdOW4ECDEG-U4uRJlVwkyfmPToX1tQlvmv0RIQwfiQFg0EhAAEUSTNSicdUgRrXnEuIskCCDggYPCcqzDlbsNTA+BAfDIzCPZ3YuNQI2dPCU2nlR384qAIvxqKk5jeIdVCOdFSGkdJGTMjAJxtOmhuJNCOBNG66IVQ0s3E0FcrFdKGkhXNRylZnx1gbD8tsYArwccBaatQ1olZaHRGosw01dAGZJo6wduojj+2sOBXcNYbPkOxfzS8BA8POZ-SUKZHg1wFishplowmIQhFQZCe17DppBzdQDYSrlBXuQkl5NTiYNPaAaLctMvhJZAW-P7K4T8WiFipoi36zGAZ0xMSDEq8WiVwfqHmLQMs2EKr1K7FibFZq9RLNc6bwdAZRZrapfWTnRsEdxo0MJoG+qARaK1mixoeKgWOBYULxWcrrbs3tSQkhMKduq8Ckwp7GKBzcJsTofgXophdXLeBrgnVrYG22p7L26BvYS2N0y65SYFhAg196XgFbexI34DQwXCwQ7yqGk+bkPKSVNkQXy0pDyYTyCNhNCPZ7aBI-+CwhYzBZZKMTWV1oQi-YsqoAn9NG2ULk+JTy6E+SU6EjT-dO36cEYsOieJy5dIaCMhp1rjE1TGFdu9CyJgMOWdVWvb+5iW7Mne849EKYtgZYeoHLUiVDNMMmiETYtk3GDeJ2bspcuZHThZ3+bimxdLFm4r5z2t9b2bm4iEbibCn6e6h-4sBlvigO48NCOPE6giqA0V1ZHmpzDLak0b91a9y3erT51FM5pUc7HeoaII2ZwnsUNBp25iCaLolZUGn1fqOlFUDZq6vSZC51-YQ3jQxhqmHB0D51Rfg6+v2Y2Wr1XyQ2D72n3zf0ah8dtbqPuvyvJ9y2n83yPOarAhBv7NVK2detl7X2yjfA+9-b4rRkr3+-0V0-94mF2DwEjayZcbOYwIwbNZha-J+J+O-aWR-HEZ-HfKtc2TbZtEfeHBXBBE-NhM-JvEyS0PMXSeEMwXSOiYwXvCtFAsOEXYfetag7JPWA-C3TArjY-CfXAxvGfbMMddiBoY4S0UPPqJjJ-CvdfYNBg6LLbDtYNL-ZPDtP-HtDGeERocaBoEwOycTHgqwPg5DQQ25YQudBdJdX4SLNdTdVIbdUfHRBca0KmHOEHEzG9MaECAsKmYwYtVocCAAUXwAgEi21UJGsJ8ELmAPMD+08CzRnjTFQXhXbzlgtCxnsnCCAA */
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
        route_for_police_vehicles: "Route_for_police_vehicles_fixed",
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
            cond: "isRouteForFireTrucksApproved",
            target: "Step_4_Dispatching",
          },
          {
            target: "Route_for_police_vehicles_approved",
          },
        ],
        FSC_disagrees_about_police_vehicle_route:
          "Route_for_police_vehicles_development_to_be_proposed",
      },
    },
    Route_for_fire_trucks_approved: {},
    Route_for_police_vehicles_approved: {},
    Route_for_fire_trucks_development_to_be_proposed: {},
    Route_for_police_vehicles_development_to_be_proposed: {},
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