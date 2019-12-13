<!-- 영화 검색 페이지 -->
<template>
  <v-container grid-list-md text-center class="goldfont TimeWindow" :class="{OakTimeEndBlink : endswi}" >
    <v-row justify="center" align="center" style="width:100%; height:100%">
      <v-spacer/>
      <v-flex class="OakWindow" :class="{OakBlind: blackSwi}"  >
        <v-col class="OakWindowGrid">
          <v-flex class="top-space">
            <p class="press-space blink" v-if="scriptLoadingSwi" >
              press SPACE!!
            </p>
          </v-flex>

          <v-row class="OakProfessor" >
            <v-spacer/>
            <v-flex class="OakProfessor-img" :class="{OakTransparent: blackSwi}" >
              <!-- Professor -->
              <!-- Check
              currentScript : {{ currentScript }}<br>
              ScriptCnt : {{ scriptCnt }}<br>
              ScriptLoadingSwi :  {{ scriptLoadingSwi }}<br>
              currentScriptCnt : {{currentScriptCnt}}<br>
              nameWindowSwi : {{nameWindowSwi}}<br>
              doctorScript : {{doctorScript[scriptCnt]}}<br>
              scriptSwi : {{scriptSwi}}<br> -->
            </v-flex>
            <v-col justify="center" align="center" style="width:auto; height:100%;">

              <v-row class="yes-or-no" v-if="yesWindow">
                <v-col style="width:30%;">
                  <v-flex class="yespointer" :class="{'yes-or-no-pointer': yesnoswi}">

                  </v-flex>
                  <v-flex class="yespointer" :class="{'yes-or-no-pointer': !yesnoswi}">

                  </v-flex>
                </v-col>
                <v-col justify="start" align="start" style="width:70%;">
                  <v-flex>
                    예
                  </v-flex>
                  <v-flex>
                    아니오
                  </v-flex>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-flex class="bottom-space">
            <!-- 텅빈공간. margin해도 됫었는데 걍 했음 -->
          </v-flex>

          <v-flex class="Oak-script" v-if="scriptSwi == true">

            <v-col>
              <v-row>
                {{ currentScript }}
              </v-row>
            </v-col>
            <v-flex class="pointerbackground" v-if="scriptLoadingSwi">
              <v-flex class="nextpointer"/>
            </v-flex>
          </v-flex>

        </v-col>
      </v-flex>
      <v-spacer/>
    </v-row>

    <v-layout class="set-name-window" :class="{'name-window-on':nameWindowSwi}">
      <v-col justify="center" align="center">
        <v-row justify="center" align="center">
          <v-spacer/>
          <v-col style="width:100%;">
            <v-flex style="background-color:yellow;" >
              방문자 님의 성함은?
            </v-flex>
            <v-row style="background-color:red;">
              <v-col cols="3">
                이름 :
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-flex v-for="(item, index) in nameChar" class="set-name-td" :class="setNameBorder(index)" v-bind:key="item">
                    {{ item }}
                  </v-flex>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer/>
        </v-row>
        <v-flex class="set-name-input">
          <table class="set-name-table">
            <tr v-for="(line,index) in cTable" v-bind:key="line">
              <td v-for="(item,id) in line" class="set-name-box" :class="{'set-name-cursor': setBorder(index,id)}" v-bind:key="item">
                {{item}}
              </td>
            </tr>
          </table>
        </v-flex>
        <v-row style="background-color:grey; height:10%; width:95%;" justify="center" align="center">
          <v-spacer/>
          <v-flex class="set-name-cursor-border" :class="{'set-name-cursor': setBtnDelBorder()}">
            정정
          </v-flex>
          <v-spacer/>
          <v-flex class="set-name-cursor-border" :class="{'set-name-cursor': setBtnConfBorder()}">
            결정
          </v-flex>
          <v-spacer/>

        </v-row>
      </v-col>
    </v-layout>

    <v-layout class="fade-out-window">

        <v-col v-for="numbercol in 10" v-bind:key="numbercol"  >
          <v-row v-for="numberrow in 10" v-bind:key="numberrow" justify="space-between" style="width:10vw; height:9.8vh; padding:0 0 0 0" :class="{OakTimeEndFadeOut:fadeOutTable[numberrow * 10 + numbercol - 10]}">
            block
          </v-row>
        </v-col>

    </v-layout>

    <audio @timeupdate="oakfinaltime = $event.target.currentTime" ref="oakfinalaudio" controls style="display:none">
      <source src="../bgms/battlestart.mp3" type="audio/mp3"/>
    </audio>
    <audio @timeupdate="bgmtime = $event.target.currentTime" ref="backgroundaudio" controls style="display:none">
      <source src="../bgms/victory.mp3" type="audio/mp3"/>
    </audio>
    <audio @timeupdate="bgmtime = $event.target.currentTime" ref="tikaudio" controls style="display:none">
      <source src="../bgms/tik.mp3" type="audio/mp3"/>
    </audio>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {

  },
  mounted:function(){
    this.SetCurrentTime();
    this.SetFadeOutTableFalse();
    window.addEventListener('keyup', this.ScriptControll)
    window.addEventListener('keyup', this.YesOrNoPointer)
  },
  data: () => ({
    oakfinaltime:0,
    bgmtime:0,
    fadeinswi:false,

    //time ment
    seosonment:[
      '못다한 추위가 차가울 겨울','꽃샘추위가 한창인 봄','화창한 봄 날씨','늦은 봄',
      '슬슬 더워질 이른 여름','무더운 여름날','더위가 가시지 않은 여름',
      '이른 가을','단풍이 무성할 가을','추위가 올 준비하는 늦은 가을',
      '이른 겨울','차가운 추위가 쓰라린 겨울'
    ],
    timement:[
      '해가 눈을 뜰 때','출근이 한창인 아침','일을 막 시작할 때',
      '일을 멈추고 점심밥을 먹어야 할 때','본격적인 일을 시작할 때','일이 슬슬 마무리될 때',
      '사람들이 퇴근을 준비할 때','야근이 한창 진행될 때','착한아이들은 잠이 들어야 할 때',
      '깊은 밤 모두가 잠이 들 때','달이 홀로 밤을 비출 때'
    ],

    //event cnt
    timeCnt:2,
    seosonCnt:3,
    nameSetCnt:14,
    nameCheckCnt:15,
    endCnt:21,
    //script
    doctorScript:[
      '.... ... ... ... ... ...',                         // 0
      '.... ... ... ...! ',                         // 1
      ' 현재시각',                                          // 2
      ' 시각에 따른 멘트',                                   // 3
      ' Fade Out ',                                          // 4
      ' 안녕하십니까, ',                                       // 5
      ' 저의 포트폴리오 사이트를 방문해 주셔서 감사합니다. ',     // 6
      ' 저는 이 웹의 제작자 이 상 호 입니다. ',                  // 7
      ' 본격적인 저의 웹 소개에 앞서. 혹시 모르는 분들이 계실까봐,  ',       // 8
      ' 이 오프닝은 포켓몬스터 게임의 오프닝을 따라 만들었습니다.  ',   // 9
      ' ... ... ',                                             // 10
      ' 이 웹의 주제는 WOW입니다. ',                            // 11
      ' 방문자에게 놀라움을 드리고 싶습니다..! ',                     // 12
      ' 먼저 성함(아이디)을 말씀해 주세요.',                      // 13
      ' 이름 설정 14',                                        // 14
      ' 이름 재차 확인 15',                                    // 15
      ' 좋습니다 !!.',                                         // 16
      ' 부디 이 웹을 즐겁게 감상해주시길 바랍니다..',            // 17
      ' 모든 페이지는 전부 Web으로 만들었으며.',                 // 18
      ' 개발에 대한 자세한 사항은 Git에서 확인하실 수 있습니다.',// 19
      ' 자 그럼 이제 시작합니다 !!.',                                        // 20

    ],
    currentScript:'... ... ...',
    scriptCnt:0,
    currentScriptCnt:0,
    scriptProceeder:null,

    // switches
    scriptLoadingSwi:true,
    scriptNextSwi:false,
    scriptSwi:true,
    blackSwi:true,
    btnSwi:false,

    //yes or no
    yesWindow:false,
    yesnoswi:true,

    //set name
    nameChar:['?','?','?','?','?','?','?','?','?'],
    name: '루겁',
    nameCursor:0,
    nameCursorRow:0,
    nameCursorCol:0,
    nameCho:'',
    nameJung:'',
    nameJong:'',
    nameWindowSwi:false,
    deleteswi:false,
    confirmswi:false,

    //EndOakTime
    endswi:false,
    fadeoutswi:false,

    cTable:[
      ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ',' ','ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ'],
      ['ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ',' ','ㅠ','ㅡ','ㅣ','ㅐ','ㅒ','ㅔ','ㅖ'],
      ['ㄲ','ㄸ','ㅃ','ㅆ','ㅉ',' ',' ',' ','ㅘ','ㅙ','ㅚ','ㅝ','ㅟ','ㅢ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'],
      ['P','Q','R','S','T','U','V','W','X','Y','Z',' ',' ',' ',' '],
      ['1','2','3','4','5','6','7','8','9','0',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    ],

    cCho:{'ㄱ':1,'ㄲ':2,'ㄴ':3,'ㄷ':4,'ㄸ':5,'ㄹ':6,'ㅁ':7,'ㅂ':8,'ㅃ':9,'ㅅ':10,'ㅆ':11,
          'ㅇ':12,'ㅈ':13,'ㅉ':14,'ㅊ':15,'ㅋ':16,'ㅌ':17,'ㅍ':18,'ㅎ':19},

    cJung:{'ㅏ':1,'ㅐ':2,'ㅑ':3,'ㅒ':4,'ㅓ':5,'ㅔ':6,'ㅕ':7,'ㅖ':8,'ㅗ':9,'ㅘ':10,'ㅙ':11,'ㅚ':12,'ㅛ':13,'ㅜ':14,'ㅝ':15,'ㅞ':16,
           'ㅟ':17,'ㅠ':18,'ㅡ':19,'ㅢ':20,'ㅣ':21},
    cJong:{'':1, 'ㄱ':2, 'ㄲ':3, 'ㄳ':4, 'ㄴ':5, 'ㄵ':6, 'ㄶ':7, 'ㄷ':8, 'ㄹ':9, 'ㄺ':10, 'ㄻ':11, 'ㄼ':12, 'ㄽ':13, 'ㄾ':14
            , 'ㄿ':15, 'ㅀ':16, 'ㅁ':17, 'ㅂ':18, 'ㅄ':19, 'ㅅ':20, 'ㅆ':21, 'ㅇ':22, 'ㅈ':23, 'ㅊ':24, 'ㅋ':25, 'ㅌ':26, 'ㅍ':27
            , 'ㅎ':28},
    fadeOutTable:[],
    fadeOutProceeder:null,
    fadeOutCnt:0,
    fadeOutTableCnt:[1,11,21,31,41,51,61,71,81,91,92,93,94,95,96,97,98,99,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,12,22,32,42,52,62,72,82,83,84,85,86,87,88,89,79,69,59,49,39,29,19,18,17,16,15,14,13,23,33,43,53,63,73,74,75,76,77,78,68,58,48,38,28,27,26,25,24,34,44,54,64,65,66,67,57,47,37,36,35,45,55,56,46],
  }),
  watch:{
    currentScriptCnt:function(val){
      if(val+1 >= this.doctorScript[this.scriptCnt].length){
        this.ScriptStop();
      }
      this.currentScript += ( this.doctorScript[this.scriptCnt][val] == undefined ) ? '' : this.doctorScript[this.scriptCnt][val];
    },
    oakfinaltime:function(val){

      if(val >= 6){
        this.$router.push({ name: 'animation' });
      }
      else if(val >= 2.5){
        if(!this.fadeoutswi){
          this.fadeoutswi=true;
        }
      }
      else if(val >= 2){
        this.endswi=false;
        this.fadeoutswi=true;
      }
      else{
        this.endswi=true;
      }
    },
    fadeoutswi:function(val){
      if(val){
        // alert(val + "!!")
        this.SnailFadeOut();
      }
    }
  },
  methods:{
    ...mapActions("data", ["searchMovies","setCurrentTime","setCurrentUserName"]),

    // space눌렀을 때
    ScriptControll:function(e){
      // alert("space Pressed");
      if(e.keyCode != 32)return;
      if(!this.scriptSwi)return;
      if(this.yesWindow)return;
      if(this.scriptLoadingSwi){
          // alert("Ok Next Script")
          this.currentScript='';
          this.scriptLoadingSwi=false;
          this.$refs.tikaudio.play();
          this.ScriptProceeding();
      }
    },

    // Script 진행하는 함수
    ScriptProceeding:function(){
      // alert("ScriptProceeding!!!")
      this.currentScriptCnt = 0;
      this.scriptCnt++;
      // this.PlayTalkSound();
      //fade in 해야 함.
      if(this.scriptCnt == this.seosonCnt+1 ){
        this.scriptSwi = false;
        this.setOpacitySwi = true;
        this.FadeOut();

      }
      // name 설정
      else if(this.scriptCnt == this.nameSetCnt){
        //Script 내려주고
        this.scriptSwi = false;
        this.nameWindowSwi = true;
        window.addEventListener('keyup', this.CursorMove);
      }
      //name 재차 확인
      else if(this.scriptCnt == this.nameCheckCnt){
        this.doctorScript[this.nameCheckCnt] = ' ';
        this.$set(this.doctorScript, this.nameCheckCnt, ' ');
        this.doctorScript[this.nameCheckCnt] = this.name + " 이(가) 맞습니까?";
        this.scriptProceeder = setInterval(() => this.ScriptDown(),25);
      }
      // 마지막 일 때
      else if(this.scriptCnt == this.endCnt){
        this.StopBGMSound();
        this.EndOakTime();
      }
      // 계속 대사 진행
      else{
        this.scriptProceeder = setInterval(() => this.ScriptDown(),25);
      }
    },



    FadeOut:function(){
      setTimeout(()=> this.FadeOutOther(),5000);
      setTimeout(()=> this.FadeOutBlack(),2000);
    },

    FadeOutOther:function(){
      this.scriptSwi = true;
      this.ScriptProceeding();
      this.PlayBGMSound();
    },

    FadeOutBlack:function(){
      this.blackSwi = false;
    },

    ScriptDown:function(){
      this.currentScriptCnt++;
    },

    PlayBGMSound:function(){
      this.$refs.backgroundaudio.play();
    },
    StopBGMSound:function(){
      this.$refs.backgroundaudio.pause();
    },


    //script 중단, 스페이스누를때까지 대기상태
    ScriptStop:function(){
      // alert("ScriptStop!!!")
      clearInterval(this.scriptProceeder);
      this.scriptProceeder = null;
      this.scriptLoadingSwi = true;

      if(this.scriptCnt == this.nameCheckCnt){

        this.scriptLoadingSwi = false;
        this.yesWindow = true;

      }

    },

    //OakTime  끝날때
    EndOakTime:function(){
      //번쩍번쩍 과 동시에 브금 시작
      // 블록하나씩 거매지면서 FadeOut,
      // 전부 FadeOut하면 라우터 전환
      this.PlayLastSound();

    },
    // 음악 재생,
    PlayLastSound () {
      this.$refs.oakfinalaudio.play();
    },

    // 달팽이 fadeout 시작
    SnailFadeOut: function(){
      // 무슨 문제인지 모르겠지만 FadeOut이 차례차례실행되지 않고 전체적으로 동시에 실행되서 ㅈ망.
      // var row = 1, col = 0, n = 10, value = 1;
      // var inc = 1;
      // var i, j;
      //
      // while( n > 0){
      //   for(i = 1; i <= n; i++){
      //     col += inc;
      //     setTimeout(this.SetSnailTrue(row*10 + col - 10), 25 * value);
      //     value++;
      //   }
      //   n--;
      //   if(n == 0)break;
      //   for(i = 1; i <= n; i++){
      //     row += inc;
      //      setTimeout(this.SetSnailTrue(row*10 + col - 10), 25 * value);
      //     value++;
      //   }
      //   inc *= -1;
      // }


      setTimeout(this.SetSnailTrue,0)
    },

    SetSnailTrue: function(){
      if(this.fadeOutCnt >= 100){
        clearTimeout(this.fadeOutProceeder);
        this.fadeOutProceeder = null;
        return ;
      }
      // this.fadeOutTable[this.fadeOutTableCnt[this.fadeOutCnt++]] = true;
      this.$set(this.fadeOutTable, this.fadeOutTableCnt[this.fadeOutCnt++], true);
      this.fadeOutProceeder = setTimeout(this.SetSnailTrue, 25);
      // this.fadeOutTable[val] = true;
    },

    SetCurrentTime:function(){
      let time = new Date();

      this.setCurrentTime(time);

      let Year = time.getFullYear();
      let Month = time.getMonth();
      let Hour = time.getHours();
      let Day = time.getDate();

      this.doctorScript[this.timeCnt] = " 현재 시각 " + Year + "년 " + (Month+1) + "월 " + (Day) + "일 " + Hour + "시..  ";

      let hourment = '';
      if(Hour < 4){
        hourment = this.timement[9];
      }else if( Hour < 6 ){
        hourment = this.timement[10];
      }else if(Hour < 7){
        hourment = this.timement[0];
      }else if(Hour < 9){
        hourment = this.timement[1];
      }else if(Hour < 12){
        hourment = this.timement[2];
      }else if(Hour < 13){
        hourment = this.timement[3];
      }else if(Hour < 16){
        hourment = this.timement[4];
      }else if(Hour < 18){
        hourment = this.timement[5];
      }else if(Hour < 20){
        hourment = this.timement[6];
      }else if(Hour < 23){
        hourment = this.timement[7];
      }else if(Hour == 24 ){
        hourment = this.timement[8];
      }
      this.doctorScript[this.seosonCnt] = this.seosonment[Month] + ", " + hourment + '\n' + "  방문해 주셨습니다...   ";

    },

    // name
    setNameBorder:function(index){
      let ret = ''
      if(this.nameChar[index] == '?'){
        ret = 'set-name-td-transparent';
      }

      if(index == this.nameCursor){
        // 밑줄 블링크
        return ret + ' set-name-td-blink'
      }else if(index < this.nameCursor){
        // 밑줄
        return ret +  ' set-name-td-under'
      }else{
        return ' set-name-td-transparent';
      }
    },

    // name window functions
    setBorder:function(col,row){
      if(this.nameCursorCol == col && this.nameCursorRow == row){
        return true;
      }
      return false;
    },

    //
    setBtnDelBorder:function(){

      if(this.btnSwi){
        if(this.nameCursorRow % 2 == 1){
          return true;
        }
      }
      return false;

    },

    setBtnConfBorder:function(){

      if(this.btnSwi){
        if(this.nameCursorRow % 2 == 0){
          return true;
        }
      }
      return false;

    },

    CursorMove:function(e){
      //왼쪽
      // alert("!!!!cursormove!")
      if(e.keyCode == 37){
        this.nameCursorRow--;
        if(this.nameCursorRow < 0){
          this.nameCursorRow = this.cTable[0].length - 1;
        }
      }
      // 위로
      else if(e.keyCode == 38){
        this.nameCursorCol--;
        this.btnSwi = false;

        if(this.nameCursorCol == -1){
          this.btnSwi = true;
        }
        else if(this.nameCursorCol < -1){
          this.nameCursorCol = this.cTable.length - 1;
          return ;
        }
        if(this.nameCursorRow > 14 && this.nameCursorRow % 2 == 1){
          this.nameCursorRow = 10;
        }
        else if(this.nameCursorRow > 14 && this.nameCursorRow % 2 == 0){
          this.nameCursorRow = 4;
        }
      }
      // 오른쪽
      else if(e.keyCode == 39){
        this.nameCursorRow++;
        if(this.nameCursorRow >= this.cTable[0].length){
          this.nameCursorRow = 0;
        }
      }
      //  아래로
      else if(e.keyCode == 40){

        this.nameCursorCol++;
        this.btnSwi = false;

        if(this.nameCursorCol == this.cTable.length){
          this.btnSwi = true;
        }
        else if(this.nameCursorCol >= this.cTable.length+1){
          this.nameCursorCol= 0;
          return ;
        }
        if(this.nameCursorRow > 14 && this.nameCursorRow % 2 == 1){
          this.nameCursorRow = 10;
        }
        else if(this.nameCursorRow > 14 && this.nameCursorRow % 2 == 0){
          this.nameCursorRow = 4;
        }

      }

      // 스페이스
      else if(e.keyCode == 32){
        if(this.btnSwi){
          // del
          if(this.nameCursorRow%2 == 1){
            this.DeleteName();
          }
          // confirm
          else{
            this.SetNameConfirm();
          }
          return ;
        }
        if(this.cTable[this.nameCursorCol][this.nameCursorRow] == ' ')return ;

        let charnum = this.cTable[this.nameCursorCol][this.nameCursorRow].charCodeAt(0);

        let type;
        if(charnum >= 48 && charnum <= 57){
          type = 'number';
        }else if(charnum >= 65 && charnum <= 122){
          type = 'alpha'
        }else{
          type = 'korean'
        }

        // alert(type)
        this.SelectWord(this.cTable[this.nameCursorCol][this.nameCursorRow], type)
      }

    },

    SelectWord:function(word,type){
      //초성 중성 종성일 때

      let charnum = word.charCodeAt(0);
      let chartype = '';

      // aa = aa.substr(0, aa.length -1);
      // alert(charnum)
      // alert(word)
      if(type == 'korean'){
        // 자음
        if(charnum < 12623){
          // 종성
          if(this.nameCho != '' && this.nameJung != '' && this.nameJong == ''){
            if(word == 'ㅉ' || word == 'ㅃ' || word == 'ㄸ' || word == 'ㄲ' || word == 'ㅆ' ){
              chartype = '초성'
            }
            else{
              chartype = '종성'
            }
          }
          // 종성
          else{
            chartype = '초성'
          }
        }
        // 모음 & 중성
        else{
          chartype = '중성'
        }

        // alert(charnum + ' : ' + chartype )

        //1. 초성일 경우
        if(chartype == '초성'){
          if(this.nameCho != '')this.nameCursor++;
          this.$set(this.nameChar, this.nameCursor, word);
          this.nameCho = word;
          this.nameJong = ''
          this.nameJung = ''
        }

        //2. 중성일 경우
        else if(chartype == '중성'){

          //2-1. 종성이 있을 경우 => 종성을 초성this.nameChar += 으로 바꾸고 그 초성에 중성을 더함

          if(this.nameJong != ''){


            let preval = String.fromCharCode(44032 + (this.cCho[this.nameCho]-1) * 588 + (this.cJung[this.nameJung]-1)*28);
            this.$set(this.nameChar, this.nameCursor, preval);
            this.nameJung = word;
            this.nameCursor++;
            this.nameCho = this.nameJong;

            let nextval = String.fromCharCode(44032 + (this.cCho[this.nameCho]-1) * 588 + (this.cJung[word]-1)*28);
            this.$set(this.nameChar, this.nameCursor, nextval);

            this.nameJong = '';

          }
          //2-2. 종성이 없을 경우
          else{
            //2-2-0. 이미 앞에 초성, 중성이 있을 경우
            if(this.nameCho != ''){
              if(this.nameJung != ''){
                this.nameCursor++;
                this.$set(this.nameChar, this.nameCursor, word);
                this.nameCursor++;
                this.nameCho=''
                this.nameJung=''

              }else{
                this.$set(this.nameChar, this.nameCursor, String.fromCharCode(44032 + (this.cCho[this.nameCho]-1) * 588 + (this.cJung[word]-1)*28));
                this.nameJung = word;
              }
            }
            //2-2-2. 초성이 없을 경우
            else{
              this.$set(this.nameChar, this.nameCursor, word);
              this.nameCursor++;
            }
          }
        }
        // 3. 종성일 경우
        else{
          //종성 그냥 일반적인 경우만 할 생각, 추후에 수정을 할 수 도 있으나 그럴 거 같지는 않음
          this.$set(this.nameChar, this.nameCursor, String.fromCharCode(44032 + (this.cCho[this.nameCho]-1) * 588 + (this.cJung[this.nameJung]-1)*28 + (this.cJong[word]-1) ));
          this.nameJong = word;
        }

      }
      //한글이 아닐 경우
      else{
        if(this.nameCho != ''){
            this.nameCursor++;
        }
        this.$set(this.nameChar, this.nameCursor, word);
        this.nameCursor++;
        this.nameCho = '';
        this.nameJung = '';
        this.nameJong = '';
        return ;
      }
    },
    //
    SetFadeOutTableFalse:function(){
      for( var index = 1 ; index <= 10; index++){
        for(var jndex = 1; jndex <= 10; jndex++){
          // this.fadeOutTable[index*10 + jndex - 10] = false;
          this.$set(this.fadeOutTable, index*10 + jndex - 10, false);
        }
      }
    },
    // 정정버튼
    DeleteName:function(){
      //만약 현재 커서에 없을 경우 커서를 내리고 이전을 전부 제거
      if(this.nameChar[this.nameCursor] == '?'){
        this.$set(this.nameChar, --this.nameCursor, '?');
      }

      //만약 아닐 경우 해당 커서만 바꿈.
      else{
        this.$set(this.nameChar, this.nameCursor, '?');
      }
      this.nameCho = '';
      this.nameJung = '';
      this.nameJong = '';
    },

    // 이름 윈도우에서 결정을 했을 때
    SetNameConfirm:function(){
      // 이름
      let name=' ';

      for(var index = 0; index < this.nameChar.length; index++){
        if(this.nameChar[index] == '?')continue
        name+= this.nameChar[index];
      }
      this.name = name;
      this.scriptSwi = true;
      this.nameWindowSwi = false;
      window.removeEventListener('keyup', this.CursorMove);
      this.ScriptProceeding();
    },

    // yes or no functions
    YesOrNoPointer:function(e){
      if(!this.yesWindow)return;
      if(e.keyCode == 40 || e.keyCode == 38){
          this.yesnoswi = !this.yesnoswi;
      }
      // 선택
      if(e.keyCode == 32 ){
        this.yesWindow= false;

        // 예 선택
        if(this.yesnoswi){
          //이름 저장
          this.setCurrentUserName(this.name);

          // Script 진행
          if(this.name == '루겁'){
            // Hidden Page로 이동

          }else{
            // 진행
            this.ScriptProceeding();
          }
        }
        // 아니오 선택
        else{
          // 다시 아이디 선택 창으로.
          this.nameChar = ['?','?','?','?','?','?','?','?','?'];
          this.nameCursor = 0;
          this.nameCho = '';
          this.nameJung = '';
          this.nameJong = '';

          //ScriptCnt를 앞으로 돌려서 창이나오게 하기
          this.scriptCnt = this.nameSetCnt-2;
          this.ScriptProceeding();
        }
      }
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

.TimeWindow{
  width:100%;
  height:100%;
  background-color: black;
}

.OakWindow{
  width:70% !important;
  height:100%;
  background-color: white;
  transition:all ease-in-out 3s;
}

.OakBlind{
  background-color: black !important;
}

.OakTransparent{
  opacity:0 !important;
}

.OakWindowGrid{
  height:100%;
}

.top-space{
  width:100%;
  height:15%
}

.press-space{
  font-size:2em;
}

.OakProfessor{
  height:55%;
}

.OakProfessor-img{
  opacity:1;
  width:25%;
  background-image:url('../../image/professor-oak.png');
  background-size: 70% 120%;
  background-position:center;
  transition:all ease-in-out 3s;
}

.bottom-space{
  width:100%;
  height:3%;
}

.Oak-script{
  width:100%;
  height:27%;
  background-image:url('../../image/oak-script.png');
  background-size:100% 100%;
  background-position:center;
  padding:30px;
  padding-left: 50px;
  padding-right: 35px;
  font-size: 2em;
  text-align: left;
}

.blink {
    -webkit-animation: blink 2s linear infinite;
}

@-webkit-keyframes blink {
    0% { color: black; }
    25% {color: white; }
    50% { color: black; }
    75% {color: white; }
    100% { color: black; }
/*    from { background-color: red;}
    to {background-color: green;}  */
}

.pointerbackground{

  position:absolute;
  background-color:white;
  bottom:5.5%;
  right:23%;
  width:5%;
  height:5%;
  background-position: center;
}

.nextpointer{
  -webkit-animation: imageblink 0.7s linear infinite;
  background-image: url('../../image/triangle.png');
  background-size:70% 70%;
  width:100%;
  height:100%;
  background-position: center;
}

@-webkit-keyframes imageblink {
  0% {
    opacity: 1;
  }
  25%{
    opacity:1;
  }
  50% {
    opacity: 0;
  }
  75%{
    opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

.set-name-window{
  background-color: blue;
  opacity:0.4;
  position:absolute;
  width:64%;
  height:92%;
  left:17.5%;
  top:4%;
  opacity:0;
  transition:all 0.5s ease-in-out;
  font-size:1.5em;
}

.set-name-input{
  background-color:green;
  height:70%;
}

.set-name-table{
  font-size:1.5em;
  height:100%;
}

.set-name-box{
  border: 2px solid rgba(0, 0, 0, 0);
}

.set-name-cursor-border{
  border: 2px solid rgba(0, 0, 0, 0);
}

.set-name-cursor{
  -webkit-animation: cursorblink 0.5s linear infinite;
}

@-webkit-keyframes cursorblink {
  0% {
    border: 2px solid rgba(0, 0, 0, 1);
  }
  50% {
    border: 2px solid rgba(0, 0, 0, 0);
  }
  100% {
    border: 2px solid rgba(0, 0, 0, 1);
  }
}

.set-name-td{
  border: 2px solid rgba(0, 0, 0, 0);
  width:10%;
  height:100%;
}

.set-name-td-under{
  border-bottom: 2px solid black;
}

.set-name-td-blink{
  -webkit-animation: underlineblink 0.5s linear infinite;
}

.set-name-td-transparent{
  color: rgba(0, 0, 0, 0);
}

@-webkit-keyframes underlineblink{
  0% {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
  50% {
    border-bottom: 2px solid rgba(0, 0, 0, 0);
  }
  100% {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
}

.yes-or-no{
  font-size:1.5em;
  padding:5%;
  width:100%;
  height:30%;
  margin-right:2%;
  background-image: url('../../image/short-script.png');
  background-size:100% 100%;
  background-position: center;
}

.yespointer{
  width:50%;
  height:50%;
  transform: rotate(-90deg);
}

.yes-or-no-pointer{
  -webkit-animation: imageblink 0.7s linear infinite;
  background-image: url('../../image/triangle.png');
  background-size: 100% 70%;
  background-position: center;
}

// name window
.name-window-on{
  opacity:1 !important;
}

.OakTimeEndBlink{
  -webkit-animation: backgroundblink 0.5s linear infinite;
}

.OakTimeEndFadeOut{
  background-color: black !important;
}

.fade-out-window{
  color:rgba(0,0,0,0);
  background-color:rgba(0,0,0,0);
  opacity:1;
  position:absolute;
  width:100%;
  height:100%;
  left:0%;
  top:0%;
  font-size:1.5em;
  transition: none;
}


@-webkit-keyframes backgroundblink {
  0% {
    opacity: 1;
  }
  25%{
    opacity:1;
  }
  50% {
    opacity: 0;
  }
  75%{
    opacity: 0;
  }
  100% {
      opacity: 1;
  }
}


</style>
