<script setup>
import UnityWebgl from 'unity-webgl';
import UnityVue from 'unity-webgl/vue';
import {ref, defineProps} from 'vue';

const props = defineProps(['onClickCloseGame']);
const isRender = ref(true);
const isGameLoad = ref(true);
const progress = ref(0);
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
    isGameLoad.value = false;
  }
});
const onClickShareWindow = () => {
  unityContext.setFullscreen(true);
};
</script>

<template>
  <div>
    <n-space vertical>
      <!-- :style="isGameLoad ? 'width: 30vw' : 'width: 100%'" -->
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
            <n-icon size="48">
              <icon-close />
            </n-icon>
          </n-button>
        </template>
        <n-space justify="center" align="center" vertical>
          <!-- <n-spin v-if="isRender"></n-spin> -->
          <n-progress
            style="width: 40em"
            v-if="isGameLoad"
            type="line"
            :percentage="progress"
            :height="24"
            :indicator-placement="'inside'"
            processing
          />
          <n-spin
            :show="!isGameLoad"
            @click="onClickShareWindow"
            :rotate="false"
            color="red"
          >
            <div class="unity-game-container" v-show="!isGameLoad">
              <UnityVue style="width: 90vw" :unity="unityContext" />
            </div>
            <template #icon>
              <n-icon
                size="64"
                color="black"
                style="cursor: pointer"
                class="icon-animate-hb"
              >
                <icon-play />
              </n-icon>
            </template>
          </n-spin>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
