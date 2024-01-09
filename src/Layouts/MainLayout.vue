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
            “Симулятор IT профессий” - уникальный виртуальный симулятор, который
            позволяет вам погрузиться в мир информационных технологий и
            развивать свои профессиональные навыки в безопасной и интересной
            среде. Пройдите реалистичные задания в трех основных IT-профессиях:
            техника, веб-дизайнера и системного администратора, взаимодействуйте
            с виртуальными коллегами и преподавателями, и получите практическую
            подготовку в безопасной среде. “Симулятор IT профессий” - это
            доступная платформа для знакомства с разнообразными IT-профессиями,
            которая поможет вам определиться с выбором карьеры и развить
            необходимые навыки. Не упустите возможность стать экспертом в
            IT-сфере!
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
        <!-- v-model:show="isPlayGame"  -->
        <n-modal :show="isPlayGame" :mask-closable="false">
          <UnityGame :onClickCloseGame="onClickCloseGame" />
        </n-modal>
      </div>
    </div>
    <div class="marquee-container">
      <div class="marquee">
        <span
          v-for="profLabel in [
            '⭐',
            'техник',
            '⭐',
            'веб-дизайнер',
            '⭐',
            'системный администратор',
            '⭐',
          ]"
          :key="profLabel"
          >{{ profLabel }}
        </span>
      </div>
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
