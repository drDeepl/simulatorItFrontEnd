<script setup>
import UnityWebgl from 'unity-webgl';
import UnityVue from 'unity-webgl/vue';
import {ref, defineProps} from 'vue';

const props = defineProps(['onClickCloseGame']);
const isRender = ref(true);
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

const onClickShareWindow = () => {
  unityContext.setFullscreen(true);
};
</script>

<template>
  <n-card title=" ">
    <template #header-extra>
      <n-button
        v-if="!isRender"
        icon
        quaternary
        circle
        text
        color="black"
        @click="onClickShareWindow"
      >
        <n-icon size="48">
          <icon-resize />
        </n-icon>
      </n-button>
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
      <n-spin v-if="isRender"></n-spin>
      <div class="unity-game-container" v-show="!isRender">
        <UnityVue style="width: 90vw" :unity="unityContext" />
      </div>
    </n-space>
  </n-card>
</template>
