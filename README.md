# aria-workshop

Examples for an internal developer workshop showing how semantic markup and aria attributes improve accessibility and screen reader experience.

[Node package manager](https://www.npmjs.com) is used for `npm install`, which in this case installs [Vue.js](https://github.com/vuejs/vue). This framework is then used to create the components for each example in `js/examples.js`. 

Each HTML-file shows a bad example, not optimal for accessibility and screen readers. Change the component name from `-fail` to `-win` in each HTML example file to see the improved solution. The solutions are not made to be complete or perfect, but to focus on showing one or two improvements per example.

## Example 1: The Accessibility Tree

The `-fail` part of this example shows a button made with a `<div>`, not being usable for either screen readers or keyboard navigation users.

Change to `-win` where simply changing the `<div>` element to a `<button>` solves that.

## Example 2: Labels and descriptions

Simple example where the `-fail` part has a button with only an icon as background-image. It's part of the accessibility tree and can be focused, but has no info whatsoever for screen readers on what it actually does.

Change the component name to `-win` to see an improvement where the `aria-label` and `aria-describedby` attributes tell the screen reader what the button does.

## Example 3: Landmarks, lists and aria-expanded

This `-fail` example has a button which toggles a menu using a `.hidden` class. Works well enough, but the improvements in the `-win` component should be noticed by:

* Using `<nav>` instead of a wrapping `<div>` indicates navigation.
* Instead of toggling the menu with a class, `aria-hidden` is used for better semantics.
* The button also toggles the `aria-expanded` attribute for screen readers to announce the toggled state.
* A simple list is used for the menu links for better semantics. Some screen readers announce the number of items in a list for better discoverability.

## Example 4: Aria roles

Here, the `-fail` example is based on a real implementation found in the organization, and shows a list of links disguised as buttons, presenting a choice to be made.

Problems:
* Screen reader announces the fake buttons as links.
* There's only visual confirmation of the selected option.
* Works visually like radio buttons, but not practically.

The `-win` component solution:
* Use `aria-labelledby` to explain the choices from the heading.
* Use `radiogroup` and `radio` roles to make the links be announced as radio buttons.
* Use `aria-checked` attribute to confirm which option is selected.
* Add JavaScript to make the links act like radio buttons. `tabindex="-1"` to remove the non-selected options from the accessibility tree, and the ability to use up/down/left/right arrow keys to navigate the radio buttons.
* Use `button` role for cancel and request links.
