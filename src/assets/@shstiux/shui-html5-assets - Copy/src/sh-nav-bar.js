/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHNavBar extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        background-color: var(--base-2);
        transition: .2s all ease-in-out;
        box-shadow: var(--shadow-navigation);
        z-index: 3;
        width: 100%;
        overflow: auto;
        display: block;
      }

      :host([slot="footer"]) .tabs-wrapper {
        flex: none;
        margin: auto;
      }

      .nav-bar-wrapper {
        height: 56px;
        width: 100%;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
      }

      .tabs-wrapper {
        flex: 1;
        display: flex;
      }

      .tabs-wrapper> ::slotted(sh-tabs) {
        margin: -16px 0;
      }

      .nav-bar-wrapper> ::slotted(*[slot="functions"]) {
        margin-left: 8px;
      }
      :host(.testing), :host(.testing) *,
      :host(.testing) *:before, :host(.testing) *:after,
      :host(.testing), :host(.testing) *,
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active  {
        transition : 0s all linear !important;
      }
    </style>

    <!--HTML-->
    <div class="nav-bar-wrapper">
      <div class="tabs-wrapper">
        <slot id="tabs"></slot>
      </div>
      <slot name="functions" id="functions"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-nav-bar';
  }
  static get properties() {
    return {
      role: {
        type: String,
        value: 'button',
        reflectToAttribute: true
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    let tabs;
    tabs = this.querySelectorAll('sh-tabs');
    // trigger nav prop of tabs
    if (this.slot === 'nav') {
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].navContext = true;
      }
      // trigger footer prop of tabs
    }
    if (this.slot === 'footer') {
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].footerContext = true;
      }
    }
  }
}
window.customElements.define(SHNavBar.is, SHNavBar);
