/*
  Use the webcomponents-loader script which will feature detect which Web
  Components features are missing and lazy load the appropriate polyfills.
  When we hear the 'WebComponentsReady' event from the polyfill bundle we can
  insert our 'bundle.js'.
*/

// cdn polyfill
// if the path is not defined by the user, the web polyfills will be used
if (typeof window.webcomponentsjsBase == 'undefined') {
  window.webcomponentsjsBase = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.7/';
}

const loadWebcomponentsAndBundle = () => {
  (function() {
    document.addEventListener('WebComponentsReady', function componentsReady() {
      document.removeEventListener('WebComponentsReady', componentsReady, false);
      require('./sh-access-bar.js');
      require('./sh-accordion.js');
      require('./sh-badge.js');
      require('./sh-button.js');
      require('./sh-breadcrumbs.js');
      require('./sh-breadcrumb-item.js');
      require('./sh-card.js');
      require('./sh-chart.js');
      require('./sh-checkbox.js');
      require('./sh-datepicker.js');
      require('./sh-divider.js');
      require('./sh-drawer.js');
      require('./sh-dropdown.js');
      require('./sh-empty-state.js');
      require('./sh-grid.js');
      require('./sh-home-screen.js');
      require('./sh-home-card.js');
      require('./sh-icon.js');
      require('./sh-image-segment.js');
      require('./sh-image-text.js');
      require('./sh-input-number.js');
      require('./sh-input-text.js');
      require('./sh-menu-group.js');
      require('./sh-menu-item.js');
      require('./sh-modal.js');
      require('./sh-nav-bar.js');
      require('./sh-notifications.js');
      require('./sh-notification-item.js');
      require('./sh-page.js');
      require('./sh-pagination.js');
      require('./sh-pane.js');
      require('./sh-patient-illustration.js');
      require('./sh-popover.js');
      require('./sh-progress.js');
      require('./sh-progress-radial.js');
      require('./sh-radio-button.js');
      require('./sh-radio-group.js');
      require('./sh-search.js');
      require('./sh-slider.js');
      require('./sh-spinner.js');
      require('./sh-splash-screen.js');
      require('./sh-stepper.js');
      require('./sh-stepper-item.js');
      require('./sh-switch.js');
      require('./sh-switch-item.js');
      require('./sh-table.js');
      require('./sh-table-cell.js');
      require('./sh-table-head.js');
      require('./sh-table-row.js');
      require('./sh-tabs.js');
      require('./sh-tab-item.js');
      require('./sh-tag.js');
      require('./sh-text.js');
      require('./sh-thumbnail.js');
      require('./sh-timepicker.js');
      require('./sh-toggle.js');
      require('./sh-tool.js');
      require('./sh-toolbar.js');
      require('./sh-tooltip.js');
      require('./sh-user-identifier.js');
      require('./sh-workline.js');
      require('./sh-workline-group.js');
      require('./sh-workline-item.js');
      require('./sh-wrapper.js');
    }, false);
  })();
}

/*
  Feature detect Custom Elements support. If the browser DOES support Custom
  Elements then we need to load the custom-elements-es5-adapter because
  our project code has been transpiled from ES2015 to ES5 and native Custom
  Elements expect elements will be registered as classes.
*/

if (window.customElements) {
  const elem = window.document.createElement('script')
  elem.src = window.webcomponentsjsBase+'custom-elements-es5-adapter.js';
  elem.onload = () => {
    loadWebcomponentsAndBundle();
    document.body.style.opacity = "0"
    window.addEventListener("WebComponentsReady", function () { 
      document.body.style.transition = ".2s opacity ease-in-out .2s"
      document.body.style.opacity = "1"
    });
  }
  window.document.head.appendChild(elem);
} else {
  // we don't need the es5 shim
  loadWebcomponentsAndBundle();
}

const elem = window.document.createElement('script')
elem.src = window.webcomponentsjsBase+'webcomponents-bundle.js';
window.document.head.appendChild(elem);