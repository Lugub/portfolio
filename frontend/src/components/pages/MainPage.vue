<template>
  <v-flex shrink>
    <v-row justify="center" align="center">
      <v-col>
        <v-flex>
          <span class="display-3 grey--text">Title</span>
        </v-flex>
        <v-flex>
          <v-btn @click="goTo('portfolio')">시작하기</v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="goTo('intro')">스킵하기</v-btn>
        </v-flex>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>

export default {
  methods: {
    goTo: function(path) {
      this.$router.push({ name: path });
    },
    goBack:function(){
      this.$router.go(1);
    }
  }
}
</script>

<style lang="scss" scoped>



</style>
