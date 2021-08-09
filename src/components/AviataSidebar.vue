<template>
  <div class="sidebar text-12px">
    <div class="sidebar-filter">
      <h3 class="sidebar-filter__title text-bold text-14px">Опции тарифа</h3>
      <div class="sidebar-filter__reset-block" v-if="filter.options.length">
        <button
          type="button"
          class="sidebar-filter__reset-button"
          @click="resetFilterTariffOptions"
        ></button>
        <div class="sidebar-filter__reset-tooltip">Сбросить фильтр</div>
      </div>
      <div class="sidebar-filter__options">
        <ul class="sidebar-filter__option-list">
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox
              label="Только прямые"
              v-model="filter.options"
              :value="filterOptionEnum.ONLY_DIRECT"
            />
          </li>
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox
              label="Только с багажом"
              v-model="filter.options"
              :value="filterOptionEnum.ONLY_WITH_BAGGAGE"
            />
          </li>
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox
              label="Только возвратные"
              v-model="filter.options"
              :value="filterOptionEnum.ONLY_REFUNDABLE"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-filter">
      <h3 class="sidebar-filter__title text-bold text-14px">Авиакомпании</h3>
      <div class="sidebar-filter__options">
        <AviataCustomCheckbox
          label="Все"
          v-model="isSelectedAllAirlines"
          @change="selectAllAirlines"
        />
      </div>
      <div class="sidebar-filter__options sidebar-filter__options--scroll">
        <ul class="sidebar-filter__option-list">
          <li
            class="sidebar-filter__option-item"
            v-for="(airline, airlineCode) in airlines"
            :key="airlineCode"
          >
            <AviataCustomCheckbox
              :label="airline"
              :value="airlineCode"
              v-model="filter.airlines"
              @change="updateSelectedAllAirlines"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-filter sidebar-filter--reset">
      <a href="#" class="base-link" @click.prevent="resetAllFilterOptions">
        Сбросить все фильтры
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import AviataCustomCheckbox from "@/components/AviataCustomCheckbox.vue";
import { useStore } from "vuex";
import { computed, defineComponent, ref, watch } from "vue";
import { AirlinesModel } from "@/api/search.service";
import { SearchActionTypes } from "@/store/modules/search/types";
import { FilterModel, FilterOptionsEnum } from "@/store/modules/search/state";

export default defineComponent({
  name: "AviataSidebar",
  components: {
    AviataCustomCheckbox,
  },
  setup: () => {
    const store = useStore();
    const isSelectedAllAirlines = ref<boolean>(true);
    const filterOptionsEnum = ref(FilterOptionsEnum);
    let filter = ref<FilterModel>({
      airlines: [],
      options: [],
    });
    const airlines = computed<AirlinesModel>(() => store.getters.airlines);
    watch(airlines, (value) => {
      if (value === null) return;
      filter.value.airlines = Object.keys(value);
    });
    watch(filter.value, (value) => {
      store.dispatch(SearchActionTypes.SET_FILTER_OPTIONS, value);
    });
    function resetAllFilterOptions(): void {
      isSelectedAllAirlines.value = true;
      filter.value.airlines = Object.keys(airlines.value);
      filter.value.options = [];
    }
    function resetFilterTariffOptions(): void {
      filter.value.options = [];
    }
    function selectAllAirlines(): void {
      filter.value.airlines = [];
      if (isSelectedAllAirlines.value) {
        for (let key in airlines.value) {
          filter.value.airlines.push(key);
        }
      }
    }
    function updateSelectedAllAirlines(): void {
      isSelectedAllAirlines.value =
        filter.value.airlines.length === Object.keys(airlines.value).length;
    }
    return {
      isSelectedAllAirlines,
      filterOptionEnum: filterOptionsEnum,
      filter,
      airlines,
      resetAllFilterOptions,
      resetFilterTariffOptions,
      selectAllAirlines,
      updateSelectedAllAirlines,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  height: 100%;
  box-sizing: content-box;
}
.sidebar-filter {
  width: 100%;
  background-color: $base-light-gray;
  border-radius: 4px;
  padding: 12px 4px 0 0;
  margin-bottom: 12px;
  max-height: 320px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
  &__reset-block {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  &__reset-button {
    height: 20px;
    width: 20px;
    background-image: url("../assets/icons/icon-close-filter.svg");
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: background 0.4s;
    &:hover {
      background-image: url("../assets/icons/icon-close-filter-hover.svg");
    }
    &:hover + .sidebar-filter__reset-tooltip {
      visibility: visible;
      opacity: 1;
    }
  }
  &__reset-tooltip {
    visibility: hidden;
    opacity: 0;
    transition: 0.4s ease-in-out;
    padding: 12px;
    background-color: $base-white;
    position: absolute;
    top: -55px;
    right: -55px;
    border: 1px solid $base-dark-gray;
    border-radius: 6px;
    white-space: nowrap;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -20px;
      border: 10px solid transparent;
      border-top: 100px solid $base-dark-gray;
    }
    &:after {
      border-top: 10px solid $base-white;
      bottom: -19px;
    }
  }
  &--reset {
    background-color: transparent;
    margin-bottom: 0;
    padding: 0;
  }
  &__title {
    margin: 0 10px 12px 10px;
  }
  &__options {
    &--scroll {
      overflow-y: auto;
      max-height: calc(305px - 80px);
      position: relative;
      &::-webkit-scrollbar {
        width: 3px;
        background: $base-light-gray;
        border-radius: 2px;
        position: absolute;
        right: -25px;
      }
      &::-webkit-scrollbar-button:start {
        display: none;
      }
      &::-webkit-scrollbar-button:end {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: $base-dark-gray;
        border-radius: 3px;
        width: 2px;
        height: 117px;
        background-clip: padding-box;
      }
    }
  }
  &__option-list {
    width: 100%;
  }
  &__option-item {
    display: inline-block;
    width: 100%;
  }
}
</style>
