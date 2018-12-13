import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './global/vueFilter';
import ProjectUtils from './global/ProjectUtils';
// 引入自己写的组件 start
import Button from './components/Button/index.js';
import SearchInput from "./components/searchInput/index.js";
import selectOption from "./components/selectOption/index";
import searchArea from './components/searchArea/index'
// import dateRange from './components/dateRange'
import ElSelectName from './global/ElSelectName';
import SearchInputConfig from './global/SearchInputConfig';
Vue.use(ElSelectName);
Vue.use(SearchInputConfig);
// Vue.component(DtButton.name, DtButton)
Vue.use(Button);
Vue.use(SearchInput);
Vue.use(selectOption);
Vue.use(searchArea);
// import install from './global/install';
// Vue.use(install);
// 引入自己写的组件 end
import {
  Pagination,
  // Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  // MenuItemGroup,
  // Input,
  // InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  // OptionGroup,
  // Button,
  // ButtonGroup,
  // Table,
  // TableColumn,
  DatePicker,
  // TimeSelect,
  TimePicker,
  // Popover,
  // Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  // Form,
  // FormItem,
  // Tabs,
  // TabPane,
  Tag,
  Tree,
  // Alert,
  // Slider,
  // Icon,
  // Row,
  // Col,
  // Upload,
  // Progress,
  Spinner,
  // Badge,
  // Card,
  Rate,
  Steps,
  Step,
  // Carousel,
  Scrollbar,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  Cascader,
  // ColorPicker,
  // Loading,
  Message,
  MessageBox
}
from 'element-ui';
Vue.use(Pagination);
// Vue.use(Dialog)
// Vue.use(Autocomplete)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
// Vue.use(MenuItemGroup)
// Vue.use(Input)
// Vue.use(InputNumber)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
  // Vue.use(Switch)
Vue.use(Select);
Vue.use(Option);
// Vue.use(OptionGroup)
// Vue.use(Button)
// Vue.use(ButtonGroup)
// Vue.use(Table)
// Vue.use(TableColumn)
Vue.use(DatePicker);
// Vue.use(TimeSelect);
Vue.use(TimePicker);
// Vue.use(Popover)
// Vue.use(Tooltip)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Tabs)
// Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
  // Vue.use(Alert)
  // Vue.use(Slider)// Vue.use(Icon)// Vue.use(Row)
  // Vue.use(Col)// Vue.use(Upload)// Vue.use(Progress)
Vue.use(Spinner)
  // Vue.use(Badge)// Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
  // Vue.use(MessageBox)
  // Vue.use(Carousel)
Vue.use(Scrollbar)
  // Vue.use(CarouselItem)// Vue.use(Collapse)
  // Vue.use(CollapseItem)
Vue.use(Cascader);
// Vue.use(ColorPicker)
// Vue.use(Loading.directive)
// e:\appproject\web\waterpurify3.0\node_modules\element-ui\lib\theme-chalk
import 'element-ui/lib/theme-chalk/menu.css';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/pagination.css';
import 'element-ui/lib/theme-chalk/cascader.css';
import 'element-ui/lib/theme-chalk/checkbox.css'
// import 'element-ui/lib/theme-default/checkbox-button.css'
import 'element-ui/lib/theme-chalk/checkbox-group.css'
// import 'element-ui/lib/theme-default/col.css'
// import 'element-ui/lib/theme-default/collapse.css'
// import 'element-ui/lib/theme-default/color-picker.css'
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/time-picker.css';
// import 'element-ui/lib/theme-default/dialog.css'
// import 'element-ui/lib/theme-default/dropdown.css'
// import 'element-ui/lib/theme-default/dropdown-item.css'
// import 'element-ui/lib/theme-default/dropdown-menu.css'
// import 'element-ui/lib/theme-default/form.css'
// import 'element-ui/lib/theme-default/form-item.css'
// import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/theme-chalk/input.css'
// import 'element-ui/lib/theme-default/input-number.css'
// import 'element-ui/lib/theme-default/loading.css'
import 'element-ui/lib/theme-chalk/message-box.css'
// import 'element-ui/lib/theme-default/notification.css'
import 'element-ui/lib/theme-chalk/option.css'
// import 'element-ui/lib/theme-default/option-group.css'
// import 'element-ui/lib/theme-default/popover.css'
// import 'element-ui/lib/theme-default/progress.css'
// import 'element-ui/lib/theme-default/radio.css'
// import 'element-ui/lib/theme-default/radio-button.css'
// import 'element-ui/lib/theme-default/radio-group.css'
import 'element-ui/lib/theme-chalk/rate.css'
// import 'element-ui/lib/theme-default/reset.css'
import 'element-ui/lib/theme-chalk/scrollbar.css'
import 'element-ui/lib/theme-chalk/select.css'
import 'element-ui/lib/theme-chalk/tree.css'
// import 'element-ui/lib/theme-chalk/select-dropdown.css'
// import 'element-ui/lib/theme-default/slider.css'
import 'element-ui/lib/theme-chalk/spinner.css'
import 'element-ui/lib/theme-chalk/step.css'
import 'element-ui/lib/theme-chalk/steps.css'
import 'babel-polyfill';

import ajaxFun from './fetch/requestFun.js';
Object.assign(Vue.prototype, {
  $http: ajaxFun,
  $projectUtils: ProjectUtils,
  $message: Message,
  $messageBox: MessageBox
});

// Vue.mixin({
//   methods: {
//     mixShowLoading() {
//       this.$store.dispatch('showLoading', true);
//     }
//   }
// });

Vue['config'].productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});

router.afterEach(route => {
  store.dispatch('routerChange', route)
})
