<!-- 영화 검색 페이지 -->
<template>
  <v-container class="portfolio-container">
    <OakTime/>
  </v-container>
</template>

<script>
import OakTime from '../items/OakTime.vue'

export default {
  data: () => ({

  }),
  components: {
    OakTime,
  },
  computed: {
    
  },
  watch:{

  },
  methods:{
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
