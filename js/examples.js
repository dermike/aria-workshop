'use strict';
(function examples() {
  const buttonClick = {
    'data': function data() {
      return {
        'clicked': false
      };
    },
    'methods': {
      'click': function click() {
        this.clicked = !this.clicked;
        setTimeout(() => {
          this.clicked = !this.clicked;
        }, 300);
      }
    }
  };

  Vue.component('accessibility-tree-fail', {
    'template': '<div class="button" v-bind:class="{ clicked: clicked }" v-on:click="click">Click me</div>',
    'mixins': [buttonClick]
  });

  Vue.component('accessibility-tree-win', {
    'template': '<button v-bind:class="{ clicked: clicked }" v-on:click="click">Click me</button>',
    'mixins': [buttonClick]
  });

  window.example = new Vue({
    'el': '#example'
  });
})();
