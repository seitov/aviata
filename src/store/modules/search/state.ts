import { AirlinesModel, FlightsModel } from "@/api/search.service";

export const initState: State = {
  airlines: null,
  flights: null,
};

export interface State {
  airlines: AirlinesModel | null;
  flights: FlightsModel | null;
}
