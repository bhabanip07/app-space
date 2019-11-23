/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHNotifications extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        height: fit-content;
        height: -ms-fit-content;
        height: -moz-fit-content;
        width: 320px;
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 5;
      }

      /* positions */
      :host,
      :host([position="top-right"]) {
        top: 16px;
        bottom: auto;
        left: auto;
        right: 16px;
      }
      :host([position="top-left"]) {
        top: 16px;
        bottom: auto;
        left: 16px;
        right: auto;
      }
      
      :host([position="bottom-right"]) {
        top: auto;
        bottom: 16px;
        left: auto;
        right: 16px;
      }
      :host([position="bottom-left"]) {
        top: auto;
        bottom: 16px;
        left: 16px;
        right: auto;
      }
      :host([position="top-right"]) ::slotted(*),
      :host([position="top-left"]) ::slotted(*) {
        margin-bottom: 8px;
      }

      :host([position="bottom-right"]) ::slotted(*),
      :host([position="bottom-left"]) ::slotted(*) {
        margin-top: 8px;
      }

      /* mobile */
      @media only screen and (max-width: 640px) {
        :host([position="top-right"]),
        :host([position="top-left"]) {
          top: 72px;
        }
        :host {
          width: calc(100% - 32px);
        }
      }
    </style>

    <!--HTML-->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-notifications';
  }
  static get properties() {
    return {
      position: {
        type: String,
        value: 'top-right',
        reflectToAttribute: true,
        notify: true
      }
    }
  }
}
window.customElements.define(SHNotifications.is, SHNotifications);
