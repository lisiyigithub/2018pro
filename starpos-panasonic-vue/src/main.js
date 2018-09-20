// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'vue-ydui/dist/ydui.base.css';
import './utils/flexible.js';
import './sass/main.scss';
import {
  Button,
  ButtonGroup
} from 'vue-ydui/dist/lib.px/button';
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);

import {
  NavBar,
  NavBarBackIcon,
  NavBarNextIcon
} from 'vue-ydui/dist/lib.px/navbar';
Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);

//import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
import {
  CellGroup,
  CellItem
} from 'vue-ydui/dist/lib.px/cell';

Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);

import {
  DateTime
} from 'vue-ydui/dist/lib.px/datetime';

Vue.component(DateTime.name, DateTime);
import {
  CitySelect
} from 'vue-ydui/dist/lib.px/cityselect';

Vue.component(CitySelect.name, CitySelect);

import {
  ActionSheet
} from 'vue-ydui/dist/lib.px/actionsheet';

Vue.component(ActionSheet.name, ActionSheet);
import {
  Confirm,
  Alert,
  Toast,
  Notify,
  Loading
} from 'vue-ydui/dist/lib.px/dialog';
import {Input} from 'vue-ydui/dist/lib.px/input'; 

Vue.component(Input.name, Input);
import {Popup} from 'vue-ydui/dist/lib.px/popup';

Vue.component(Popup.name, Popup);

import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox';

Vue.component(CheckBox.name, CheckBox);
Vue.component(CheckBoxGroup.name, CheckBoxGroup);
Vue.config.productionTip = false
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'


Vue.use(MuseUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading,
};