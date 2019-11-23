/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import './shared-styles.js';
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
class SHTooltip extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        line-height: 16px !important;
        padding: 8px;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        color: var(--text-primary);
        background-color: var(--base-3);
        transition: .2s all ease-in-out;
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
        height: fit-content !important;
        height: -ms-fit-content !important;
        height: -moz-fit-content !important;
        box-sizing: border-box;
        border-radius: 2px;
        margin-top: 0px !important;
        box-shadow: var(--shadow-overlay);
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        z-index: 999;
        overflow: hidden;
        display: block;
      }

      :host([variation="long"]) {
        padding: 8px !important;
      }

      :host([variation="short"]) .tooltip-wrapper .tooltip-title {
        display: none;
      }

      :host .tooltip-wrapper .tooltip-label {
        font: var(--body-2);
        color: var(--text-primary);
        font-size: 12px;
      }

      :host([variation="long"]) .tooltip-wrapper .tooltip-title {
        font: var(--title-1);
        color: var(--text-primary);
        font-size: 12px;
        display: block !important;
        line-height: 16px !important;
        margin-bottom: 8px;
      }

      .label-wrapper {
        display: flex;
        flex-direction:row;
      }

      #tooltipIcon {
        margin-right: 8px;
      }

      :host([visible]) {
        visibility: visible;
        opacity: 1;
      }

      :host([error]) #tooltipIcon {
        color: rgba(var(--functional-red), 1);
      }
    </style>

    <!--HTML-->
    <div class="tooltip-wrapper">
      <div class="tooltip-title">[[title]]</div>
      <div class="label-wrapper">
        <sh-icon icon$="[[icon]]" id="tooltipIcon" size="s"></sh-icon>
        <div class="tooltip-label">[[label]]</div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-tooltip';
  }
  static get properties() {
    return {
      label: {
        type: String,
        required: true,
        value: 'Label',
        reflectToAttribute: true,
        notify: true
      },
      title: {
        type: String,
        value: 'Tooltip',
        reflectToAttribute: true,
        notify: true
      },
      variation: {
        type: String,
        required: true,
        value: 'long',
        reflectToAttribute: true,
        notify: true
      },
      target: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        observer: 'connectedCallback'
      },
      visible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_handleVisible'
      },
      placement: {
        type: String,
        value: 'top',
        reflectToAttribute: true,
        notify: true,
        validator: function (str) {
          if (str === 'top')
            return true
          if (str === 'bottom')
            return true
          if (str === 'left')
            return true
          if (str === 'right')
            return true
          console.error("Invalid placement property. Must have a value: 'top', 'bottom', 'left' or 'right'")
          return false
        }
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      error: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false,
        observer: '_handleError'
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    let targetEl = document.getElementById(this.target);
    if (targetEl) {
      targetEl.addEventListener('mouseenter', () => this._show());
      targetEl.addEventListener('focus', () => this._show());
      targetEl.addEventListener('mouseout', () => this._hide());
      targetEl.addEventListener('blur', () => this._hide());
      targetEl.addEventListener('tap', () => this._hide());
    }
  }
  _handleVisible() {
    if (this.visible === true) {
      this._show();
    }
  }
  _show() {
    this.visible = true
    var targetEl = document.getElementById(this.target);
    if(this.target && (targetEl!=undefined || targetEl!==null)) {
      var targetRect = targetEl.getBoundingClientRect();
      var parentRect = this.offsetParent.getBoundingClientRect();
      var thisRect = this.getBoundingClientRect();
      var horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
      var verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
      var targetLeft = targetRect.left - parentRect.left;
      var targetTop = targetRect.top - parentRect.top;
      var tooltipLeft, tooltipTop;
      
      // Tooltip offset from target element
      var offset = 8;
      switch (this.placement) {
        case 'top':
          tooltipLeft = targetLeft + horizontalCenterOffset;
          tooltipTop = targetTop - thisRect.height - offset;
          break;
        case 'top-left':
          tooltipLeft = targetLeft + 2 * horizontalCenterOffset;
          tooltipTop = targetTop - thisRect.height - offset;
          break;
        case 'top-right':
          tooltipLeft = targetLeft;
          tooltipTop = targetTop - thisRect.height - offset;
          break;
        case 'bottom':
          tooltipLeft = targetLeft + horizontalCenterOffset;
          tooltipTop = targetTop + targetRect.height + offset;
          break;
        case 'bottom-left':
          tooltipLeft = targetLeft + 2 * horizontalCenterOffset;
          tooltipTop = targetTop + targetRect.height + offset;
          break;
        case 'bottom-right':
          tooltipLeft = targetLeft;
          tooltipTop = targetTop + targetRect.height + offset;
          break;
        case 'left':
          tooltipLeft = targetLeft - thisRect.width - offset;
          tooltipTop = targetTop + verticalCenterOffset;
          break;
        case 'left-down':
          tooltipLeft = targetLeft - thisRect.width - offset;
          tooltipTop = targetTop + 2 * verticalCenterOffset;
          break;
        case 'left-up':
          tooltipLeft = targetLeft - thisRect.width - offset;
          tooltipTop = targetTop;
          break;
        case 'right':
          tooltipLeft = targetLeft + targetRect.width + offset;
          tooltipTop = targetTop + verticalCenterOffset;
          break;
        case 'right-down':
          tooltipLeft = targetLeft + targetRect.width + offset;
          tooltipTop = targetTop + 2 * verticalCenterOffset;
          break;
        case 'right-up':
          tooltipLeft = targetLeft + targetRect.width + offset;
          tooltipTop = targetTop;
          break;
      }

      // target element bounding rectangle.
      targetRect = targetEl.getBoundingClientRect();
      // parent element bounding rectangle.
      parentRect = this.offsetParent.getBoundingClientRect();
      // this popover's bounding rectangle.
      thisRect = this.getBoundingClientRect(); 
      horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
      verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
      targetLeft = targetRect.left - parentRect.left;
      targetTop = targetRect.top - parentRect.top;
      // Tooltip offset from target element
      offset = 8;
      let positionDataArray,
          tooltipCoordinates;
      positionDataArray = [targetRect,parentRect,thisRect,horizontalCenterOffset,verticalCenterOffset,targetLeft,targetTop,offset];
      tooltipCoordinates = JSON.parse(JSON.stringify(this.calculateToolTipCoordinates(this.placement,positionDataArray)));
      tooltipLeft = tooltipCoordinates[0];
      tooltipTop = tooltipCoordinates[1];
      // Clip the left/right side
      if (parentRect.left + tooltipLeft + thisRect.width > window.innerWidth) {
        this.style.right = '0px';
        this.style.left = 'auto';
      } else {
        this.style.left = Math.max(0, tooltipLeft) + 'px';
        this.style.right = 'auto';
      }
      // Clip the top/bottom side.
      if (parentRect.top + tooltipTop + thisRect.height > window.innerHeight) {
        this.style.bottom = parentRect.height + 'px';
        this.style.top = 'auto';
      } else {
        this.style.top = Math.max(-parentRect.top, tooltipTop) + 'px';
        this.style.bottom = 'auto';
      }
      let notNumber;
      notNumber = NaN;
      if(tooltipLeft !== notNumber && tooltipTop !== notNumber) {
        if (tooltipLeft >= 0 && tooltipLeft <= window.innerWidth && tooltipTop >= 0 && tooltipTop <= window.innerHeight) {
          this.style.left = tooltipLeft + 'px';
          this.style.top = tooltipTop + 'px';
        }
        else {
          // do nothing
        }
      }
    }
  }
  calculateToolTipCoordinates(placement,positionDataArray) {
    let targetRect,
        thisRect,
        horizontalCenterOffset,
        verticalCenterOffset,
        targetLeft,
        targetTop,
        offset,
        tooltipLeft,
        tooltipTop;
    targetRect = positionDataArray[0];
    thisRect = positionDataArray[2];
    horizontalCenterOffset = positionDataArray[3];
    verticalCenterOffset = positionDataArray[4];
    targetLeft = positionDataArray[5];
    targetTop = positionDataArray[6];
    offset = positionDataArray[7];
    switch (placement) {
      case 'top':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case 'top-left':
        tooltipLeft = targetLeft + 2 * horizontalCenterOffset;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case 'top-right':
        tooltipLeft = targetLeft;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case 'bottom':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case 'bottom-left':
        tooltipLeft = targetLeft + 2 * horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case 'bottom-right':
        tooltipLeft = targetLeft;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case 'left':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'left-down':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + 2 * verticalCenterOffset;
        break;
      case 'left-up':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop;
        break;
      case 'right':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'right-down':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + 2 * verticalCenterOffset;
        break;
      case 'right-up':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop;
        break;
      default:
        // Adding this condition just for code readability
        break;
    }
    let returnData = [];
    returnData[0] = tooltipLeft;
    returnData[1] = tooltipTop;
    return returnData;
  }
  _hide() {
    this.visible = false;
  }

  _handleError() {
    if (this.error) {
      this.icon = 'error';
    }
  }
}
window.customElements.define(SHTooltip.is, SHTooltip);