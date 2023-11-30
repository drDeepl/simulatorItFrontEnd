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
        @collapse="collapsed = true"
        @expand="collapsed = false"
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
          <span class="font-bold">Пройдено</span>
          <n-progress
            class="user-progress-container"
            type="line"
            :percentage="sidebar.userInfo.progress"
          ></n-progress>

          <div
            class="profile-sidebar-link"
            v-for="row in sidebar.rows"
            :key="row.id"
            @click="onClickToLink(row.url)"
            @mouseover="onTextHover[row.url] = true"
            @mouseleave="onTextHover[row.url] = false"
          >
            <span class="profile-sidebar-row-border"></span>
            <span
              :class="`profile-sidebar-row-text ${
                onTextHover[row.url] ? 'font-red' : ''
              }`"
            >
              {{ row.title }}
            </span>
          </div>
        </n-card>
      </n-layout-sider>
      <n-layout>
        <n-layout-header class="img-header-profile container-header-profile">
        </n-layout-header>

        <n-layout-content class="user-profile-content-container">
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script type="text/javascript">
import {defineComponent} from 'vue';

import {NAvatar} from 'naive-ui';
import UserStats from '@/models/model.user.stats';
import {logR, extractJWT} from '@/services/utils';
import TokenService from '@/services/token.service';

import {API_URL} from '@/api/main';

export default defineComponent({
  components: {
    'n-avatar': NAvatar,
  },
  data() {
    return {
      API_URL,
      userData: null,
      onTextHover: {},
      collapsed: false,
      sidebar: {
        active: false,
        rows: [],
        userInfo: {progress: 0},
      },
      render: {main: false},
      states: {delete: {story: false}},
      currentStoryId: null,
      currentStoryHasImg: false,
      storiesBlock: {
        render: false,
        countPage: 1,
        currentPage: 1,
        countStoriesPage: 4,
      },
      storyStats: {
        render: false,
        selectedStats: 'Прохождение',
        selectedStatsStory: [],
        currentStoryStats: {},
      },
      forms: {
        createStory: {active: false, model: {}},
        updateStory: {active: false, model: {}, selectedStory: {}},
        isSuccess: {active: false, message: ''},
        showStats: {active: false, model: new UserStats()},
      },
      // INFO: Блок со статистикой===============
      statsBlock: {
        active: false,
        chart: null,
        state: {createChart: false, clearChart: false},
        labels: [],
        datasets: [
          {
            label: 'Распределение баллов по историям',
            data: [],
            borderWidth: 1,
          },
        ],
      },
      // INFO: =================================
      arrays: {
        fileList: [],
        stories: [],
        idsImagesStories: [],
      },
      dicts: {
        stories: {},
        stats: {},
      },
    };
  },

  computed: {
    accessToken() {
      return 'Bearer ' + this.$store.state.auth.tokenUser.accessToken;
    },
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

    this.render.main = false;
  },

  methods: {
    clearSuccessForm() {
      this.forms.isSuccess.active = false;
      this.forms.isSuccess.message = '';
    },
  },
});
</script>
