/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHTabItem extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        font: var(--title-1);
        color: var(--text-secondary);
        position: relative;
        overflow: hidden;
        outline: 0;
        max-width: 160px;
        min-width: 48px;
        height: 56px;
        box-sizing: border-box;
        padding: 16px 16px 14px 16px;
        line-height: 24px;
        border-bottom: 2px solid transparent;
        transition: .2s all ease-in-out, 0s color;
        text-align: center;
        cursor: pointer;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        display: block;
      }

      :host(:not([label])) {
        min-width: 64px;
      }
      :host([disabled]) {
        background: transparent !important;
        color: var(--text-disabled) !important;
        pointer-events: none;
      }
      .text {
        overflow: hidden;
        font-size: 14px;
      }

      .label,
      .info,
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: .2s all ease-in-out;
      }

      .info,
      .name {
        display: none;
      }

      #tab-item-icon.hover{
        color: var(--text-primary);
      }

      :host([active]) #tab-item-icon {
        color: var(--text-primary);
      }

      :host([disabled]) #tab-item-icon {
        color: var(--text-disabled) !important;
      }

      :host([disabled]) #close,
      :host([sticky]) #close {
        display: none !important;
      }

      :host([icon]) #tab-item-icon {
        display: block;
      }

      :host([icon]) #tab-item:not([collapsed]) {
        padding: 4px 16px 2px 16px;
        line-height: 16px;
        font-size: 12px;
      }

      :host([icon]:not([label])) {
        padding: 12px 16px 10px 16px;
      }

      :host([active]) {
        color: var(--text-primary);
        border-bottom: 2px solid rgba(var(--ui-2), var(--opacity-1));
      }

      #tab-item-icon {
        display: none;
        margin: auto;
        color: var(--text-secondary);
      }

      /* functions slot */

      :host([patient]) > ::slotted(*[slot="functions"]) {
        width: 32px;
        margin-right: 24px;
        margin-left: -8px;
      }

      :host(:not([active])) > ::slotted(*[slot="functions"]) {
        width: 0px;
        min-width: unset;
        margin: 0px;
        opacity: 0;
      }

      /* patient tab */

      sh-icon#close {
        display: none;
        opacity: 0;
        position: absolute;
        top: 0px;
        right: 4px;
      }

      :host([patient]) .text {
        margin-right: 24px;
      }

      :host([patient]) #close {
        display: block;
      }

      :host([patient]) #tab-item-icon {
        display: none;
      }

      sh-icon[icon="patient"] {
        display: none;
        margin-right: 8px;
      }

      :host([patient]) sh-icon[icon="patient"] {
        display: flex;
        color: var(--text-secondary);
      }

      :host([patient].hover) sh-icon[icon="patient"],
      :host([patient][active]) sh-icon[icon="patient"] {
        color: var(--text-primary);
      }

      :host([patient]) {
        display: flex;
        padding: 20px 8px 18px 8px !important;
        line-height: 16px;
        text-align: left;
        align-items: center;
        width: fit-content;
        min-width: 184px;
        max-width: 184px;
      }

      :host([patient][active]) {
        max-width: 280px;
      }

      :host([patient]) .label {
        font: var(--title-1);
      }

      :host([patient]) .info {
        display: block;
        font: var(--body-2);
        line-height: 16px;
      }

      :host([disabled]) .info {
        color: var(--text-disabled) !important;
      }

      :host([disabled]) sh-icon[icon="patient"] {
        color: var(--text-disabled) !important;
      }

      :host([patient][condensed]) {
        padding: 4px 8px 2px 8px !important;
      }

      :host([icon][label]) {
        padding: 4px 16px 2px 16px;
        line-height: 16px;
      }

      :host([icon][label]) #tab-item-icon {
        display: block;
      }

      :host([patient][active][size="l"]) {
        max-width: 376px;
      }

      :host([patient]) .hover{
        color: var(--text-primary);
      }

      /* access bar */

      :host([icon][label][access-context]) #tab-item-icon,
      :host([icon][label][footer-context]) #tab-item-icon {
        display: block;
      }

      :host([access-context]) {
        padding: 24px 16px 22px 16px;
        height: 72px;
      }

      :host([icon][label][access-context]) {
        padding: 12px 16px 10px 16px;
      }

      :host([icon][access-context]:not([label])) {
        padding: 20px 16px 18px 16px;
      }

      :host([condensed]) {
        padding: 8px 16px 6px 16px;
        height: 40px;
      }

      :host([icon][label][condensed]) {
        line-height: 24px;
      }

      :host([icon][condensed]) {
        padding: 8px 8px 6px 8px;
      }

      :host([icon][condensed]:not([label])) {
        padding: 4px 16px 2px 16px;
      }

      /* collapsed */

      :host([collapsed]) {
        height: 40px;
        padding: 8px;
        width: 100%;
        max-width: none;
        text-align: left;
        font-weight: 500;
        border: 0px transparent;
        display: flex;
      }

      :host([patient][collapsed]) {
        height: 56px;
      }

      :host([icon][collapsed]),
      :host([patient][collapsed]:not([info])) {
        height: 48px;
      }

      :host([patient][collapsed]) #close {
        display: block;
        position: absolute;
        top: 50% !important;
        transform: translateY(-50%);
        right: 8px;
        background: transparent;
      }

      :host([active][collapsed]) {
        background: rgba(var(--ui-1), var(--opacity-6));
      }

      :host([collapsed]:not([label])) .name {
        display: flex;
        font: var(--body-1);
      }

      :host([collapsed]:not([label])) {
        padding: 8px !important;
      }

      :host([collapsed]:not([patient])) .name,
      :host([collapsed]:not([patient])) .label,
        {
        color: var(--text-primary);
        line-height: 24px;
      }

      :host([icon][collapsed]) .name,
      :host([icon][collapsed]) .label {
        line-height: 32px;
      }

      :host([collapsed]) #tab-item-icon {
        margin: 0 8px 0 0;
      }

      /* hover */

      :host(:hover:not(.no-hovermq)) #tab-item-icon,
      :host(.no-hovermq):hover #tab-item-icon {
        color: var(--text-primary);
      }

      :host(:hover:not(.no-hovermq)) .label,
      :host(.no-hovermq):hover .label,
      :host(.hover:not(.no-hovermq)) .label,
      :host(.no-hovermq.hover) .label{
        color: var(--text-primary);
      }

      :host([patient]:hover:not(.no-hovermq)) #close,
      :host([patient][active].no-hovermq) #close,
      #close:focus{
        opacity: 1;
        top: 8px;
        outline : 0;
      }

      :host([patient]:hover:not(.no-hovermq)) sh-icon[icon="patient"],
      :host([patient].no-hovermq):hover sh-icon[icon="patient"] {
        color: var(--text-primary);
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
      sh-icon:not(#close) {
        transition: 0s color;
      }
    </style>

    <!--HTML-->
    <sh-icon icon="patient"></sh-icon>
    <sh-icon icon$="[[icon]]" id="tab-item-icon"></sh-icon>
    <div class="text">
      <div class="label">[[label]]</div>
      <div class="name">[[name]]</div>
      <div class="info">[[info]]</div>
    </div>
    <slot name="functions"></slot>
    <sh-icon icon="cancel" button="" size="s" on-click="_removeTab" id="close" tabindex="0"></sh-icon>
    <br>
`;
  }

  static get is() {
    return 'sh-tab-item';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        observer:'labelObserver'
      },
      name: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      info: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        observer: 'infoObserver'
      },
      href: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      patient: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'tab',
        reflectToAttribute: true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      size: {
        type: String,
        value: 'm',
        reflectToAttribute: true,
        notify: true
      },
      collapsed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_collapsedChanged'
      },
      condensed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      sticky: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      accessContext: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      navContext: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      footerContext: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    }
  }

  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    this.setAttribute('aria-labelledby', this.label);
  }

  connectedCallback() {
    let tab;
    tab = this;
    super.connectedCallback();
    this.addEventListener('click', function () {
      this._dispatchEvent();
      if (this.href !== undefined) {
        window.location.href = this.href;
      }
    });

    this.addEventListener('focus', function () {
      if (!this.disabled) {
        this.onkeyup = function (e) {
          if (e.keyCode === 32) {
            this._dispatchEvent();
            this.style.border = '';
            this._borderStyle();
          }
          if (e.keyCode === 9) {
            if (this.active) {
              this._borderStyle();
            } else {
              this.style.border = '2px solid rgb(59, 153, 252)';
            }
          }
        }
      }
    });

    this.addEventListener('blur', function () {
      this.style.border = '';
    });


    this.$.close.addEventListener('focus', function () {
      this.onkeyup = function (e) {
        if (e.keyCode === 13) {
          tab._removeTab();
        }
        if (e.keyCode === 9) {
          this.style.outline = '2px solid rgb(59, 153, 252)';
          this.style.outlineOffset = '-2px';
        }
      };
    });

    this.$.close.addEventListener('blur', function () {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  }
  labelObserver() {
    let label;
    label = this.shadowRoot.querySelector('.label');
    if(label.offsetWidth < label.scrollWidth) {
       label.setAttribute('title', this.label);
    }
    else {
      label.removeAttribute('title');
    }
  }
  infoObserver() {
    let info;
    info = this.shadowRoot.querySelector('.info');
    if(info.offsetWidth < info.scrollWidth) {
       info.setAttribute('title', this.info);
    }
    else {
      info.removeAttribute('title');
    }
  }
  _removeTab() {
    this.dispatchEvent(new CustomEvent('closed', {
      bubbles: true,
      composed: true
    }));
  }
  _collapsedChanged() {
    if (this.collapsed === true) {
      this.setAttribute('slot', 'collapsed');
    } else {
      this.removeAttribute('slot');
    }
  }

  _dispatchEvent() {
    this.dispatchEvent(new CustomEvent('clicked', {
      bubbles: true,
      composed: true
    }));
    this.active = true;
  }

  _borderStyle() {
    this.style.borderLeft = '2px solid rgb(59, 153, 252)';
    this.style.borderRight = '2px solid rgb(59, 153, 252)';
    this.style.borderTop = '2px solid rgb(59, 153, 252)';
    this.style.borderBottom = '2px solid rgba(var(--ui-2), var(--opacity-1))';
  }
}
window.customElements.define(SHTabItem.is, SHTabItem);
