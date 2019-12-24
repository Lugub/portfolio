<!-- 영화 검색 페이지 -->
<template>
  <v-container grid-list-md text-center class="margin:0 !important  ">

    <v-flex class="test goldfont" style="position:absolute; z-index:1; top:0;">
      <v-flex>
        AnimationTime
        <v-btn @click.prevent="playSound()">play</v-btn>
        <v-btn @click.prevent="stopSound()">stop</v-btn>
        <v-flex>{{ totalTime.toFixed(2) }}</v-flex>
      </v-flex>
      <audio @timeupdate="totalTime = $event.target.currentTime" ref="audio" controls style="display:none">
        <source src="../bgms/typographyBGM.mp3" type="audio/mp3"/>
      </audio>
    </v-flex>

    <v-flex class="frames" style="position:absolute; z-index:0; top:0; left:0;">
      <!-- 0 ~ 3 초 -->
      <v-flex class="frame" style="background-color:black;">

      </v-flex>

      <!-- 3 ~ 6 초 -->
      <v-flex class="frame">

      </v-flex>

      <!-- 6 ~ 10 초 -->
      <v-flex>

      </v-flex>

      <!-- 10 ~ 13 초 -->
      <v-flex>

      </v-flex>

      <!-- 13 ~ 18 초 -->
      <v-flex>

      </v-flex>

      <!-- 18 ~ 20 초 -->
      <v-flex>

      </v-flex>

      <!-- 20 ~ 26 초 -->
      <v-flex>

      </v-flex>

      <!-- 26 ~ 33 초 -->
      <v-flex>

      </v-flex>

      <!-- 33 ~ 38 초 -->
      <v-flex>

      </v-flex>

      <!-- 38 ~ 41 초 -->
      <v-flex>

      </v-flex>

      <!-- 41 ~ 48 초 -->
      <v-flex>

      </v-flex>

      <!-- 48 ~ 50 초 -->
      <v-flex>

      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    totalTime:0,
    timer:null,
    check:'',
    pageSwi:0,
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
    },
  },
  methods:{
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
    },
    playSound () {
      this.$refs.audio.play();
    },
    stopSound(){
      this.$refs.audio.pause();
    },
    FramePlay(){

    },

  }
};
</script>

<style lang="scss" scoped>
@import url("../../css/font.css");

.goldfont{
  font-family: gsc;
  font-style: normal;
  font-weight: normal;
  color:white;
}

.frame{
  width:100vw;
  height:100vh;
}

</style>
