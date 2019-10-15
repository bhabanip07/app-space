/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHWorkline extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: column;
        overflow: auto;
      }
      .workline-wrapper {
        height: 80px;
        min-width: fit-content;
        border-radius: 40px;
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: rgba(var(--ui-1), var(--opacity-7));
        overflow: visible;
        position: relative;
        margin-bottom: 40px;
      }
      .workline-label {
        height: 32px;
        margin-bottom: 8px;
      }
      :host(:not([label])) .workline-label {
        display: none;
      }
      .items-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        height: 80px;
      }
      /* slots */
      .items-wrapper > ::slotted(*) {
        margin-left: 16px;
      }
      .left-wrapper > ::slotted(*) {
        display: -webkit-box;
        margin-left: 8px;
      }
      .right-wrapper {
        margin-left: 8px;
        height: 80px;
        border-radius: 40px; 
        padding: 0 24px; 
        display: flex; 
        align-items: center; 
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      .left-wrapper {
        margin-right: 8px;
      }
      /* hide slots */
      :host([empty-right]) .right-wrapper,
      :host([empty-left]) .left-wrapper {
        display: none;
      }
    </style>

    <!--HTML-->
    <sh-text size="super-header" class="workline-label" style="line-height: 32px">[[label]]</sh-text>
    <div class="workline-wrapper">
      <div class="left-wrapper">
        <slot name="left" id="left"></slot>
      </div>
      <div class="items-wrapper">
        <slot></slot>
      </div>
      <div class="right-wrapper">
        <slot name="right" id="right"></slot>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-workline';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      emptyRight: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      emptyLeft: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      handleActive: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready() {
    super.ready()
    this._handleActive()
    this._handleSlots()
  }

  // check for slot children
  _handleSlots() {
    // right slot
    var rightNodes = this.$.right.assignedNodes({
      flatten: true
    });
    if (rightNodes.length === 0) {
      this.emptyRight = true;
    };
    // left slot
    var leftNodes = this.$.left.assignedNodes({
      flatten: true
    });
    if (leftNodes.length === 0) {
      this.emptyLeft = true;
    };
  }

  _handleActive() {
    // update the tab elements active state
    this.addEventListener('click', function (e) {
      let allChildren;
      allChildren = this.querySelectorAll('sh-workline-item');
      // remove active attr from all other items
      if (e.target.tagName === "SH-WORKLINE-ITEM" && this.handleActive === true) {
        for (let i = 0; i < allChildren.length; i++) {
          allChildren[i].active = false;
        }
        e.target.active = true
      }
    })
  }
}

window.customElements.define(SHWorkline.is, SHWorkline);
