<template>
  <n-modal v-if="render.main" v-model:show="render.main" :mask-closable="false">
    <n-spin size="large"></n-spin
  ></n-modal>
  <div v-else class="page-content">
    <n-layout has-sider v-if="userData">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed="collapsed"
        :collapsed-width="collapsed ? '.5em' : '6em'"
        show-trigger
        @expand="collapsed = false"
        :on-update:collapsed="onUpdateCollapsed"
      >
        <n-card v-if="!collapsed">
          <template #header>
            <n-space horizontal align="center">
              <n-avatar
                class="user__avatar"
                size="large"
                round
                :style="{backgroundColor: '#ee4540'}"
              >
                <span>{{ userData.sub.slice(0, 2) }}</span>
              </n-avatar>
              <div class="info-user-container">
                <span class="profile_username">{{
                  userData ? userData.sub : ''
                }}</span>
              </div>
            </n-space>
          </template>
          <div
            class="progress-container"
            v-for="profession in arrays.professions"
            :key="profession"
          >
            <span class="font-bold">{{ profession }}</span>
            <n-progress
              class="user-progress-container"
              type="line"
              :percentage="sidebar.userInfo.progress"
            >
            </n-progress>
          </div>
        </n-card>
      </n-layout-sider>
      <n-layout>
        <n-layout-header> </n-layout-header>

        <n-layout-content class="user-profile-content-container">
          <n-spin
            :show="!content.isPlayGame"
            :rotate="false"
            @click="onClickGame"
          >
            <UnityGame></UnityGame>
            <template #icon>
              <icon-play></icon-play>
            </template>
          </n-spin>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

import TokenService from '@/services/token.service';
import {extractJWT, logR} from '@/services/utils';
import {NAvatar} from 'naive-ui';

import {API_URL} from '@/api/main';

import UnityGame from '@/views/UnityGame.vue';

export default defineComponent({
  components: {
    'n-avatar': NAvatar,
    UnityGame,
  },
  data() {
    return {
      API_URL,
      render: {main: true},
      userData: null,
      onTextHover: {},
      collapsed: false,
      sidebar: {
        active: false,
        rows: [],
        userInfo: {progress: 0},
      },
      content: {
        isPlayGame: false,
      },
      forms: {},
      arrays: {
        fileList: [],
        stories: [],
        idsImagesStories: [],
      },
      dicts: {},
    };
  },

  computed: {
    tokenUser() {
      return this.$store.state.auth.tokenUser;
    },
  },
  async created() {
    // TODO: Подгрузка историй с бека
    logR('warn', 'USER.PROFILE: created');
    this.render.main = true;
    const tokenObject = TokenService.getToken();
    this.userData = extractJWT(tokenObject.token);
    this.arrays.professions = ['техник', 'системный администратор', 'дизайнер'];

    this.render.main = false;
  },

  methods: {
    clearSuccessForm() {
      this.forms.isSuccess.active = false;
      this.forms.isSuccess.message = '';
    },
    onClickGame() {
      logR('wran', 'onClickGame');
      this.collapsed = true;
      this.content.isPlayGame = true;
    },
    onUpdateCollapsed(isCollapsed) {
      logR('warn', 'onUpdateCollapsed');
      console.log(isCollapsed);
      if (!isCollapsed) {
        this.content.isPlayGame = false;
      }
      this.collapsed = isCollapsed;
    },
  },
});
</script>
