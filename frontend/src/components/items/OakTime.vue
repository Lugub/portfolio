<!-- 영화 검색 페이지 -->
<template>
  <v-container grid-list-md text-center class="goldfont TimeWindow">
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
              Check
              currentScript : {{ currentScript }}<br>
              ScriptCnt : {{ scriptCnt }}<br>
              ScriptLoadingSwi :  {{ scriptLoadingSwi }}<br>
              currentScriptCnt : {{currentScriptCnt}}<br>
              nameWindowSwi : {{nameWindowSwi}}<br>
              doctorScript : {{doctorScript[scriptCnt]}}<br>
              scriptSwi : {{scriptSwi}}<br>
            </v-flex>
            <v-col justify="center" align="center" style="width:auto; height:100%;">

              <v-row class="yes-or-no" v-if="yeswindow">
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
              <v-flex>
                이름 :
              </v-flex>
              <v-flex>
                {{ nameChar }}
              </v-flex>
            </v-row>
          </v-col>
          <v-spacer/>
        </v-row>
        <v-flex class="set-name-input">
          <table class="set-name-table">
            <tr v-for="(line,index) in cTable" >
              <td v-for="(item,id) in line" class="set-name-box" :class="{'set-name-cursor': setBorder(index,id)}">
                {{item}}
              </td>
            </tr>
          </table>
        </v-flex>
        <v-row style="background-color:grey; height:10%; width:95%;" justify="center" align="center">
          <v-spacer/>
          <v-flex :class="{'set-name-cursor': setBtnBorder(nameCursorCol, nameCursorCol)}">
            정정
          </v-flex>
          <v-spacer/>
          <v-flex :class="{'set-name-cursor': setBtnBorder(nameCursorCol, nameCursorCol)}">
            결정
          </v-flex>
          <v-spacer/>

        </v-row>
      </v-col>
    </v-layout>

  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {

  },
  mounted:function(){
    this.SetCurrentTime();
    window.addEventListener('keyup', this.ScriptControll)
    window.addEventListener('keyup', this.YesOrNoPointer)
  },
  data: () => ({
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
    timecnt:2,
    seosoncnt:3,
    namesetcnt:14,
    namecheckcnt:15,
    endcnt:20,
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
    scriptCnt:12,
    currentScriptCnt:0,
    scriptProceeder:null,

    // switches
    scriptLoadingSwi:true,
    scriptNextSwi:false,
    scriptSwi:true,
    blackSwi:true,

    //yes or no
    yeswindow:false,
    yesnoswi:true,

    //set name
    nameChar:'',
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
    //HiddenName
    hiddenName:[
      '루겁',
    ],

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
            , 'ㅎ':28}
  }),
  watch:{
    currentScriptCnt:function(val){
      if(val+1 >= this.doctorScript[this.scriptCnt].length){
        this.ScriptStop();
      }
      this.currentScript += ( this.doctorScript[this.scriptCnt][val] == undefined ) ? '' : this.doctorScript[this.scriptCnt][val];
    },
  },
  methods:{
    ...mapActions("data", ["searchMovies","setCurrentTime","setCurrentUserName"]),
    // space눌렀을 때
    ScriptControll:function(e){
      // alert("space Pressed");
      if(e.keyCode != 32)return;
      if(!this.scriptSwi)return;
      if(this.yeswindow)return;
      if(this.scriptLoadingSwi){
          // alert("Ok Next Script")
          this.currentScript='';
          this.scriptLoadingSwi=false;
          this.ScriptProceeding();
      }
    },


    ScriptProceeding:function(){
      // alert("ScriptProceeding!!!")
      this.currentScriptCnt = 0;
      this.scriptCnt++;
      //fade in 해야 함.
      if(this.scriptCnt == this.seosoncnt+1 ){
        this.scriptSwi = false;
        this.setOpacitySwi = true;
        this.FadeOut();

      }
      // name 설정
      else if(this.scriptCnt == this.namesetcnt){
        //Script 내려주고
        this.scriptSwi = false;
        this.nameWindowSwi = true;
        window.addEventListener('keyup', this.CursorMove);
      }
      //name 재차 확인
      else if(this.scriptCnt == this.namecheckcnt){
        alert("이름 제차 확인");
        this.doctorScript[this.namecheckcnt] = this.name + " 이(가) 맞습니까?";
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
    },

    FadeOutBlack:function(){
      this.blackSwi = false;
    },

    ScriptDown:function(){
      this.currentScriptCnt++;
    },

    //script 중단, 스페이스누를때까지 대기상태
    ScriptStop:function(){
      // alert("ScriptStop!!!")
      clearInterval(this.scriptProceeder);
      this.scriptProceeder = null;
      this.scriptLoadingSwi = true;

      if(this.scriptCnt == this.namecheckcnt){

        this.scriptLoadingSwi = false;
        this.yeswindow = true;

      }

    },

    SetCurrentTime:function(){
      let time = new Date();

      this.setCurrentTime(time);

      let Year = time.getFullYear();
      let Month = time.getMonth();
      let Hour = time.getHours();
      let Day = time.getDate();

      this.doctorScript[this.timecnt] = " 현재 시각 " + Year + "년 " + (Month+1) + "월 " + (Day) + "일 " + Hour + "시..  ";

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
      this.doctorScript[this.seosoncnt] = this.seosonment[Month] + ", " + hourment + '\n' + "  방문해 주셨습니다...   ";

    },

    // name window functions
    setBorder:function(col,row){
      if(this.nameCursorCol == col && this.nameCursorRow == row){
        return true;
      }
      return false;
    },

    //
    setBtnBorder:function(col, row){

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

        if(this.nameCursorCol < -1){
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
        if(this.nameCursorCol >= this.cTable.length){
          this.nameCursorCol=0;
        }

      }

      // 스페이스
      else if(e.keyCode == 32){
        if(this.cTable[this.nameCursorCol][this.nameCursorRow] == ' ')return ;
        if(this.nameChar.length > 10){
          // 결정 버튼 위치로
          return ;
        }
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
        // 초성
        if(charnum < 12623){
          if(this.nameCho == ''){
            chartype = '초성'
          }
          // 종성
          else{
            chartype = '종성'
          }
        }
        // 중성
        else{
          chartype = '중성'
        }

        alert(charnum + ' : ' + chartype )

        //1. 초성일 경우
        if(chartype == '초성'){
          this.nameChar += word;
          this.nameCho = word;
        }

        //2. 중성일 경우
        else if(chartype == '중성'){
          //2-1. 종성이 있을 경우 => 종성을 초성this.nameChar += 으로 바꾸고 그 초성에 중성을 더함
          if(this.nameJong != ''){

          }
          //2-2. 종성이 없을 경우
          else{
            //2-2-1. 초성이 있을 경우
            if(this.nameCho != ''){
              this.nameChar = this.nameChar.substr(0,this.nameChar.length-1)
              this.nameJung = word;
              alert(this.nameCho + " " + this.cCho[this.nameCho] )
              alert(word + " " + this.cJung[word])

              this.nameChar += String.fromCharCode(44032 + (this.cCho[this.nameCho]-1) * 588 + (this.cJung[word]-1)*28)
            }
            //2-2-2. 초성이 없을 경우
            else{
              this.nameChar += word;
            }
          }
        }
        // 3. 종성일 경우
        else{

        }

      }
      //한글이 아닐 경우
      else{
        this.nameChar += word;
        this.nameCho = '';
        this.nameJung = '';
        this.nameJong = '';
      }
    },

    DeleteName:function(){

    },

    //
    SetNameConfirm:function(){

      window.removeEventListener('keyup', this.CursorMove);
    },

    // yes or no functions
    YesOrNoPointer:function(e){
      if(!this.yeswindow)return;
      if(e.keyCode == 40 || e.keyCode == 38){
          this.yesnoswi = !this.yesnoswi;
      }
      // 선택
      if(e.keyCode == 32 ){
        this.yeswindow= false;

        // 예 선택
        if(this.yesnoswi){
          //이름 저장
          let name = '';
          for(var i = 0; i < this.nameChar.length; i++){
              name += this.nameChar[i];
          }
          this.setCurrentUserName(name);

          // Script 진행
          if(name == '루겁'){
            // Hidden Page로 이동

          }else{
            // 진행

          }
        }
        // 아니오 선택
        else{
          // 다시 아이디 선택 창으로.
          this.nameChar = [];
          this.nameCursor = 0;
          this.nameCho = '';
          this.nameJung = '';
          this.nameJong = '';

          //ScriptCnt를 앞으로 돌려서 창이나오게 하기
          this.scriptCnt = this.namesetcnt;
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

</style>
