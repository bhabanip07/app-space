/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHSwitchItem extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        transition: .2s all ease-in-out;
        border-radius: 20px;
        padding: 12px 12px;
        line-height: 16px !important;
        font: var(--body-1);
        color: var(--text-secondary);
        cursor: pointer;
        min-width: 64px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        outline: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      
      :host .label {
        width: 64px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      :host(:hover),
      :host(.hover) ,
      :host([active]) {
        color: var(--text-primary);
      }

      :host([active]) {
        background-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host([icon]){
        padding: 0px;
      }

      :host([icon]) .label,
      .switch-icon {
        display: none;
      }

      :host([icon]) .switch-icon {
        display: flex;
        margin: 4px 28px;
        color: rgba(var(--ui-1), var(--opacity-3));
      }

      :host([icon].hover)  .switch-icon ,
      :host([icon][active]) .switch-icon {
        color: rgba(var(--ui-1), var(--opacity-2));
      }

      :host([icon][disabled]) .switch-icon ,
      :host([disabled]) {
        pointer-events: none;
        color: var(--text-disabled);
      }
      :host([active][disabled]) {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
    </style>

    <!--HTML-->
    <span class="label">[[label]]</span>
    <sh-icon icon$="[[icon]]" class="switch-icon"></sh-icon>
`;
  }

  static get is() {
    return 'sh-switch-item';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready() {
    super.ready();
    if(!this.disabled) {
      this.setAttribute('tabindex', '0');
    }
  }
  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('click', function () {
      let siblingItems;
      siblingItems = this.parentNode.children;
      for (let i = 0; i < siblingItems.length; i++) {
        if(siblingItems[i].hasAttribute('active')) {
          siblingItems[i].active = false;
        }
      }
      this.active = true;
    });

    this.addEventListener('focus', function(){
      this.onkeyup = function(e){
        if(e.keyCode === 9){
          this.style.border = '2px solid rgb(59, 153, 252)';
        }
        if(e.keyCode === 32 || e.keyCode === 13){
          this.click();
        }
      };
    });
    this.addEventListener('blur', function(){
          this.style.border = '';
    });
  }
}

window.customElements.define(SHSwitchItem.is, SHSwitchItem);
