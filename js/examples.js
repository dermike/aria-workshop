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
    'template': `
      <div class="button" v-bind:class="{ clicked: clicked }" v-on:click="click">Click me</div>
    `,
    'mixins': [buttonClick]
  });

  Vue.component('accessibility-tree-win', {
    'template': `
      <button v-bind:class="{ clicked: clicked }" v-on:click="click">Click me</button>
    `,
    'mixins': [buttonClick]
  });

  Vue.component('menu-fail', {
    'template': `
      <div class="navigation">
        <button v-on:click="hidden = !hidden">Menu</button>
        <div class="menu" v-bind:class="{ hidden: hidden }">
          <a href="#">First link</a> <a href="#">Second link</a> <a href="#">Third link</a>
        </div>
      </div>
    `,
    'data': function data() {
      return {
        'hidden': true
      };
    }
  });

  Vue.component('menu-win', {
    'template': `
      <nav>
        <button v-bind:aria-expanded="ariaExpanded" v-on:click="hidden = !hidden">Menu</button>
        <ul v-bind:aria-hidden="ariaHidden" class="menu">
          <li>
            <a href="#">First link</a>
          </li>
          <li>
            <a href="#">Second link</a>
          </li>
          <li>
            <a href="#">Third link</a>
          </li>
        </ul>
      </nav>
    `,
    'data': function data() {
      return {
        'hidden': true
      };
    },
    'computed': {
      // return aria-values as string so false ones won't be removed
      'ariaExpanded': function ae() {
        return this.hidden ? 'false' : 'true';
      },
      'ariaHidden': function ah() {
        return this.hidden ? 'true' : 'false';
      }
    }
  });

  window.example = new Vue({
    'el': '#example'
  });
})();
