'use strict';
(function examples() {
  Vue.component('accessibility-tree-fail', {
    'template': '<div class="button" v-on:click="click">{{ message }}</div>',
    'data': function data() {
      return {
        'message': 'Click me'
      };
    },
    'methods': {
      'click': function click() {
        this.message = 'You clicked me!';
        setTimeout(() => {
          this.message = 'Click me';
        }, 1000);
      }
    }
  });

  Vue.component('accessibility-tree-win', {
    'template': '<button v-on:click="click">{{ message }}</button>',
    'data': function data() {
      return {
        'message': 'Click me'
      };
    },
    'methods': {
      'click': function click() {
        this.message = 'You clicked me!';
        setTimeout(() => {
          this.message = 'Click me';
        }, 1000);
      }
    }
  });

  window.example = new Vue({
    'el': '#example'
  });
})();
