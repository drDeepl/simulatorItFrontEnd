<template>
  <div>
    <VueUnity :unity="unityContext" width="800" height="600" />
  </div>
</template>

<script setup>
import UnityWebgl from 'unity-webgl';
import VueUnity from 'unity-webgl/vue';

const unityContext = new UnityWebgl({
  loaderUrl: '/Build/rofltest.loader.js',
  dataUrl: '/Build/rofltest.data',
  frameworkUrl: '/Build/rofltest.framework.js',
  codeUrl: '/Build/rofltest.wasm',
});

unityContext.on('device', () => alert('click device ...'));
</script>
