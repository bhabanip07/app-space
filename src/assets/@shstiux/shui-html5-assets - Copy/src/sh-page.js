/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHPage extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        height: 100%;
        display: block;
      }

      .page-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .page-content {
        display: flex;
        flex: 1;
        flex-direction: row;
        background-color: var(--base-1);
        transition: .2s all ease-in-out;
        overflow: hidden;
      }

      :host([flat]) .page-content {
        background-color: var(--base-3);
      }

      .main-wrapper {
        overflow-y: overlay;
        height: 100%;
        width: 100%;
      }

      .body-wrapper {
        flex: 1;
        height: 100%;
        overflow: hidden;
        padding: 16px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: center;
      }
      .body-wrapper[scrollable] {
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        overflow-y: visible;
      }

      .body-wrapper> ::slotted(*) {
        width: 100%;
      }
    </style>

    <!--HTML-->
    <div class="page-wrapper" empty-left$="[[emptyLeft]]" empty-right$="[[emptyRight]]">
      <slot name="access" id="access"></slot>
      <slot name="nav" id="nav"></slot>
      <div class="page-content">
        <slot name="left" id="left"></slot>
        <div class="main-wrapper">
          <div class="body-wrapper" scrollable$="[[scrollable]]">
            <slot id="body"></slot>
          </div>
        </div>
        <slot name="right" id="right"></slot>
      </div>
      <slot name="footer" id="footer"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-page';
  }
  static get properties() {
    return {
      theme: {
        type: String,
        value: 'light',
        reflectToAttribute: true,
        notify: true,
        observer: '_defineTheme'
      },
      scrollable: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      touch: {
        type: Boolean,
        value: false
      },
      flat: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready() {
    super.ready();
    this._defineTheme();
  }
  _defineTheme() {
    const htmlTag = this.ownerDocument.documentElement;
    htmlTag.setAttribute('theme', this.theme);
  }
}
window.customElements.define(SHPage.is, SHPage);
