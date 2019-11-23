/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHWorklineItem extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        z-index: 1;
        position: relative;
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-content: center;
        height: auto;
        width: auto;
        background: rgba(var(--ui-1), var(--opacity-5));
        border-radius: 40px;
        text-align: center;
        box-sizing: border-box;
        transition: .2s all ease-in-out;
        cursor: pointer;
      }
      /* item wrapper */
      .item-wrapper {
        margin: 12px;
        position: relative;
        background: rgba(var(--ui-6), var(--opacity-1));
        display: flex;
        align-items: center;
        justify-content: center;
        height: 56px;
        width: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        transition: .2s all ease-in-out;
      }
      /* icon */
      :host(:not([icon])) #itemIcon {
        display: none;
      }
      /* label, info */
      .item-label {
        position: absolute;
        bottom: -40px;
        height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item-label,
      .item-info {
        color: var(--text-secondary);
      }
      :host([active]) .item-label,
      :host([active]) .item-info {
        color: var(--text-primary);
      }
      .item-info, #itemIcon {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      :host([icon]) .item-info {
        display: none;
      }
      /* needle */
      .needle {
        z-index: -1;
        width: 2px;
        height: calc(100% + 28px);
        position: absolute;
        top: -14px;
        left: calc(50% - 1px);
        background: rgba(var(--ui-1), var(--opacity-2));
      }
      :host(:not([current])) .needle {
        display: none;
      }
      /* color ring */
      .color-ring {
        position: absolute;
        top: 0px;
        left: 0px;
        border: 2px dotted transparent;
        border-radius: 50%;
        height: 56px;
        width: 56px;
        box-sizing: border-box;
        transition: .2s all ease-in-out;
      }
      :host([progress="100"]) .color-ring {
        border-color: transparent !important;
      }
      /* progress ring */
      .progress-wrapper {
        height: 56px;
        width: 56px;
        position: absolute;
        transition: .2s all ease-in-out;
        opacity: var(--opacity-3);
      }
      #progress-ring {
        z-index: 1;
        stroke-width: 4px;
        fill: transparent;
        cx: 50%;
        cy: 50%;
        transition: .2s all ease-in-out;
      }
      :host([progress="100"]) #progress-ring {
        stroke-width: 2px;
      }
      /* badges */
      :host(:not([empty-info])[active]) .badge-wrapper {
        top: -12px;
        right: -24px;
      }
      .badge-wrapper {
        display: flex;
        position: absolute;
        right: -2px;
        top: -2px;
        transition: .2s all ease-in-out;
      }
      .badge-wrapper > ::slotted(sh-icon) {
        transition: 0s all ease-in-out;
        line-height: 24px;
        font-size: 24px;
        max-height: 24px;
        min-height: 24px;
        min-width: 24px;
      }
      :host(:not([empty-info])[active]) .badge-wrapper > ::slotted(sh-icon) {
        line-height: 32px;
        font-size: 32px;
        max-height: 32px;
        min-height: 32px;
        min-width: 32px;
      }
      /* info slot */
      .info-wrapper {
        opacity: 0;
        width: auto;
        display: flex;
        max-width: 0px;
        overflow: hidden;
        transition: .2s all ease-in-out;
      }
      :host([active]) .info-wrapper,
      :host([current]) .info-wrapper {
        opacity: 1;
        max-width: 200px;
      }
      .info-wrapper > ::slotted(*:first-child) {
        margin-left: 16px;
      }
      .info-wrapper > ::slotted(*:not(:first-child)) {
        margin-left: 8px;
      }
      /* active */
      :host([active]) {
        background: rgba(var(--ui-1), var(--opacity-4))
      }
      :host([active]) .item-wrapper {
        background: rgba(var(--ui-7), var(--opacity-1));
      }
      :host([active]) .progress-wrapper {
        opacity: var(--opacity-1);
      }
      /* readonly */
      :host([disabled]), 
      :host([readonly]) {
        pointer-events: none;
        cursor: default;
      }
      /* disabled */
      :host([disabled]) .item-label,
      :host([disabled]) .item-info {
        color: var(--text-disabled);
      }
      :host([disabled]) .progress-wrapper {
        opacity: var(--opacity-5);
      }
      :host([disabled]) {
        background: rgba(var(--ui-1), var(--opacity-7))
      }
      /* indeterminate */
      :host([indeterminate]) #progress-ring {
        stroke-dasharray: 41, 164;
      }
      :host([indeterminate]) .progress-wrapper > svg {
        animation: indeterminate 1.5s linear infinite;
      }
      @keyframes indeterminate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      /* message */
      sh-popover {
        position: absolute;
        bottom: calc(100% + 8px);
        cursor: default;
        max-height: 800px;
        max-width: 1200px;
        width: auto;
        text-align: left;
      }
    </style>

    <!--HTML-->
    <div class="info-wrapper">
      <slot name="info" id="info"></slot>
    </div>
    <sh-popover sticky visible$="[[messageVisible]]">
      <slot name="message"></slot>
    </sh-popover>
    <div class="item-wrapper">
      <div class="progress-wrapper">
        <svg height="56" width="56">
          <path id="progress-ring" stroke$="[[color]]" d="M28 2 a 26 26 0 0 1 0 52 a 26 26 0 0 1 0 -52"/>
        </svg>
        <div class="color-ring" style$="border-color: [[color]]"></div>
      </div>
      <sh-text size="body-1" class="item-info">[[info]]</sh-text>
      <sh-icon id="itemIcon" icon$=[[icon]]></sh-icon>
      <div class="needle"></div>
      <div class="badge-wrapper" onclick="event.stopPropagation()">
        <slot name="badge"></slot>
      </div>
    </div>
    <sh-text body-2 class="item-label">[[label]]</sh-text>
`;
  }

  static get is() {
    return 'sh-workline-item';
  }
  static get properties() {
    return {
      icon: {
        type: String,
        reflectToAttribute: true,
        observer: '_updateAssets'
      },
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      info: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      color: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      readonly: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      current: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      badge: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      index: {
        type: Number,
        reflectToAttribute: true,
        notify: true
      },
      progress: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
        notify: true,
        observer: "_progressChanged"
      },
      emptyInfo: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      indeterminate: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      messageVisible: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready() {
    super.ready();
    this.$.itemIcon.icon = "save"
    this._updateAssets()
    this._handleSlot()
  }

  // check for slot children
  _handleSlot() {
    var infoNodes = this.$.info.assignedNodes({
      flatten: true
    });
    if (infoNodes.length === 0) {
      this.emptyInfo = true;
    };
  }

  _updateAssets() {
    if (this.icon) {
      this.$.itemIcon.icon = this.icon;
    }
  }

  _progressChanged() {
    this.shadowRoot.querySelector('#progress-ring').setAttribute('stroke-dasharray', '' + this.progress * 1.64 + ', 164');
  }
}

window.customElements.define(SHWorklineItem.is, SHWorklineItem);

