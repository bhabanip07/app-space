/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHRadioGroup extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        outline: 0;
        display: block;
      }

      .radio-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      #grouped {
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .radio-wrapper> ::slotted(sh-radio-button) {
        margin-top: 8px;
      }

      .radio-wrapper> ::slotted(*:first-child) {
        margin-top: 0px !important;
      }
    </style>

    <!--HTML-->
    <!-- <div>{{label}}</div> -->
    <div class="radio-wrapper"  aria-labelledby="{{group}}" >
      <slot id="grouped"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-radio-group';
  }
  static get properties() {
    return {
      selected: {
        type: String,
        value: 'defaultId',
        reflectToAttribute: true,
        notify: true
      },
      group: {
        type: String,
        value: 'defaultGroup',
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'radiogroup',
        reflectToAttribute: true,
        notify: true
      }
    }
  }
  ready() {
    super.ready();
    // update the radio group's children's active state
    this.addEventListener('click', function (e) {
      //on click of disabled radio button no action to be taken
      if(e.target.disabled || e.target.tagName.toString().toLowerCase() === 'sh-radio-group') {
        return;
      }
      else{
        let childElement;
        childElement = this.querySelectorAll('[active]');
        for (let i = 0; i < childElement.length; i++) {
          childElement[i].removeAttribute('active');
          e.target.active = true;
        }
      }
    });

    for (let i = 0; i < this.children.length; i++) {
      if (!this.children[i].hasAttribute('disabled')) {
        this.children[i].setAttribute('tabindex', '0');
        this.children[i].setAttribute('aria-checked', '{{active::change}}');
      }
    }
  }
}
window.customElements.define(SHRadioGroup.is, SHRadioGroup);
