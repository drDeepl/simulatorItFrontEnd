import router from '@/router/index';
import store from '@/store';
import {createApp} from 'vue';
import App from './App.vue';

import {
  Add16Filled,
  AddSquareMultiple16Filled,
  Delete16Regular,
  Dismiss28Regular,
  DoorArrowLeft24Regular,
  Edit16Regular,
  Info16Regular,
  IosArrowLtr24Regular,
  Person32Regular,
  PlayCircle48Regular,
  Triangle48Regular,
} from '@vicons/fluent';

import {IosResize} from '@vicons/ionicons4';
import './assets/main.scss';

import FormDialog from '@/components/FormDialog.vue';
import {
  NAlert,
  NBackTop,
  NButton,
  NCard,
  NCollapseTransition,
  NDataTable,
  NDialog,
  NDrawer,
  NDrawerContent,
  NFormItem,
  NIcon,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMessageProvider,
  NModal,
  NPopconfirm,
  NProgress,
  NScrollbar,
  NSelect,
  NSkeleton,
  NSpace,
  NSpin,
} from 'naive-ui';
const app = createApp(App);

app.component('n-message-provider', NMessageProvider);
app.component('n-back-top', NBackTop);
app.component('n-select', NSelect);
app.component('n-form-item', NFormItem);
app.component('n-collapse-transition', NCollapseTransition);
app.component('n-skeleton', NSkeleton);
app.component('icon-delete', Delete16Regular);
app.component('n-scrollbar', NScrollbar);
app.component('n-alert', NAlert);
app.component('n-dialog', NDialog);
app.component('n-icon', NIcon);
app.component('icon-arrow-left', IosArrowLtr24Regular);
app.component('icon-triangle-up', Triangle48Regular);
app.component('n-layout-header', NLayoutHeader);
app.component('n-layout-sider', NLayoutSider);
app.component('n-layout-content', NLayoutContent);
app.component('n-layout', NLayout);
app.component('n-popconfirm', NPopconfirm);
app.component('n-drawer-content', NDrawerContent);
app.component('n-drawer', NDrawer);
app.component('n-data-table', NDataTable);
app.component('n-input', NInput);
app.component('n-progress', NProgress);
app.component('n-card', NCard);
app.component('n-modal', NModal);
app.component('c-form', FormDialog);
app.component('n-spin', NSpin);
app.component('icon-edit', Edit16Regular);
app.component('icon-info', Info16Regular);
app.component('icon-close', Dismiss28Regular);
app.component('icon-add', AddSquareMultiple16Filled);
app.component('icon-add-plus', Add16Filled);
app.component('icon-play', PlayCircle48Regular);
app.component('icon-resize', IosResize);

app.component('n-space', NSpace);
app.component('n-button', NButton);
app.component('icon-avatar', Person32Regular);
app.component('icon-exit', DoorArrowLeft24Regular);

app.use(router);
app.use(store);
app.mount('#app');
