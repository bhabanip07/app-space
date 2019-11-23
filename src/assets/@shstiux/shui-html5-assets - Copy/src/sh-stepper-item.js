/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHStepperItem extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        position: relative;
        outline: 0;
      }

      sh-text {
        text-align: center;
        padding: 0 8px;
        box-sizing: border-box;
        color: var(--text-secondary);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .circle {
        height: 32px;
        width: 32px;
        margin-bottom: 8px;
        border-radius: 50%;
        text-align: center;
        font: var(--header-2);
        color: var(--text-secondary);
        line-height: 32px;
        transition: .2s all ease-in-out;
        background: rgba(var(--ui-1), var(--opacity-6));
        border: 1px solid transparent;
        position: relative;
        box-sizing: border-box;
      }

      :host(:hover) .circle,:host(.hover) .circle {
        color: var(--text-primary);
      }

      /* dotted line */
      .line-left,
      .line-right {
        position: absolute;
        top: 15px;
        width: calc(50% - 24px);
        border-bottom: 2px solid rgba(var(--ui-1), var(--opacity-6));
      }

      :host([condensed]) .line-left,
      :host([condensed]) .line-right {
        top: 7px;
        width: calc(50% - 9px);
      }

      .line-left {
        left: 0px;
      }

      .line-right {
        right: 0px;
      }

      :host(:first-of-type) .line-left {
        display: none;
      }

      :host(:last-of-type) .line-right {
        display: none;
      }

      /* active */
      :host([active]) .circle {
        color: var(--text-primary);
        background: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([active]) sh-text[size="title-1"] {
        color: var(--text-primary);
      }

      /* half-filled */
      :host([half]) .circle {
        background: linear-gradient(90deg, rgba(var(--ui-1), var(--opacity-5)) 50%, transparent 50%) !important;
        background-size: calc(100% + 4px) !important;
        background-position: -2px !important;
        border-color: var(--text-disabled);
      }

      /* disabled */
      :host([disabled]) {
        cursor: default;
        pointer-events: none;
      }

      :host([disabled]) .circle {
        color: var(--text-disabled);
        background: transparent;
        border-color: var(--text-disabled);
      }

      :host([disabled]) sh-text {
        color: var(--text-disabled);
      }

      /* condensed */
      :host([condensed]) .circle {
        border-width: 2px;
        color: transparent;
        height: 14px;
        width: 14px;
        margin: 1px 2px;
      }
      :host([condensed][active]) .circle {
        background: transparent !important;
        border-color: rgba(var(--ui-1), var(--opacity-4));
      }

      :host([condensed]:not([disabled])) .circle {
        background: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([condensed]) sh-text {
        display: none;
      }
      :host([condensed]) .line-left,
      :host([condensed]) .line-right {
        width: calc(50% - 10px);
        border-bottom: 2px solid rgba(var(--ui-1), var(--opacity-6));
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
      /* badge */
      :host(:not([type])) sh-badge {
        display: none;
      }
      sh-badge {
        position: absolute;
        top: -4px;
        right: -4px;
      }
      :host([condensed]) sh-badge {
        top: -3px;
        right: -3px;
      }
      :host([type][condensed]) .circle {
        background: transparent;
        border-color: transparent;
      }
    </style>

    <!--HTML-->
    <div class="line-left"></div>
    <div class="line-right"></div>
    <div class="circle" id="stepperCircle">
      [[number]]
      <sh-badge type$="[[type]]"></sh-badge>
    </div>
    <sh-text size="title-1">[[label]]</sh-text>
    <sh-text size="body-2">[[info]]</sh-text>
`;
  }

  static get is() {
    return 'sh-stepper-item';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'Stepper Item',
        reflectToAttribute: true,
        notify: true
      },
      info: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      number: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      type: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        observer: '_handleActive'
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        observer: '_handleDisabled'
      },
      condensed: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();

    // click event
    this.addEventListener('click', function () {
      this.dispatchEvent(new CustomEvent('clicked', {
        bubbles: true,
        composed: true
      }));
    });

    this.addEventListener('focus', function(){
      this.onkeyup = function(e){
        if (e.keyCode === 9) {
          this.$.stepperCircle.style.border = '2px solid rgb(59, 153, 252)';
          this.$.stepperCircle.style.height = this.$.stepperCircle.style.height - 2 + 'px';
          this.$.stepperCircle.style.width = this.$.stepperCircle.style.width - 2 + 'px';
        }
        if(e.keyCode === 32){
          this.click();
        }
      };
    });
    this.addEventListener('blur', function(){
          this.$.stepperCircle.style.border = '';
    });
  }

  _handleDisabled() {
    if(this.disabled){
      this.removeAttribute('tabindex');
    }
    else {
      this.setAttribute('tabindex','0');
    }
  }

  _handleActive() {
    if (this.disabled === true) {
      this.disabled = false;
    }
  }
}
window.customElements.define(SHStepperItem.is, SHStepperItem);
