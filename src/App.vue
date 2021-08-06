<template>
  <div>
    <header class="header"></header>
    <main class="main">
      <div class="container">
        <div class="content">
          <section class="section section__sidebar"></section>
          <section class="section section__tickets">
            <AviataTicket />
            <AviataTicket />
            <AviataTicket />
            <AviataTicket />
            <AviataTicket />
            <AviataTicket />
            <AviataTicket />
          </section>
        </div>
      </div>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AviataTicket from "@/components/AviataTicket.vue";

export default defineComponent({
  name: "App",
  components: {
    AviataTicket,
  },
});
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 95px);
  padding-bottom: 120px;
  width: 100%;
  background-color: $base-dark-gray;
}

.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 23px;
}

.section {
  display: flex;

  &__sidebar {
    width: 25%;
  }

  &__tickets {
    width: 75%;
    flex-direction: column;
  }
}

.header {
  height: 95px;
}

.footer {
  height: 100px;
  width: 100%;
  background-color: rgb(22, 22, 22);
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
