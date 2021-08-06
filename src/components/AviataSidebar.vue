<template>
  <div class="sidebar">
    <div class="sidebar-filter">
      <h3 class="sidebar-filter__title text-bold text-14px">Опции тарифа</h3>
      <div class="sidebar-filter__options">
        <ul class="sidebar-filter__option-list">
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox />
          </li>
          <li class="sidebar-filter__option-item"><AviataCustomCheckbox /></li>
          <li class="sidebar-filter__option-item"><AviataCustomCheckbox /></li>
          <li class="sidebar-filter__option-item"><AviataCustomCheckbox /></li>
        </ul>
      </div>
    </div>
    <div class="sidebar-filter">
      <h3 class="sidebar-filter__title text-bold text-14px">Авиакомпании</h3>
      <div class="sidebar-filter__options">
        <ul class="sidebar-filter__option-list">
          <li class="sidebar-filter__option-item">
            <AviataCustomCheckbox />
          </li>
          <li class="sidebar-filter__option-item"><AviataCustomCheckbox /></li>
          <li class="sidebar-filter__option-item"><AviataCustomCheckbox /></li>
          <li class="sidebar-filter__option-item"><AviataCustomCheckbox /></li>
        </ul>
      </div>
    </div>
    <div class="sidebar-filter sidebar-filter--reset">
      <a href="#" class="base-link">Сбросить все фильтры</a>
    </div>
  </div>
</template>

<script>
import AviataCustomCheckbox from "@/components/AviataCustomCheckbox";
export default {
  name: "AviataSidebar",
  components: {
    AviataCustomCheckbox,
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  height: 100%;
}
.sidebar-filter {
  width: 100%;
  background-color: $base-light-gray;
  border-radius: 4px;
  padding: 12px 0;
  margin-bottom: 12px;
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
  &__option-list {
    width: 100%;
  }
  &__option-item {
    display: inline-block;
    width: 100%;
  }
}
</style>
