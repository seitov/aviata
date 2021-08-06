<template>
  <div class="ticket">
    <div class="ticket__info">
      <div class="ticket__flight">
        <div class="ticket__flight-company">
          <div class="ticket__flight-company-logo">
            <img
              src="https://aviata.kz/static/airline-logos/21x21/HY.png"
              alt="Uzbekistan airways"
            />
          </div>
          <div class="ticket__flight-company-name text-semibold">
            Air Astana
          </div>
        </div>
        <div class="ticket__flight-info text-12px">
          <div class="ticket__flight-schedule">
            <div class="ticket__flight-date">25 ноя, вс</div>
            <div class="ticket__flight-time text-24px">
              <strong class="text-semibold">23:25</strong>
            </div>
          </div>
          <div class="ticket__flight-layover-info">
            <div class="ticket__flight-airports">
              <span class="text-uppercase text-secondary text-10px">ALA</span>
              <span>4 ч 20 м</span>
              <span class="text-uppercase text-secondary text-10px">ALA</span>
            </div>
            <div class="ticket__flight-timeline">
              <span></span>
            </div>
            <div class="ticket__flight-way text-center text-warning">
              через Шымкент, 1 ч 50 м
            </div>
          </div>
          <div class="ticket__flight-schedule">
            <div class="ticket__flight-date">
              25 ноя, вс <span class="text-alert">+1</span>
            </div>
            <div class="ticket__flight-time text-24px">
              <strong class="text-semibold">23:25</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="ticket__details text-12px">
        <div class="ticket__details-info">
          <a href="#" class="ticket__details-link base-link">Детали перелета</a>
          <a href="#" class="ticket__details-link base-link">Детали перелета</a>
          <span class="ticket__details-status text-dark">
            <span class="icon"><NonRefundableIcon /></span>
            невозвратный
          </span>
        </div>
      </div>
    </div>
    <div class="ticket__price">
      <div class="ticket__price-row text-24px">
        <strong class="text-semibold">
          590 240
          <span class="text-18px">₸</span>
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
        <span class="ticket__baggage-status">Нет багажа</span>
        <button class="ticket__add-baggage-button text-blue text-semibold">
          + Добавить богаж
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NonRefundableIcon from "@/components/icons/AviataIcon";
export default {
  name: "AviataTicket",
  components: {
    NonRefundableIcon,
  },
};
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
  }
  &__flight {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
  }
  &__flight-company {
    display: flex;
    flex-direction: row;
    margin-right: 13px;
    align-items: center;
  }
  &__flight-company-logo {
    margin-right: 11.5px;
  }
  &__flight-info {
    display: flex;
    flex-direction: row;
  }
  &__flight-schedule {
    margin-right: 28px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__flight-layover-info {
    margin-right: 28px;
  }
  &__flight-airports {
    display: flex;
    justify-content: space-between;
  }
  &__flight-timeline {
    width: 170px;
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
