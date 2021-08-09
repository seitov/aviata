<template>
  <div>
    <header class="header" />
    <main class="main">
      <div class="container">
        <div class="content">
          <section class="section section__sidebar">
            <AviataSidebar />
          </section>
          <section class="section section__tickets">
            <template v-if="flights && flights.length">
              <AviataTicket
                v-for="flight in flights"
                :key="flight.id"
                :flight="flight"
              />
            </template>
            <template v-else>
              <span class="text-16px text-semibold">
                Мы нашли {{ foundFlightsCount }} варианта(ов) перелета, но ни
                один из вариантов не соответствует заданным фильтрам
              </span>
            </template>
          </section>
        </div>
      </div>
    </main>
    <footer class="footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AviataTicket from "@/components/AviataTicket.vue";
import AviataSidebar from "@/components/AviataSidebar.vue";
import { mapGetters } from "vuex";
import { SearchActionTypes } from "@/store/modules/search/types";

export default defineComponent({
  name: "App",
  components: {
    AviataTicket,
    AviataSidebar,
  },
  computed: {
    ...mapGetters({
      flights: "flightsByFiltering",
      foundFlightsCount: "foundFlightsCount",
    }),
  },
  created(): void {
    this.$store.dispatch(SearchActionTypes.FETCH_JSON_DATA);
  },
});
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 95px);
  padding-bottom: 120px;
  width: 100%;
  background-color: $base-dark-gray;
  @include laptop {
    padding-bottom: 110px;
  }
}

.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 23px;
  @include laptop {
    padding-top: 15px;
  }
}

.section {
  display: flex;

  &__sidebar {
    width: 25%;
    margin-right: 20px;
    @include laptop {
      margin-right: 10px;
    }
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
