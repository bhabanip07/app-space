/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHStepper extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        height: auto;
        display: flex;
      }
      :host([readonly]) {
        pointer-events: none;
      }
    </style>

    <!--HTML-->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-stepper';
  }
  static get properties() {
    return {
      value: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        observer: '_updateItems'
      },
      condensed: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        observer: '_condenseItems'
      },
      readonly: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready(){
    super.ready();
    for(let i=0; i<this.children.length;i++){
      if(!this.children[i].disabled){
        this.children[i].setAttribute('tabindex', '0');
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    let items, self;
    // set number of each step based on its' index
    items = this.querySelectorAll('sh-stepper-item');
    self = this;
    for (let i = 0; i < items.length; i++) {
      items[i].number = i + 1;
      items[i].addEventListener('click', function (e) {
        self.value = e.target.number;
        self._updateItems();
      });
    }
    // update items on load
    this._updateItems();
  }

  // update value and disabled state
  _updateItems() {
    let items;
    items = this.querySelectorAll('sh-stepper-item');
    for (let i = 0; i < items.length; i++) {
      if (items[i].number > this.value) {
        items[i].removeAttribute('active');
        items[i].setAttribute('disabled', '');
      } else if (items[i].number === this.value) {
        items[i].setAttribute('active', '');
      } else {
        items[i].removeAttribute('active');
        items[i].removeAttribute('disabled');
      }
      // half-filled circles
      if (this.value > Math.floor(this.value) && i === Math.ceil(this.value - 1)) {
        items[i].setAttribute('half', '');
      } else {
        items[i].removeAttribute('half');
      }
    }
  }

  // condense items if wrapper is condensed
  _condenseItems() {
    let items;
    items = this.querySelectorAll('sh-stepper-item');
    for (let i = 0; i < items.length; i++) {
      items[i].condensed = true;
    }
  }
}

window.customElements.define(SHStepper.is, SHStepper);
