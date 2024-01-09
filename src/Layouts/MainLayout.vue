<template>
  <div class="main-container">
    <n-navbar>
      <div class="nav-container">
        <div class="nav-block-container btn-home"></div>
        <div class="navbar-menu">
          <p class="navbar-preview-text">СИМУЛЯТОР IT ПРОФЕССИЙ</p>
        </div>
        <div class="nav-block-container">
          <!-- <n-space justify="space-around"> -->
          <!-- <n-button
            class="nav-bar-btn"
            quaternary
            round
            @click="onClickToHomePage"
            >на главную</n-button
          > -->
        </div>
      </div>
    </n-navbar>
    <div class="main-content">
      <div
        v-if="$router.currentRoute.value.name == 'home'"
        class="main-preview-layout"
      >
        <div class="preview-description">
          <p>
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur?
          </p>
          <!-- <n-space justify="end"> </n-space> -->
        </div>

        <div class="preview-container">
          <img
            class="preview-img"
            :src="require('../assets/img/preview_img.png')"
          />

          <n-button class="preview-btn" @click="onClickToPlayGame"
            >Играть</n-button
          >
        </div>
        <n-modal
          v-model:show="isPlayGame"
          v-if="isPlayGame"
          :mask-closable="false"
        >
          <UnityGame
            :isActiveModal="isPlayGame"
            :onClickCloseGame="onClickCloseGame"
          />
        </n-modal>
      </div>
      <router-view> </router-view>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";

import NavbarVertical from "@/components/NavbarVertical.vue";
// import { NAvatar } from 'naive-ui';

import {logR } from '@/services/utils';




import UnityGame from "@/components/UnityGame.vue";


import { useMessage } from 'naive-ui';


export default defineComponent( {
  components: { "n-navbar": NavbarVertical, UnityGame},
  async created() {
    logR('warn', "MAINLAYOUT: created");
    this.render.main = true;


    this.render.main = false;
  },
  data(){

    return{
      isPlayGame: false,
      userData: {},
      message: useMessage(),
      isMenuActive: false,
      userIsLogIn:false,
      redirectAfterLogIn: '',
      render: {main: false},

    }
  },
    methods: {
      onClickToPlayGame(){
        this.isPlayGame = true;
      },

      onClickCloseGame(){
        this.isPlayGame = false
      },




  },


});
</script>
