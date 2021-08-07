import { GetterTree } from "vuex";
import { State } from "@/store/modules/search/state";
import { AirlinesModel, FlightsModel } from "@/api/search.service";

export type Getters = {
  airlines(state: State): AirlinesModel | null;
  flights(state: State): FlightsModel | null;
};

export const searchGetters: GetterTree<State, State> & Getters = {
  airlines: (state) => state.airlines,
  flights: (state) => state.flights,
};
