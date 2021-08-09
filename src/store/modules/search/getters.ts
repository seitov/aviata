import { GetterTree } from "vuex";
import {
  FilterModel,
  FilterOptionsEnum,
  State,
} from "@/store/modules/search/state";
import {
  AirlinesModel,
  FlightsModel,
  ServicesEnum,
} from "@/api/search.service";

export type Getters = {
  airlines(state: State): AirlinesModel;
  foundFlightsCount(state: State): number;
  flightsByFiltering(state: State): FlightsModel[];
};

export const searchGetters: GetterTree<State, State> & Getters = {
  airlines: (state) => state.airlines,
  foundFlightsCount: (state: State): number => {
    if (state.flights === null) return 0;
    return state.flights.length;
  },
  flightsByFiltering: (state) => {
    let flights: FlightsModel[] = state.flights;
    const filter: FilterModel = state.filter;

    if (!flights) return flights;

    if (filter.airlines && filter.airlines.length) {
      flights = filterByAirlines(flights, filter.airlines);
    } else {
      return [];
    }

    if (filter.options && filter.options.length) {
      flights = filterByTariffOptions(flights, filter.options);
    }
    return flights;
  },
};

const filterByAirlines = (
  flights: FlightsModel[],
  airlines: string[]
): FlightsModel[] => {
  return flights.filter((flight) => {
    if (airlines.includes(flight.validating_carrier)) {
      return flight;
    }
  });
};

const filterByTariffOptions = (
  flights: FlightsModel[],
  options: FilterOptionsEnum[]
): FlightsModel[] => {
  return flights.filter((flight) => {
    let isFiltering = true;
    for (const option of options) {
      const conditions = {
        [FilterOptionsEnum.ONLY_REFUNDABLE]: isFiltering && flight.refundable,
        [FilterOptionsEnum.ONLY_DIRECT]:
          isFiltering && flight.itineraries[0][0].segments.length === 1,
        [FilterOptionsEnum.ONLY_WITH_BAGGAGE]:
          isFiltering &&
          flight.services[Object.keys(flight.services)[0]].code !==
            ServicesEnum["0PC"],
      };
      isFiltering = conditions[option];
    }
    if (isFiltering) return flight;
  });
};
