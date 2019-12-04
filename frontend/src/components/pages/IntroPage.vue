<!-- 영화 검색 페이지 -->
<template>
  <v-container grid-list-md text-center>
    IntroPage
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {

  },
  data: () => ({

  }),
  computed: {
    ...mapState({

    })
  },
  methods:{
  ...mapActions("data", ["searchMovies"])
  }
};
</script>
