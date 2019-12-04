<!-- 영화 검색 페이지 -->
<template>
  <v-container grid-list-md text-center class="goldfont">
    <v-flex>
      AnimationTime
      <v-flex>
        <v-btn @click="startTimer">startTimer</v-btn>
        <v-btn @click="resetTimer">resetTimer</v-btn>
        <v-flex>Time : {{totalTime.toFixed(2)}}</v-flex>
        <v-flex>Check : {{check}} </v-flex>
      </v-flex>
    </v-flex>



  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    totalTime:0,
    timer:null,
    check:'',
  }),
  components: {

  },
  computed: {
    ...mapState({

    }),
  },
  watch:{
    // 알람 function
    totalTime:function(val){
      if(val < 3 && val >= 2.99){
        // alert(val);
      }else if(val < 5 && val >= 4.99){
        // alert(val);
      }
    }
  },
  methods:{
    ...mapActions("data", ["searchMovies"]),
    goTo: function(path) {
      this.$router.push({ name: path });
    },
    goBack:function(){
      this.$router.go(1);
    },
    startTimer:function(){
      this.timer = setInterval(() => this.countdown(),10);
    },
    countdown:function(){
      this.totalTime+=0.01;
    },
    resetTimer:function(){
      this.totalTime=0;
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("../../css/font.css");

.goldfont{
  font-family: gsc;
  font-style: normal;
  font-weight: normal;
}

</style>
