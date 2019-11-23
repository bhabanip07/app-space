/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHNotificationItem extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        height: auto;
        height: -ms-fit-content;
        height: -moz-fit-content;
        background: var(--base-3);
        box-shadow: var(--shadow-overlay);
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        padding: 16px;
        box-sizing: border-box;
        overflow: hidden;
        transition: .2s all ease-in-out, 0s max-height ease-in-out, 0s width ease-in-out, 0s padding ease-in-out, 0s margin ease-in-out;
      }

      /* hidden */
      :host(:not([visible])) {
        max-height: 0px;
        min-height: unset;
        width: 0px;
        padding: 0;
        margin: 0 !important;
        pointer-events: none;
        transform: translateX(80px);
        opacity: 0;
        transition: .2s all ease-in-out, 0s max-height ease-in-out .2s, 0s width ease-in-out .2s, 0s padding ease-in-out .2s, 0s margin ease-in-out .2s;
      }
      :host([sticky]) #close-button, 
      :host([sticky]) #close-button-2 {
        display: none;
      }

      /* header */
      .header-wrapper {
        display: flex;
        margin-bottom: 16px;
        align-items: center;
      }

      .header-wrapper > sh-icon:not([icon="cancel"]) {
        margin: 0 8px 0 0;
      }

      .header-wrapper > sh-text {
        margin: 0 8px 0 0;
        flex: 1;
      }
      :host(:not([label])) .default {
        display: flex;
        flex-direction: row-reverse;
      }
      :host .default sh-icon{
        display: none;
      }
      :host(:not([label])) .header-wrapper {
        display: none;
      }
   
      :host(:not([label])) .default sh-icon{
        display: block;
        margin-left: 8px;
      }
      /* type icons */
      :host(:not([type="error"])) sh-icon[icon="error"],
      :host(:not([type="alert"])) sh-icon[icon="warning"],
      :host(:not([type="confirmation"])) sh-icon[icon="success"] {
        display: none;
      }

      /* body */
      sh-text[body-1] {
        flex: 1;
        overflow: auto;
        line-height: 20px;
        color: var(--text-primary);
      }

      /* footer */
      .footer-wrapper {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      }
      .footer-wrapper > ::slotted(*) {
        margin-left: 8px;
        margin-top: 16px;
      }

      /* no label */
      :host(:not([label])) sh-text[body-1] {
        margin-right: 40px;
        margin-top: -40px;
        width: calc(100% - 40px);
      }
      :host(:not([label])[type]) sh-text[body-1] {
        margin-left: 40px;
        width: calc(100% - 80px);
      }
    </style>

    <!--HTML-->
    <div class="header-wrapper">
      <sh-icon icon="error" color="rgba(var(--functional-red), 1)" size="s"></sh-icon>
      <sh-icon icon="warning" color="rgba(var(--functional-yellow), 1)" size="s"></sh-icon>
      <sh-icon icon="success" color="rgba(var(--functional-green), 1)" size="s"></sh-icon>
      <sh-text size="header-2" id="label">[[label]]</sh-text>
      <sh-icon button icon="cancel" size="s" on-click="_close" id="close-button"></sh-icon>
    </div>
    <div class="default">
      <sh-icon button icon="cancel" size="s" on-click="_close" id="close-button-2"></sh-icon>
      <sh-text size="body-1">
        [[message]]
        <slot></slot>
      </sh-text>
    </div>
    <div class="footer-wrapper">
      <slot name="footer"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-notification-item';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      message: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      type: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      visible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_autoClose'
      },
      duration: {
        type: String,
        reflectToAttribute: true,
        notify: true
      }, 
      sticky: {
        type: Boolean, 
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    }
  }
  _fireClosevent() {
    // fire event on closing
    this.dispatchEvent(new CustomEvent('close', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }
  _close() {
    this.visible = !this.visible;
    this._fireClosevent();    
  }
  _autoClose() {
    let _this, isVisible;
    _this = this;
    isVisible = _this.visible;
    if (this.duration === 'short' && isVisible) {
      setTimeout(function() {
        _this.visible = false;
        _this._fireClosevent();
      },2000);
    }
    if (this.duration === 'long' && isVisible) {
      setTimeout(function() {
        _this.visible = false;
        _this._fireClosevent();
      },5000);
    }
  }
}
window.customElements.define(SHNotificationItem.is, SHNotificationItem);
