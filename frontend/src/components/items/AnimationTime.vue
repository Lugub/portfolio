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
        <v-btn @click.prevent="playSound('../bgms/battlestart.mp3')"></v-btn>
        <audio src="http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-128k.mp3" @timeupdate="totalTime = $event.target.currentTime" ref="audio" controls></audio>
        <audio @timeupdate="totalTime = $event.target.currentTime" ref="audio" controls>
          <source src="../bgms/battlestart.mp3" type="audio/mp3"/>
        </audio>
      </v-flex>
    </v-flex>

    <!-- 로딩 창 -->
    <v-layout>


    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    totalTime:0,
    timer:null,
    check:'',
    time:0,
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
    time(time){
      if (Math.abs(time - this.$refs.audio.currentTime) > 0.5) {
        this.$refs.audio.currentTime = time
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
    },
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
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
}

</style>
