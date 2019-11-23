/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHSwitch extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: row;
        border-radius: 20px;
        background-color: rgba(var(--ui-1), var(--opacity-6));
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
        max-width: 100%;
        overflow: hidden;
      }

      :host([stretch]) {
        width: 100%;
      }

      :host([stretch])> ::slotted(sh-switch-item) {
        flex: 1;
      }

      :host([disabled]) {
        pointer-events: auto;
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
    </style>

    <!--HTML-->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-switch';
  }
  static get properties() {
    return {
      stretch: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      }, 
      disabled: {
        type: Boolean, 
        reflectToAttribute: true,
        notify: true, 
        observer: '_disabledChanged'
      }
    }
  }

  _disabledChanged() {
    let childrenItems;
    childrenItems = this.children;
    if(this.disabled) {
      for (let i = 0; i < childrenItems.length; i++) {
        if(!childrenItems[i].hasAttribute("disabled")) {
          childrenItems[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < childrenItems.length; i++) {
        if(childrenItems[i].hasAttribute("disabled")) {
          childrenItems[i].disabled = false;
        }
      }
    }
  }

}

window.customElements.define(SHSwitch.is, SHSwitch);
