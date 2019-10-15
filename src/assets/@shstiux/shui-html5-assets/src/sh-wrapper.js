/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

// insert component name (class SH...)
class SHWrapper extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      /* direction */
      :host([direction="row"]) {
        flex-direction: row;
      }

      :host([direction="column"]) {
        flex-direction: column;
      }

      /* spacing */
       /* none */
      :host([spacing="none"]) {
        width: 100%;
      }

      /* xs */
      :host([spacing="xs"]) {
        width: calc(100% + 2px);
        margin: -1px;
      }

      :host([spacing="xs"]) ::slotted(*) {
        margin: 1px;
      }

      /* s */
      :host([spacing="s"]) {
        width: calc(100% + 4px);
        margin: -2px;
      }

      :host([spacing="s"]) ::slotted(*) {
        margin: 2px;
      }

      /* m */
      :host([spacing="m"]) {
        width: calc(100% + 8px);
        margin: -4px;
      }

      :host([spacing="m"]) ::slotted(*) {
        margin: 4px;
      }

      /* l */
      :host([spacing="l"]) {
        width: calc(100% + 16px);
        margin: -8px;
      }

      :host([spacing="l"]) ::slotted(*) {
        margin: 8px;
      }
    </style>

    <!--HTML-->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-wrapper';
  }
  static get properties() {
    return {
      direction: {
        type: String,
        value: 'row',
        reflectToAttribute: true
      },
      spacing: {
        type: String,
        value: 's',
        reflectToAttribute: true
      }
    }
  }
}

window.customElements.define(SHWrapper.is, SHWrapper);
