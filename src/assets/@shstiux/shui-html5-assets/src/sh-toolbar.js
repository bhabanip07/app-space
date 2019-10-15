/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHToolbar extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        background: rgba(var(--ui-6), var(--opacity-2));
        border-radius: 2px;
      }
      :host([orientation="horizontal"]), 
      :host([slot="top"]), 
      :host([slot="bottom"]) {
        flex-direction: row;
      }
      :host([orientation="vertical"]), 
      :host([slot="left"]), 
      :host([slot="right"]) {
        flex-direction: column;
      }
    </style>

    <!--HTML-->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-toolbar';
  }
  static get properties() {
    return {
      orientation: {
        type: String,
        value: 'horizontal',
        notify: true,
        reflectToAttribute: true
      }
    };
  }
}

window.customElements.define(SHToolbar.is, SHToolbar);
