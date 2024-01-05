<script setup>
import UnityWebgl from 'unity-webgl';
import UnityVue from 'unity-webgl/vue';
import {ref} from 'vue';

const isRender = ref(true);
const unityContext = new UnityWebgl({
  loaderUrl: 'unity/build/simulator_it_build_dev.loader.js',
  dataUrl: 'unity/build/simulator_it_build_dev.data',
  frameworkUrl: 'unity/build/simulator_it_build_dev.framework.js',
  codeUrl: 'unity/build/simulator_it_build_dev.wasm',
});

unityContext.on('device', () => alert('click device ...'));
unityContext.on('mounted', () => {
  isRender.value = false;
});
</script>

<template>
  <n-space justify="center" align="center">
    <n-spin v-if="isRender"></n-spin>
    <div class="unity-game-container" v-show="!isRender">
      <UnityVue style="width: 90vw" :unity="unityContext" />
    </div>
  </n-space>
</template>
