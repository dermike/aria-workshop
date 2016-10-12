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

  Vue.component('description-fail', {
    'template': `
      <div class="login">
        <button></button>
        <p>Log in to see your loans</p>
      </div>
    `
  });

  Vue.component('description-win', {
    'template': `
      <div class="login">
        <button aria-label="Login" aria-describedby="login-description"></button>
        <p>Log in to <span id="login-description">see your loans</span></p>
      </div>
    `
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

  Vue.component('pressed-fail', {
    'template': `
      <div class="pressed">
        <h1>Where do you want to pick up the book?</h1>
        <ul>
          <li><a href="javascript:void(0)" v-on:click="click" class="button">Huddinge</a></li>
          <li><a href="javascript:void(0)" v-on:click="click" class="button">Solna</a></li>
          <li><a href="javascript:void(0)" v-on:click="click" class="button">Home delivery</a></li>
        </ul>
        <ul class="confirm">
          <li><a href="javascript:void(0)" class="button">Cancel</a></li>
          <li><a href="javascript:void(0)" class="button">Request</a></li>
        </ul>
      </div>
    `,
    'methods': {
      'click': function click(e) {
        let locations = e.target.parentNode.parentNode.querySelectorAll('a');
        for (let i = 0; i < locations.length; i += 1) {
          locations[i].classList.remove('active');
        }
        e.target.classList.add('active');
      }
    }
  });

  Vue.component('pressed-win', {
    'template': `
      <div class="pressed">
        <h1>Where do you want to pick up the book?</h1>
        <ul>
          <li><a href="javascript:void(0)" v-on:click="click" aria-pressed="false" role="button">Huddinge</a></li>
          <li><a href="javascript:void(0)" v-on:click="click" aria-pressed="false" role="button">Solna</a></li>
          <li><a href="javascript:void(0)" v-on:click="click" aria-pressed="false" role="button">Home delivery</a></li>
        </ul>
        <ul class="confirm">
          <li><a href="javascript:void(0)" role="button">Cancel</a></li>
          <li><a href="javascript:void(0)" role="button">Request</a></li>
        </ul>
      </div>
    `,
    'methods': {
      'click': function click(e) {
        let locations = e.target.parentNode.parentNode.querySelectorAll('a');
        for (let i = 0; i < locations.length; i += 1) {
          locations[i].setAttribute('aria-pressed', 'false');
        }
        e.target.setAttribute('aria-pressed', 'true');
      }
    }
  });

  window.example = new Vue({
    'el': '#example'
  });
})();
