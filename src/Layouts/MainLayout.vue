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
          <n-button
            class="nav-bar-btn"
            quaternary
            round
            @click="onClickToHomePage"
            >на главную</n-button
          >
          <!-- <n-space v-if="userIsLogIn" justify="space-around">
              <n-button
                class="nav-bar-btn"
                circle
                quaternary
                @click="$router.push('/profile')"
              >
                <n-icon size="24"><icon-avatar /></n-icon>
              </n-button>

              <n-button
                class="nav-bar-btn"
                circle
                quaternary
                @click="onClickToExitProfile"
              >
                <n-icon size="24"><icon-exit /></n-icon>
              </n-button>
            </n-space>

            <n-button
              v-else
              class="nav-bar-btn"
              quaternary
              round
              @click="isMenuActive = true"
              >вход
            </n-button> -->
          <!-- </n-space> -->

          <n-drawer v-model:show="isMenuActive">
            <n-drawer-content>
              <n-space justify="space-between">
                <n-button
                  class="nav-bar-btn"
                  quaternary
                  round
                  @click="onClickLogIn"
                >
                  войти
                </n-button>
                <n-button
                  class="nav-bar-btn"
                  quaternary
                  round
                  @click="onClickRegister"
                >
                  зарегистрироваться
                </n-button>
              </n-space>
            </n-drawer-content>
          </n-drawer>
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
          <n-card title="Симулятор It">
            <template #header-extra>
              <n-button
                icon
                quaternary
                circle
                color="red"
                text
                @click="onClickCloseGame"
              >
                <n-icon size="48">
                  <icon-close />
                </n-icon>
              </n-button>
            </template>
            <UnityGame />
          </n-card>
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

import { extractJWT, logR } from '@/services/utils';

import TokenService from "@/services/token.service";
import UserService from "@/services/user.service";

import UserRegister from "@/models/model.user.register";
import UnityGame from "@/views/UnityGame.vue";


import { useMessage } from 'naive-ui';


export default defineComponent( {
  components: { "n-navbar": NavbarVertical, UnityGame},
  async created() {
    logR('warn', "MAINLAYOUT: created");
    this.render.main = true;
    let tokenUser = TokenService.getToken()
    console.log("TOKEN USER: ", tokenUser)
    // if(tokenUser){
    //   console.log("USERS TOKEN", tokenUser);
    //   const userData = extractJWT(tokenUser.token);
    //   // const expTime = userData.exp*1000;
    //   // const currentDateTime = new Date();
    //   // const differenceTime = expTime - currentDateTime;
    //   // console.log(`DIFFERENCE TIME: ${differenceTime}`)
    //   const accessTokenIsValid = isValidExpireTimeFromJWT(userData)
    //   if(accessTokenIsValid){
    //     this.userIsLogIn = true;
    //     this.userData = userData;

    //   }
    //   else{
    //     TokenService.removeUser();
    //     TokenService.removeToken();

    //   }


    // }
    console.log("END CREATED")
    const user = TokenService.getUser();
    this.$store.commit('auth/SET_DATA_LOGIN', user);
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
      onClickCancelErrorAlert() {
      this.alert.error.active = false;
      this.alert.error.message = '';
      this.$store.commit('notification/REMOVE_STATE_ERROR');
    },
    onClickCancelSuccessAlert(){
      this.$store.commit('notification/REMOVE_STATE_SUCCESS');

    },
      onClickToProfile(){
        this.$router.push("profile")
      },
      onClickAvatar() {
      logR('warn', 'NAVBAR: onClickAvatar');
      this.activateBlock.avatar = true;

    },
    onClickLogIn(redirectAfterLogIn) {
      logR('warn', 'NAVBAR: onClickLogIn');
      this.forms.logIn.active = true;
      console.log("REDIRECT", redirectAfterLogIn)
      if(typeof redirectAfterLogIn == 'string') {
        this.redirectAfterLogIn = redirectAfterLogIn;
      }
      else{
        this.redirectAfterLogIn = 'profile';
      }
    },

    onClickCancelLogIn() {
      logR('warn', 'NAVBAR: onClickCancelLogin');
      this.forms.logIn.active = false;
    },
    async onClickApplyLogIn(dataForm) {
      logR('warn', 'NAVBAR: onClickApplyLogIn\n');
      const response = await this.$store.dispatch("auth/login", dataForm);
      if(response.status==200){
        const parsedToken = extractJWT(response.data.token)
        this.message.success(`Привет, ${parsedToken.sub}`)
        this.userIsLogIn = true;

        if(this.redirectAfterLogIn.length>0){
          this.$router.push(this.redirectAfterLogIn)
          this.redirectAfterLogIn = ""
        }
        else{
          this.$router.push("profile")
        }
        this.setMenuActive(false)
        this.onClickCancelLogIn()
      }
      else{
        const msg = response.status == 401 ? "Неправильный логин или пароль" : "что-то пошло не так"
        this.$store.commit("notification/SET_ACTIVE_ERROR", msg);
      }
      // this.onClickCancelLogIn();
      return response;
    },

    onClickRegister() {
      logR('warn', 'onClickRegister');
      this.forms.register.active = true;
      this.forms.register.model = new UserRegister();

    },
    async onClickApplyRegister(dataForm) {
      logR('warn', 'NAVBAR: onCLickApplyRegister');
      console.log(dataForm);

      const response = await UserService.createUser({username:dataForm.username, password:dataForm.password})


      if(response.status == 200){
        console.log("STATUS: 200\n",dataForm);
        logR("warn", "response register")
        console.log(response.data)
        await this.onClickApplyLogIn(dataForm)
        this.message.success("Аккаунт успешно зарегистрирован!")
        this.setMenuActive(false)
        this.onClickCancelRegister()

      }
      else{
        this.$store.commit("notification/SET_ACTIVE_ERROR", response.message);
        console.log(this.alert.error)
      }

    },
    onClickCancelRegister() {
      logR('warn', 'NAVBAR: onClickCancelRegister');
      this.forms.register.active = false;
      this.forms.register.model = null;

    },

    setMenuActive(value){
      this.isMenuActive = value;
    },

    onClickToExitProfile(){
      logR('warn', 'MainLayout: onClickToExitProfile');
      this.render.main = true;
      TokenService.removeToken();
      TokenService.removeUser();
      this.userIsLogIn = false;
      this.$router.push({name: "home"});
      this.render.main = false;
    },
    onClickToHomePage(){
      logR("warn", "MainLayout: onClickToHomePage")
      this.$router.push({name: "home"});
    }

  },


});
</script>
