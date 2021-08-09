<template>
  <div class="ticket">
    <div class="ticket__info">
      <div class="ticket__flight">
        <div class="ticket__flight-company">
          <div class="ticket__flight-company-logo">
            <img
              :src="`https://aviata.kz/static/airline-logos/21x21/${itinerary.carrier}.png`"
              alt="Uzbekistan airways"
            />
          </div>
          <div class="ticket__flight-company-name text-semibold">
            {{ itinerary.carrier_name }}
          </div>
        </div>
        <div class="ticket__flight-info text-12px">
          <div class="ticket__flight-schedule">
            <div class="ticket__flight-date">
              {{ departureDate }}
            </div>
            <div class="ticket__flight-time text-24px">
              <strong class="text-semibold">
                {{ departureTime }}
              </strong>
            </div>
          </div>
          <div class="ticket__flight-layover-info">
            <div class="ticket__flight-airports">
              <span
                class="text-uppercase text-secondary text-10px"
                :title="segments[0].origin"
              >
                {{ segments[0].origin_code }}
              </span>
              <span>{{ travelTime }}</span>
              <span
                class="text-uppercase text-secondary text-10px"
                :title="segments[segments.length - 1].dest"
              >
                {{ segments[segments.length - 1].dest_code }}
              </span>
            </div>
            <div class="ticket__flight-timeline">
              <span v-if="segments.length > 1"></span>
            </div>
            <div
              class="ticket__flight-waypoints text-center text-warning"
              v-if="segments.length > 1"
            >
              через {{ waypoints }}
            </div>
          </div>
          <div class="ticket__flight-schedule">
            <div class="ticket__flight-date">
              {{ arriveDate }}
              <span class="text-alert" v-if="nextDay">+{{ nextDay }}</span>
            </div>
            <div class="ticket__flight-time text-24px">
              <strong class="text-semibold">
                {{ arriveTime }}
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div class="ticket__details text-12px">
        <div class="ticket__details-info">
          <a href="#" class="ticket__details-link base-link">Детали перелета</a>
          <a href="#" class="ticket__details-link base-link">Условия тарифа</a>
          <span
            class="ticket__details-status text-dark"
            v-if="!flight.refundable"
          >
            <span class="icon"><NonRefundableIcon /></span>
            невозвратный
          </span>
        </div>
      </div>
    </div>
    <div class="ticket__price">
      <div class="ticket__price-row text-24px">
        <strong class="text-semibold">
          {{ flight.price }}
          <span class="text-18px">
            {{ currency }}
          </span>
        </strong>
      </div>
      <div class="ticket__price-row">
        <button
          type="button"
          class="ticket__price-button text-white text-18px text-bold"
        >
          Выбрать
        </button>
      </div>
      <div class="ticket__price-row text-12px text-dark">
        Цена за всех пассажиров
      </div>
      <div class="ticket__price-row ticket__price-row--space-between text-12px">
        <span class="ticket__baggage-status">{{ baggage }}</span>
        <button class="ticket__add-baggage-button text-blue text-semibold">
          + Добавить богаж
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NonRefundableIcon from "@/components/icons/NonRefundableIcon.vue";
import { defineComponent, PropType } from "vue";
import {
  FlightsModel,
  ItinerariesModel,
  SegmentsModel,
} from "@/api/search.service";
import { format, formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale";

export default defineComponent({
  name: "AviataTicket",
  components: {
    NonRefundableIcon,
  },
  props: {
    flight: {
      type: Object as PropType<FlightsModel>,
      required: true,
    },
  },
  computed: {
    itinerary(): ItinerariesModel {
      return this.flight.itineraries[0][0];
    },
    currency(): string {
      const currencySymbols: { [key in string]: string } = {
        KZT: "₸",
        USD: "$",
        EUR: "€",
      };
      return currencySymbols[this.flight.currency] || this.flight.currency;
    },
    departureDate(): string {
      return this.setDateFormat(this.itinerary.dep_date, "d MMM, eee");
    },
    departureTime(): string {
      return this.setDateFormat(this.itinerary.dep_date, "HH:mm");
    },
    arriveDate(): string {
      return this.setDateFormat(this.itinerary.arr_date, "d MMM, eee");
    },
    arriveTime(): string {
      return this.setDateFormat(this.itinerary.arr_date, "HH:mm");
    },
    nextDay(): number {
      const departureDate = new Date(this.itinerary.dep_date);
      const arriveDate = new Date(this.itinerary.arr_date);
      return +formatDistanceStrict(arriveDate, departureDate, {
        unit: "day",
        locale: ru,
      })
        .split(" ", 1)
        .join();
    },
    travelTime(): string {
      return this.setTimeFromTimestamp(this.itinerary.traveltime);
    },
    segments(): SegmentsModel[] {
      return this.itinerary.segments;
    },
    waypoints(): string {
      if (this.segments.length <= 1) return "";
      const MILLISECONDS_IN_SECOND = 1000;
      return this.segments.reduce((acc, segment, index, iterableArray) => {
        if (index === iterableArray.length - 1) return acc;
        const departureTime = new Date(segment.dep_time_iso).getTime();
        const arriveTime = new Date(segment.arr_time_iso).getTime();
        const timestamp = (arriveTime - departureTime) / MILLISECONDS_IN_SECOND;
        const time = this.setTimeFromTimestamp(timestamp);
        return `${segment.dest}, ${time} \n ${acc}`;
      }, "");
    },
    baggage(): string {
      return this.flight.services[Object.keys(this.flight.services)[0]].value;
    },
  },
  methods: {
    setDateFormat(date: string, dateFormat: string): string {
      return format(new Date(date), dateFormat, {
        locale: ru,
      });
    },
    setTimeFromTimestamp(timestamp: number): string {
      const SECONDS_IN_HOUR = 3600;
      const MINUTES_IN_HOUR = 60;
      const hours = Math.floor(timestamp / SECONDS_IN_HOUR);
      const minutes = Math.floor(
        timestamp / MINUTES_IN_HOUR - hours * MINUTES_IN_HOUR
      );
      return `${hours}ч ${minutes}м`;
    },
  },
});
</script>

<style lang="scss" scoped>
.ticket {
  height: 168px;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  @include laptop {
    margin-bottom: 10px;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &__info {
    height: 100%;
    width: 67%;
    background-color: $base-white;
    padding: 40px 40px 18px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include laptop {
      padding: 35px 35px 14px 35px;
    }
  }
  &__flight {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  &__flight-company {
    display: flex;
    width: 8rem;
    flex-direction: row;
    margin-right: 28px;
    align-items: center;
    @include laptop {
      margin-right: 15px;
    }
  }
  &__flight-company-logo {
    margin-right: 11.5px;
    width: 20px;
    height: 20px;
  }
  &__flight-info {
    display: flex;
    flex-direction: row;
  }
  &__flight-schedule {
    margin-right: 28px;
    @include laptop {
      margin-right: 15px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__flight-date {
    white-space: nowrap;
  }
  &__flight-layover-info {
    margin-right: 28px;
    width: 12rem;
    @include laptop {
      margin-right: 15px;
      width: 10rem;
    }
  }
  &__flight-airports {
    display: flex;
    justify-content: space-between;
  }
  &__flight-timeline {
    width: 100%;
    border-bottom: 1px solid $base-gray;
    position: relative;
    margin: 3.5px 0;

    &:before,
    &:after,
    span {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      border: 1px solid $base-gray;
      background-color: $base-white;
      top: calc(50% - 2px);
      box-sizing: border-box;
    }
    &:before {
      left: -2px;
    }
    &:after {
      right: -2px;
    }
    span {
      left: 50%;
    }
  }
  &__details {
    display: flex;
  }
  &__details-info {
    display: flex;
  }
  &__details-link {
    margin-right: 1.6rem;
  }
  &__details-status {
    display: flex;
  }
  &__price {
    height: 100%;
    width: 33%;
    padding: 20px;
    background-color: $base-light-gray;
  }
  &__price-row {
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    &--space-between {
      justify-content: space-between;
    }
  }
  &__price-button {
    width: 100%;
    height: 40px;
    background-color: $base-green;
    border-radius: 4px;
    padding: 7px 12px;
    transition: 0.4s;
    &:hover {
      background-color: $base-dark-green;
    }
  }
  &__baggage-status {
    margin-right: 6px;
  }
  &__add-baggage-button {
    background-color: $base-deep-light-blue;
    padding: 3px 8px;
    border-radius: 2px;
    transition: 0.4s;
    &:hover {
      background-color: $base-button-blue;
      color: $base-white;
    }
  }
}
.icon {
  display: inline;
  height: 16px;
  width: 16px;
  margin-right: 7px;
}
</style>
