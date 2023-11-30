<template>
  <div class="game-wrapper">
    <!-- <VueUnity :unity="unityContext" width="800" height="600" /> -->
    <n-spin v-if="render.main"></n-spin>
    <iframe
      v-else
      class="game-container"
      frameborder="0"
      src="https://itch.io/embed-upload/9207932?color=333333"
      allowfullscreen
    >
      <!-- <a href="https://khpi.itch.io/test">Play test on itch.io</a> -->
    </iframe>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {logR, extractJWT} from '@/services/utils';
import TokenService from '@/services/token.service';
export default defineComponent({
  data() {
    return {
      render: {
        main: true,
      },
      userData: null,
    };
  },
  async created() {
    // TODO: Подгрузка историй с бека
    logR('warn', 'UnityGame: created');
    this.render.main = true;
    const tokenObject = TokenService.getToken();
    if (tokenObject == null) {
      this.$router.push('/');
      return;
    }
    console.log(tokenObject);
    const userData = extractJWT(tokenObject.token);
    console.error(userData);

    this.render.main = false;
  },
});
</script>
