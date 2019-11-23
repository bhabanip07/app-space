/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHHomeScreen extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">

      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .cards-wrapper {
        display: flex;
        flex-wrap: wrap;
        min-height: fit-content;
        width: fit-content;
        max-height: calc(100% + 16px);
        max-width: calc(100% + 16px);
        margin: -8px;
        justify-content: center;
        align-items: center;
      }

      .cards-wrapper > ::slotted(sh-home-card) {
        margin: 8px;
        height: 288px;
        width: 288px;
      }

      #functions-button {
        position: fixed;
        bottom: 16px;
        right: 16px;
        display: none;
      }

      .functions-card:not([active]) {
        opacity: 0;
        margin-bottom: -16px;
        pointer-events: none;
      }

      .functions-card {
        transition: .2s all ease-in-out;
        position: fixed;
        right: 16px;
        bottom: 56px;
        width: 240px;
      }

      /*--css testing--*/
      :host(.testing), :host(.testing) * {
        transition: all 0s linear;
      }

      /* small screens */

      @media only screen and (max-width: 767px) {
        :host {
          align-items: flex-start;
        }
        .cards-wrapper {
          width: calc(100% + 16px);
          flex-direction: column;
        }
        .cards-wrapper > ::slotted(sh-home-card) {
          width: calc(100% - 16px);
        }
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
    <div class="cards-wrapper">
      <slot></slot>
    </div>
    <sh-icon button icon="standby" id="functions-button" on-click="_handleFunctions"></sh-icon>
    <sh-card class="functions-card" active$="{{functions}}">
      <div style="margin: -8px 0;" on-click="_handleFunctions">
        <slot name="functions"></slot>
      </div>
    </sh-card>
`;
  }

  static get is() {
    return 'sh-home-screen';
  }
  static get properties() {
    return {
      functions: {
        type: Boolean
      }
    }
  }
  ready() {
    super.ready();
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].tagName === 'SH-MENU-ITEM') {
        this.shadowRoot.querySelector("sh-icon[icon='standby']").setAttribute('style', 'display: block;');
      }
    }
  }
  _handleFunctions() {
    this.functions = !this.functions;
  }
}

window.customElements.define(SHHomeScreen.is, SHHomeScreen);
