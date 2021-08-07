import { initState } from "@/store/modules/search/state";
import { searchActions } from "@/store/modules/search/actions";
import { searchMutations } from "@/store/modules/search/mutations";
import { searchGetters } from "@/store/modules/search/getters";

export default {
  state: { ...initState },
  actions: searchActions,
  mutations: searchMutations,
  getters: searchGetters,
};
