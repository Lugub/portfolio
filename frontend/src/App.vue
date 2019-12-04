<template>
  <v-app id="app">
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center class="appwindow">
          <!-- each pages will be placed here -->
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import router from "./router";

export default {
  data: () => ({
    choices: [
      {
        icon: "mdi-movie",
        text: "영화 검색",
        path: "movie-search"
      }
    ]
  }),
  methods: {
    goTo: function(path) {
      router.push({ name: path });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("./css/font.css");

#keep .v-navigation-drawer__border {
  display: none;
}

.appwindow{
  width:100vw;
  height:100vh;
}
</style>
