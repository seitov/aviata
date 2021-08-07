import { default as results } from "./results.json";

export const getJsonResponse = (): Promise<ResponseModel> => {
  return Promise.resolve<ResponseModel>(results);
};

export interface ResponseModel {
  airlines: AirlinesModel;
  flights: FlightsModel;
}

export interface AirlinesModel {
  [key: string]: string;
}

export interface FlightsModel {
  itineraries: Array<ItinerariesModel[]>;
  price_details: PriceDetailsModel;
  price: string;
  currency: string;
  bonus_usage: boolean;
  services: ServicesType;
  price_raw: number;
  validating_carrier: string;
  id: string;
  has_meta: boolean;
  has_offers: boolean;
  best_time: number;
  bonus_accrual: boolean;
  bonus_accrual_details: null;
  bonus_usage_details: null;
  provider: string;
  refundable: boolean;
  provider_class: string;
}

interface PriceDetailsModel {
  base_raw: number;
  modifiers: string;
  modifiers_raw: number;
  taxes: string;
  base: string;
  taxes_raw: number;
}

export type ServicesType = {
  [key in ServicesEnum | string]: ServiceModel;
};

export enum ServicesEnum {
  "0PC" = "0PC",
  "1PC" = "1PC",
  "20KG" = "20KG",
}

interface ServiceModel {
  full_description: string;
  alt_text: string;
  code: string;
  description: string;
  title: string;
  default: string;
  solution: string;
  value: string;
  icon: string;
}

export interface ItinerariesModel {
  dep_date: string;
  hash: string;
  dir_index: number;
  price: ItinerariesPriceModel;
  layovers: number[];
  arr_date: string;
  allowed_offers: [];
  carrier_name: "Air Astana";
  is_meta: false;
  segments: SegmentsModel[];
  stops: number;
  carrier: string;
  refundable: boolean;
  traveltime: number;
}

export interface SegmentsModel {
  origin: string;
  airport_dest: string;
  arr_time_iso: string;
  dep_terminal: string;
  dep_time_iso: string;
  carrier_name: string;
  stop_locations: [];
  dest_code: string;
  airport_dest_terminal: string;
  equipment: string;
  flight_num: string;
  stops: number;
  airport_origin: string;
  cabin: string;
  dep_time: string;
  dest: string;
  origin_code: string;
  baggage_options: BaggageOptionsModel[];
  arr_time: string;
  plane: string;
  services: ServiceModel;
  fare_basis_code: string;
  airport_origin_terminal: string;
  arr_terminal: string;
  carrier: string;
  fare_seats: number;
}

interface ItinerariesPriceModel {
  currency: string;
  amount: string;
  price_raw: number;
}

interface BaggageOptionsModel {
  unit: string;
  value: number;
}
