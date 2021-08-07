<template>
  <label class="custom-checkbox">
    <input
      class="custom-checkbox__input"
      type="checkbox"
      @change="$emit('onChange', $event)"
    />
    <span class="custom-checkbox__checkmark"></span>
    <span>{{ name }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AviataCustomCheckbox",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-checkbox {
  width: 100%;
  display: inline-block;
  padding: 10px 12px;
  position: relative;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    background-color: $base-light-gray-hover;
  }
  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  &__checkmark {
    display: inline-block;
    height: 12px;
    width: 12px;
    border: 1px solid $base-gray;
    border-radius: 2px;
    margin-right: 12px;
    background-color: $base-white;
    transition: background-color 0.4s ease-in-out;
  }
  &__input:hover ~ .custom-checkbox__checkmark {
    background-image: url("../assets/icons/checbox-hover.svg");
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 0.4s ease-in-out;
  }
  &__input:checked ~ .custom-checkbox__checkmark {
    border: 1px solid $base-green;
    background-image: url("../assets/icons/checbox-active.svg");
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 0.4s ease-in-out;
  }
}
</style>
