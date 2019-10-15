/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHImageText extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        transition: .2s all ease-in-out;
        width: 100%;
        font: var(--body-1);
        line-height: 20px;
        color: var(--text-white);
        text-shadow: 1px 1px 4px black, -1px -1px 4px black, 0px 0px 4px black, 0px 0px 2px black;
      }
      :host([alignment="left"]) {
        text-align: left;
      }
      :host([alignment="right"]) {
        text-align: right;
      }
    </style>

    <!--HTML-->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-image-text';
  }
  static get properties() {
    return {
      alignment: {
        type: String,
        notify: true,
        reflectToAttribute: true
      }
    };
  }
}

window.customElements.define(SHImageText.is, SHImageText);
