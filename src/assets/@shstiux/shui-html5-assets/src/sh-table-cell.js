/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHTableCell extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        min-width: fit-content;
        display: inline-flex;
        box-sizing: border-box;
        height: fit-content;
        height: -ms-fit-content;
        height: -moz-fit-content;
        margin: 0 12px;
      }

      :host * {
        box-sizing: border-box;
      }

      .cell-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        font: var(--body-1);
        margin: 8px 0;
        line-height: 32px;
        color: var(--text-primary);
        word-wrap: break-word;
        cursor: default;
        height: fit-content;
        height: -ms-fit-content;
        height: -moz-fit-content;
        font-weight: normal;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }

      /* number cells */

      :host([number]) .cell-wrapper{
        text-align: end;
        word-break: break-word;
        padding-right:32px;
      }

      /* icon cells */

      :host([icon]) {
        flex: 0;
        min-width: fit-content;
        min-width: -ms-fit-content;
        min-width: -moz-fit-content;
      }

      /* small screens */

      @media only screen and (max-width: 1025px) {
        :host {
          margin: 0 8px;
        }
      }

      /* Condensed Table */
      :host([condensed]) .cell-wrapper {
        margin: 4px 0;
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
    <div class="cell-wrapper" style$="min-width: {{minWidth}}">
      <slot></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-table-cell';
  }
  static get properties() {
    return {
      number: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      minWidth: {
        value: '40px',
        type: String,
        reflectToAttribute: true,
        notify: true,
        observer: 'setMinWidthOfHost'
      },
      columns :{
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      colS :{
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      colM :{
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      condensed: {
        type: Boolean,
        value: false,
        notify:true,
        reflectToAttribute:true
      }
    };
  }
  ready(){
    super.ready();
    if (this.querySelectorAll('sh-icon').length > 0) {
      for (let i = 0; i < this.querySelectorAll('sh-icon').length; i++) {
        if(this.querySelectorAll('sh-icon')[i].hasAttribute('button')) {
          this.querySelectorAll('sh-icon')[i].setAttribute('tabindex', '0');
        }
      }
    }
  }
  setMinWidthOfHost(newMinWidth) {
    this.style.minWidth = newMinWidth;
  }
  connectedCallback() {
    super.connectedCallback();
    this.style.minWidth = this.minWidth;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
window.customElements.define(SHTableCell.is, SHTableCell);