/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

// insert component name (class SH...)
class SHGeneric extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      .generic-wrapper {}
    </style>

    <!--HTML-->
    <div class="generic-wrapper">
    </div>
`;
  }

  static get is() {
    // insert component name (sh-...)
    return 'sh-generic';
  }
  static get properties() {
    return {
      //definition of properties (name, type, default, ...)
      myProp1: {
        type: String,
        value: 'Default Value'
      },
      myProp2: {
        type: Boolean,
        value: false
      }
    }
  }
}

// insert component name (SH...is, SH...)
window.customElements.define(SHGeneric.is, SHGeneric);
