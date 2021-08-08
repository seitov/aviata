import { SearchMutationTypes } from "@/store/modules/search/types";
import { FilterModel, State } from "@/store/modules/search/state";
import { MutationTree } from "vuex";
import { AirlinesModel, FlightsModel } from "@/api/search.service";

export type Mutations<S = State> = {
  [SearchMutationTypes.SET_AIRLINES](state: S, payload: AirlinesModel): void;
  [SearchMutationTypes.SET_FLIGHTS](state: S, payload: FlightsModel[]): void;
  [SearchMutationTypes.SET_FILTER_OPTIONS](
    state: S,
    payload: FilterModel
  ): void;
};

export const searchMutations: MutationTree<State> & Mutations = {
  [SearchMutationTypes.SET_AIRLINES](state, payload: AirlinesModel) {
    state.airlines = payload;
  },
  [SearchMutationTypes.SET_FLIGHTS](state, payload: FlightsModel[]) {
    state.flights = payload;
  },
  [SearchMutationTypes.SET_FILTER_OPTIONS](state, payload: FilterModel) {
    state.filter = { ...payload };
  },
};
