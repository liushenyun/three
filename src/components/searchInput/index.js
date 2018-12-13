// 方式1：element-ui这是这样写的
import SearchInput from "./src/SearchInput.vue";
SearchInput.install = function(Vue) {
  Vue.component(SearchInput.name, SearchInput);
}
export default SearchInput;

// 方式二：
// import SearchInputComponent from "./src/SearchInput.vue";
// const SearchInput = {
//   install: function(Vue) {
//     Vue.component(SearchInputComponent.name, SearchInputComponent);
//   }
// }

// export default SearchInput;
