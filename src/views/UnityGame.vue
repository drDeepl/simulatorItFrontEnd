<script setup>
import UnityWebgl from 'unity-webgl';
import UnityVue from 'unity-webgl/vue';
import {ref, defineProps} from 'vue';

const props = defineProps(['onClickCloseGame']);
const isRender = ref(true);
const isGameLoading = ref(true);
const progress = ref(0);
const stepLoad = ref(0);
const unityContext = new UnityWebgl({
  loaderUrl: 'unity/build/simulator_it_build.loader.js',
  dataUrl: 'unity/build/simulator_it_build.data',
  frameworkUrl: 'unity/build/simulator_it_build.framework.js',
  codeUrl: 'unity/build/simulator_it_build.wasm',
});

unityContext.on('device', () => alert('click device ...'));
unityContext.on('mounted', () => {
  isRender.value = false;
});
unityContext.on('progress', (number) => {
  progress.value = Math.round(number * 100);
  console.log(`progress ${progress.value}`);
  if (number == 1) {
    stepLoad.value += 1;
    if (stepLoad.value == 2) {
      isGameLoading.value = false;
      console.warn(stepLoad.value);
    }
  }
});
const onClickShareWindow = () => {
  unityContext.setFullscreen(true);
};
</script>

<template>
  <div>
    <n-space vertical>
      <!-- :style="isGameLoading ? 'width: 30vw' : 'width: 100%'" -->
      <n-card title=" ">
        <template #header-extra>
          <n-button
            icon
            quaternary
            circle
            color="red"
            text
            @click="props.onClickCloseGame"
          >
            <n-steps v-if="isGameLoading" :current="stepLoad + 1">
              <n-step title="Загружаю файлы игры.."></n-step>
              <n-step title="Отрисовываю интерфейс.."></n-step>
              <n-step title="Вперёд!"></n-step>
            </n-steps>

            <n-icon size="48">
              <icon-close />
            </n-icon>
          </n-button>
        </template>
        <n-space justify="center" align="center" vertical>
          <!-- <n-spin v-if="isRender"></n-spin> -->
          <n-progress
            style="width: 40em"
            v-if="stepLoad == 0"
            type="line"
            :percentage="progress"
            :height="24"
            :indicator-placement="'inside'"
            processing
          />

          <n-spin :show="stepLoad > 0" :rotate="false">
            <div class="unity-game-container" v-show="stepLoad > 0">
              <UnityVue style="width: 90vw" :unity="unityContext" />
            </div>
            <template #icon>
              <n-icon
                v-if="!isGameLoading"
                size="64"
                color="black"
                style="cursor: pointer"
                class="icon-animate-hb"
              >
                <icon-play @click="onClickShareWindow" />
              </n-icon>
              <n-icon v-else size="64" color="#2a8bd8" class="spin-animate">
                <icon-arrow-circle />
              </n-icon>
            </template>
          </n-spin>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
