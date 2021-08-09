import { AirlinesModel, FlightsModel } from "@/api/search.service";

export const initState: State = {
  airlines: null,
  flights: null,
  filter: {
    airlines: [],
    options: [],
  },
};

export interface State {
  airlines: AirlinesModel;
  flights: FlightsModel[];
  filter: FilterModel;
}

export interface FilterModel {
  airlines: string[];
  options: FilterOptionsEnum[];
}

export enum FilterOptionsEnum {
  ONLY_REFUNDABLE = "ONLY_REFUNDABLE",
  ONLY_WITH_BAGGAGE = "ONLY_WITH_BAGGAGE",
  ONLY_DIRECT = "ONLY_DIRECT",
}
