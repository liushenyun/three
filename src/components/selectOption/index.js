import selectOption from "./src/SelectOption.vue";
// selectOption.install()
selectOption.install = function(Vue) {
  Vue.component(selectOption.name, selectOption);
}

export default selectOption;
