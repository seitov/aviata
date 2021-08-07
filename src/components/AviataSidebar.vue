<template>
  <div class="sidebar text-12px">
    <div class="sidebar-filter">
      <h3 class="sidebar-filter__title text-bold text-14px">Опции тарифа</h3>
      <div class="sidebar-filter__options">
        <ul class="sidebar-filter__option-list">
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox name="Только прямые" />
          </li>
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox name="Только с багажом" />
          </li>
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox name="Только возвратные" />
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-filter">
      <h3 class="sidebar-filter__title text-bold text-14px">Авиакомпании</h3>
      <div class="sidebar-filter__options">
        <AviataCustomCheckbox name="Все" />
      </div>
      <div class="sidebar-filter__options sidebar-filter__options--scroll">
        <ul class="sidebar-filter__option-list">
          <li
            class="sidebar-filter__option-item"
            v-for="(airline, airlineCode) in airlines"
            :key="airlineCode"
          >
            <AviataCustomCheckbox :name="airline" />
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-filter sidebar-filter--reset">
      <a href="#" class="base-link">Сбросить все фильтры</a>
    </div>
  </div>
</template>

<script lang="ts">
import AviataCustomCheckbox from "@/components/AviataCustomCheckbox.vue";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AviataSidebar",
  components: {
    AviataCustomCheckbox,
  },
  computed: {
    ...mapGetters({
      airlines: "airlines",
    }),
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: content-box;
}
.sidebar-filter {
  width: 100%;
  background-color: $base-light-gray;
  border-radius: 4px;
  padding: 12px 4px 0 0;
  margin-bottom: 12px;
  max-height: 320px;
  &:last-child {
    margin-bottom: 0;
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
      &::-webkit-scrollbar {
        width: 2px;
        background: $base-light-gray;
        border-radius: 2px;
      }
      &::-webkit-scrollbar-button:start {
        display: none;
      }
      &::-webkit-scrollbar-button:end {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: $base-dark-gray;
        border-radius: 2px;
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
