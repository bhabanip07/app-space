/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHPane extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        z-index: 2;
        display: block;
        background-color: var(--base-2);
        transition: .2s all ease-in-out;
        box-shadow: var(--shadow-navigation);
      }
      .pane-wrapper {
        width: 352px;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        transition: .2s all ease-in-out;
      }
      .label-wrapper {
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
      }
      .header-wrapper {
        padding: 16px;
        display: flex;
        flex-direction: row;
      }
      .body-wrapper {
        flex: 1;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow-y: overlay;
        -ms-overflow-style: -ms-autohiding-scrollbar;
      }
      .body-wrapper> ::slotted(*:not(:first-child):not(sh-menu-item)){
        margin-top: 8px;
      }
      .condensed-wrapper> ::slotted(*:not(sh-menu-item)) {
        margin-bottom: 8px;
      }
      .footer-wrapper {
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        padding: 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
      }
      .footer-wrapper> ::slotted(sh-button[slot="footer"]),
      .footer-wrapper> ::slotted(sh-icon[slot="footer"]),
      .label-wrapper> ::slotted([slot="functions"]) {
        margin-left: 8px;
      }
      .pane-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-primary);
      }
      .header-wrapper> ::slotted(sh-tabs[slot="header"]) {
        flex: 1;
        margin: -16px 0 0 0;
      }
      .pane-wrapper[empty-header] .header-wrapper {
        display: none;
      }
      .pane-wrapper[empty-label] .label-wrapper {
        display: none;
      }
      .pane-wrapper[empty-footer] .footer-wrapper {
        display: none;
      }
      .pane-wrapper:not([empty-header]) .label-wrapper {
        display: none;
      }
      .pane-wrapper:not([empty-header]) .body-wrapper {
        padding-top: 0px;
      }
      .pane-wrapper:not([empty-label]) .body-wrapper {
        padding-top: 0px;
      }
      .pane-wrapper:not([empty-footer]) .body-wrapper {
        padding-bottom: 0px;
      }

      /* collapse / condense behavior */
      :host([size='expanded']) .pane-wrapper {
        width: 352px;
      }
      :host([size='collapsed']) .pane-wrapper {
        width: 0px;
      }
      :host([size='condensed']) .pane-wrapper {
        width: 100px;
      }
      :host([size='expanded']) .label-wrapper,
      :host([size='expanded']) .header-wrapper,
      :host([size='expanded']) .body-wrapper,
      :host([size='expanded']) .footer-wrapper {
        width: 352px;
        transition: .2s opacity ease-in-out .2s;
      }
      :host(:not([size='expanded'])) .label-wrapper,
      :host(:not([size='expanded'])) .header-wrapper,
      :host(:not([size='expanded'])) .body-wrapper,
      :host(:not([size='expanded'])) .footer-wrapper {
        width: 0px;
        max-height: 0px;
        opacity: 0;
        transition: .0s all;
      }
      :host([size='condensed']) .condensed-wrapper {
        transition: .2s opacity ease-in-out .2s;
        height: 100%;
        position: absolute;
        width: 100px;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: overlay;
      }
      :host(:not([size='condensed'])) .condensed-wrapper {
        opacity: 0;
        width: 0px;
        height: 0px;
      }

      /* arrow wrapper */
      :host(:not([behavior])) .arrow-wrapper {
        display: none;
      }
      .arrow-wrapper {
        padding: 4px 0;
        position: absolute;
        transition: .2s all ease-in-out;
        background-color: var(--base-2);
      }
      :host([slot="left"]) .arrow-wrapper {
        right: -32px;
        box-shadow: 2px 0px 4px rgba(0,0,0,.1);
        border-radius: 0px 2px 2px 0px;
      }
      :host([slot="right"]) .arrow-wrapper {
        left: -32px;
        box-shadow: -2px 0px 4px rgba(0,0,0,.1);
        border-radius: 2px 0px 0px 2px;
      }

      /* arrow position */
      :host([arrow-position="top"]) .arrow-wrapper {
        top: 12px;
      }
      :host([arrow-position="bottom"]) .arrow-wrapper {
        bottom: 12px;
      }
      :host([arrow-position="center"]) .arrow-wrapper {
        top: calc(50% - 20px);
      }

      /* arrow */
      :host([slot="right"]:not([size='expanded'])) .arrow ,
      :host([slot="left"][size='expanded']) .arrow {
        transform: rotateY(180deg);
      }

      /* test */
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
    <div class="pane-wrapper" empty-label$="[[emptyLabel]]" empty-footer$="[[emptyFooter]]" empty-header$="[[emptyHeader]]">
      <div class="label-wrapper">
        <sh-text super-header="" class="pane-label">[[label]]</sh-text>
        <slot name="functions" id="functions"></slot>
      </div>
      <div class="header-wrapper">
        <slot name="header" id="header"></slot>
      </div>
      <div class="body-wrapper">
        <slot id="body"></slot>
      </div>
      <div class="footer-wrapper">
        <slot name="footer" id="footer"></slot>
      </div>
      <div class="condensed-wrapper">
        <slot name='condensed' id='condensed'></slot>
      </div>
      <div class="arrow-wrapper" on-click="_handleExpand">
        <sh-icon icon="arrow-right-s" button="" class="arrow"></sh-icon>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-pane';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      size: {
        type: String,
        value: 'expanded',
        reflectToAttribute: true,
        notify: true
      },
      arrowPosition: {
        type: String,
        value: 'center',
        reflectToAttribute: true,
        notify: true
      },
      behavior: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      emptyLabel: {
        type: Boolean,
        value: false
      },
      emptyFooter: {
        type: Boolean,
        value: false
      },
      emptyHeader: {
        type: Boolean,
        value: false
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }
  // switches expanded prop on button click
  _handleExpand() {
    if (this.size === 'expanded') {
      if (this.behavior === 'condense') {
        this.size = 'condensed';
      }
      if (this.behavior === 'collapse') {
        this.size = 'collapsed';
      }
    }
    else if (this.size === 'collapsed' || this.size === 'condensed') {
      this.size = 'expanded';
    }
  }
  // this is for checking if the slot is empty :
  ready() {
    super.ready();
    let headerNodes, footerNodes;
    footerNodes = this.$.footer.assignedNodes({
      flatten: true
    }).length;
    if (footerNodes === 0) {
      this.emptyFooter = !this.emptyFooter;
    }
    headerNodes = this.$.header.assignedNodes({
      flatten: true
    }).length;
    if (headerNodes === 0) {
      this.emptyHeader = !this.emptyHeader;
    }
    if (this.label === undefined) {
      this.emptyLabel = !this.emptyLabel;
    }
  }
}
window.customElements.define(SHPane.is, SHPane);
