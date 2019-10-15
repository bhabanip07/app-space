/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHMenuGroup extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        display: block;
      }

      .menu-wrapper {
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

      .menu-wrapper> ::slotted(sh-menu-item) {
        margin-top: 8px;
      }

      .menu-wrapper> ::slotted(*:first-child) {
        margin-top: 0px !important;
      }

      /* touch */

      @media (any-pointer:coarse) {
        .menu-wrapper> ::slotted(sh-menu-item) {
          margin-top: 16px;
        }
      }
    </style>

    <!--HTML-->
    <div class="menu-wrapper">
      <slot id="grouped"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-menu-group';
  }
  static get properties() {
    return {
      selected: {
        type: String,
        value: 'defaultId'
      },
      group: {
        type: String,
        value: 'defaultGroup'
      },
      role: {
        type: String,
        value: 'listgroup',
        reflectToAttribute: true
      }
    }
  }
  ready() {
    super.ready();
    // update the menu group's children's active state
    this.addEventListener('clicked', function () {
      let childElement;
      childElement = this.querySelectorAll('sh-menu-item[active]');
      for (let i = 0; i < childElement.length; i++) {
        childElement[i].removeAttribute('active');
      }
    });

    for(let i=0;i<this.children.length;i++){
      if(!this.children[i].hasAttribute('disabled')) {
       this.children[i].setAttribute('tabindex', '0');
      }
    }
  }
}
window.customElements.define(SHMenuGroup.is, SHMenuGroup);
