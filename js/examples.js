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
        <button aria-controls="menu" v-bind:aria-expanded="ariaExpanded" v-on:click="hidden = !hidden">Menu</button>
        <ul v-bind:aria-hidden="ariaHidden" class="menu" id="menu">
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

  Vue.component('checked-fail', {
    'template': `
      <div class="checked">
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

  Vue.component('checked-win', {
    'template': `
      <div class="checked">
        <h1 id="location-label">Where do you want to pick up the book?</h1>
        <ul role="radiogroup" aria-labelledby="location-label">
          <li><a href="javascript:void(0)" role="radio" v-on:keydown="key" v-on:click="click" aria-checked="false" tabindex="0" class="button">Huddinge</a></li>
          <li><a href="javascript:void(0)" role="radio" v-on:keydown="key" v-on:click="click" aria-checked="false" tabindex="-1" class="button">Solna</a></li>
          <li><a href="javascript:void(0)" role="radio" v-on:keydown="key" v-on:click="click" aria-checked="false" tabindex="-1" class="button">Home delivery</a></li>
        </ul>
        <ul class="confirm">
          <li><a href="javascript:void(0)" role="button">Cancel</a></li>
          <li><a href="javascript:void(0)" role="button">Request</a></li>
        </ul>
      </div>
    `,
    'methods': {
      'click': function click(e) {
        this.select(e.target);
      },
      'select': function select(el) {
        let locations = el.parentNode.parentNode.querySelectorAll('a');
        for (let i = 0; i < locations.length; i += 1) {
          locations[i].setAttribute('aria-checked', 'false');
          locations[i].setAttribute('tabindex', '-1');
        }
        el.setAttribute('aria-checked', 'true');
        el.setAttribute('tabindex', '0');
        el.focus();
      },
      'key': function key(e) {
        let keyCode = e.keyCode;
        if (keyCode === 40 || keyCode === 39) {
          e.preventDefault();
          let next = e.target.parentNode.nextElementSibling;
          if (next) {
            this.select(next.firstChild);
          } else {
            let first = e.target.parentNode.parentNode.firstElementChild.firstChild;
            this.select(first);
          }
        } else if (keyCode === 38 || keyCode === 37) {
          e.preventDefault();
          let prev = e.target.parentNode.previousElementSibling;
          if (prev) {
            this.select(prev.firstChild);
          } else {
            let last = e.target.parentNode.parentNode.lastElementChild.firstChild;
            this.select(last);
          }
        }
      }
    }
  });

  window.example = new Vue({
    'el': '#example'
  });
})();
