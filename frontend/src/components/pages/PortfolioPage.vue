<!-- 영화 검색 페이지 -->
<template>
  <v-container class="portfolio-container">
    <OakTime/>
    <AnimationTime v-if="Timeswi"/>
    <ProjectTime v-if="Timeswi"/>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AnimationTime from '../items/AnimationTime.vue'
import OakTime from '../items/OakTime.vue'
import ProjectTime from '../items/ProjectTime.vue'

export default {
  data: () => ({
    Timeswi:false,
  }),
  components: {
    AnimationTime,
    OakTime,
    ProjectTime,
  },
  computed: {
    ...mapState({

    }),
  },
  watch:{

  },
  methods:{
    ...mapActions("data", ["searchMovies"]),
    goTo: function(path) {
      this.$router.push({ name: path });
    },
    goBack:function(){
      this.$router.go(1);
    },
  }
};
</script>

<style lang="scss" scoped>

.portfolio-container{
  width:100%;
  height:100%;
}

</style>
