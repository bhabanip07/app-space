/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHModal extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 0px;
        max-height: 0px;
        overflow: hidden;
        opacity: 0;
        z-index: 5;
        align-items: center;
        justify-content: center;
        display: flex;
        background: rgba(0, 0, 0, .4); /* Modal Background (UI 1 - Light / UI 7 - Dark) */
        transition: .2s all ease-in-out, 0s height ease-in-out .2s, 0s max-height ease-in-out .2s;
      }

      :host([visible]) {
        opacity: 1;
        height: 100%;
        max-height: 100%;
        transition: .2s all ease-in-out .2s, 0s height ease-in-out, 0s max-height ease-in-out
      }

      :host([visible]) .modal-wrapper {
        transform: none;
        transition: .2s all ease-in-out .2s;
      }

      :host([sticky]) #close-button,
      :host([sticky]) #close-button-2 {
        display: none;
      }

      .modal-wrapper {
        transition: .2s all ease-in-out;
        transform: translateY(40px);
        background: var(--base-3);
        box-shadow: var(--shadow-navigation);
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        z-index: 5;
        position: relative;
      }

      .label-wrapper {
        display: flex;
        flex-direction: row;
        padding: 16px;
        align-items: center;
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
      }

      .modal-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-primary);
        font: var(--header-2);
        line-height: 24px !important;
        flex: 1;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }

      #close-button-2 {
        position: absolute;
        right: 16px;
        top: 16px;
      }

      .functions-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .functions-wrapper > ::slotted(*),
      .footer-wrapper > ::slotted(*) {
        margin-left: 8px;
      }

      .header-wrapper {
        padding: 16px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
      }

      .header-wrapper> ::slotted(sh-tabs) {
        flex: 1;
        margin: -16px -16px 0 -16px;
      }

      .body-wrapper {
        flex: 1;
        padding: 16px !important;
        box-sizing: border-box;
        display: block;
        flex-direction: column;
        overflow: auto;
        font: var(--body-1);
        color: var(--text-primary);
      }

      .body-wrapper > ::slotted(*) {
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
      }

      .footer-wrapper> ::slotted(*) {
        color: var(--text-primary);
        font: var(--body-2);
        line-height: 16px !important;
      }

      #close-button {
        transition: .2s all ease-in-out;
        padding: 0px 0px 0px 8px;
      }

      .modal-wrapper[empty-header] .header-wrapper {
        display: none;
      }

      :host(:not([label])) .label-wrapper {
        display: none;
      }

      .modal-wrapper[empty-footer] .footer-wrapper {
        display: none;
      }

      .modal-wrapper:not([empty-header]) .label-wrapper {
        display: none;
      }

      .modal-wrapper:not([empty-header]) .body-wrapper,
      :host([label]) .body-wrapper {
        padding-top: 0px !important;
      }

      .modal-wrapper:not([empty-footer]) .body-wrapper {
        padding-bottom: 0px !important;
      }

      /* Modal Type Styles */
      .modal-wrapper .label-wrapper sh-icon:not(#close-button) {
        margin-right: 8px;
        margin-left: 0px !important;
      }

      /* notification types - icons */
      :host(:not([type="error"])) sh-icon[icon="error"]:not(#modal-icon),
      :host(:not([type="alert"])) sh-icon[icon="warning"]:not(#modal-icon),
      :host(:not([type="confirmation"])) sh-icon[icon="success"]:not(#modal-icon) {
        display: none;
      }

      /* touch */
      @media (any-pointer:coarse) {
        .functions-wrapper> ::slotted(*),
        .footer-wrapper> ::slotted(*) {
          margin-left: 16px;
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
    <div class="modal-wrapper" style$="height:[[modalHeight]];
         width:[[modalWidth]];" expanded$="[[expanded]]"
         empty-footer$="[[emptyFooter]]" empty-header$="[[emptyHeader]]"
         id="content">
      <div class="label-wrapper">
        <sh-icon icon$="[[icon]]" id="modal-icon"></sh-icon>
        <sh-icon icon="error" color="rgb(var(--functional-red))" size="s"></sh-icon>
        <sh-icon icon="warning" color="rgb(var(--functional-yellow))" size="s"></sh-icon>
        <sh-icon icon="success" color="rgb(var(--functional-green))" size="s"></sh-icon>
        <div class="modal-label">[[label]]</div>
        <div class="functions-wrapper">
          <slot name="functions" id="functions"></slot>
          <sh-icon button icon="cancel" on-click="_closeModal" id="close-button" size="s"></sh-icon>
        </div>
      </div>
      <div class="header-wrapper">
        <slot name="header" id="header"></slot>
        <sh-icon button icon="cancel" on-click="_closeModal" id="close-button-2" size="s"></sh-icon>
      </div>
      <div class="body-wrapper">
        <slot id="body"></slot>
      </div>
      <div class="footer-wrapper">
        <slot name="footer" id="footer"></slot>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-modal';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      type: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true
      },
      modalHeight: {
        type: String,
        value: '480px',
        reflectToAttribute: true,
        notify: true
      },
      modalWidth: {
        type: String,
        value: '480px',
        reflectToAttribute: true,
        notify: true
      },
      visible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_modalStatus'
      },
      emptyFooter: {
        type: Boolean,
        value: false
      },
      emptyHeader: {
        type: Boolean,
        value: false
      },
      sticky: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'dialog',
        reflectToAttribute: true
      }
    }
  }
  ready() {
    super.ready();
    let footerNodes, headerNodes;
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
  }
  connectedCallback() {
    super.connectedCallback();
    // this function checks if the event hits the background or the drawer itself, and closes it accordingly
    this.addEventListener('mousedown', function () {
      if(!this.sticky) {
        this._closeModal();
      }
    });
    this.$.content.addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });
  }
  _closeModal() {
    this.visible = !this.visible;

    // fire event on closing
    this.dispatchEvent(new CustomEvent('modal-closed', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }

  _modalStatus() {
    let flag, modal;
    flag = false;
    modal = this;
    if (this.visible) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].setAttribute('tabindex', 0);
        this.children[i].style.outline = 'none';
        if (!flag) {
          this.children[i].focus();
          flag = true;
        }
      }
      this.onkeyup = function (e) {
        if (e.keyCode === 27) {
          modal._closeModal();
        }
      }
    }
    if (!this.visible) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].removeAttribute('tabindex');
      }
    }
  }
}
window.customElements.define(SHModal.is, SHModal);
