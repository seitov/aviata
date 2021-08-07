import {
  SearchActionTypes,
  SearchMutationTypes,
} from "@/store/modules/search/types";
import { ActionContext, ActionTree } from "vuex";
import { State } from "@/store/modules/search/state";
import { Mutations } from "@/store/modules/search/mutations";
import { getJsonResponse } from "@/api/search.service";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [SearchActionTypes.FETCH_JSON_DATA]({ commit }: AugmentedActionContext): void;
}

export const searchActions: ActionTree<State, State> & Actions = {
  async [SearchActionTypes.FETCH_JSON_DATA]({ commit }) {
    const response = await getJsonResponse();
    commit(SearchMutationTypes.SET_AIRLINES, response.airlines);
    commit(SearchMutationTypes.SET_FLIGHTS, response.flights);
  },
};
