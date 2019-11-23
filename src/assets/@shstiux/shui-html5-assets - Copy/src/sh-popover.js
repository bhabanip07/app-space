/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import './shared-styles.js';
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
class SHPopover extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        font: var(--body-2);
        font-size: 14px;
        color: var(--text-secondary);
        display: block;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        background-color: var(--base-3);
        min-width: 200px;
        width: 248px;
        min-height: auto;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        box-sizing: border-box;
        border-radius: 2px;
        margin-top: 0px !important;
        box-shadow: var(--shadow-overlay);
        transition: .2s all ease-in-out, 0s top, 0s left, 0s width, 0s min-width;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        padding: 8px 16px;
        z-index: 999;
        pointer-events: none;
      }

      :host([label]) {
        padding-top: 16px;
      }

      .header-wrapper {
        display: flex;
        margin-bottom: 16px;
      }

      .footer-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
        margin-bottom: 8px;
      }

      .header-wrapper > ::slotted(*),
      .footer-wrapper > ::slotted(*) {
        margin-left: 8px;
      }

      .popover-label {
        font: var(--header-2);
        color: var(--text-primary);
        display: block;
        line-height: 24px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host(:not([label])) .header-wrapper {
        display: none;
      }

      :host([visible]) {
        visibility: visible;
        opacity: 1;
        pointer-events: all;
      }

      :host([sub-menu]) {
        transform: translateY(-8px);
      }

      @media only screen and (max-width: 640px) {
        :host {
          position: fixed;
          top: 0px !important;
          left: 0px !important;
          height: 100vh !important;
          background: rgba(0, 0, 0, var(--opacity-3));
          z-index: 999;
          width: 100vw !important;
          opacity: 0;
          padding: 0;
          transition: .2s all ease-in-out, 0s height ease-in-out .2s, 0s max-height ease-in-out .2s;
        }

        .popover-wrapper {
          position: absolute;
          bottom: 0px;
          width: calc(100vw - 32px) !important;
          padding : 16px;
        }
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
    </style>

    <!--HTML-->
    <div class="popover-wrapper">
      <div class="header-wrapper">
        <div class="popover-label">[[label]]</div>
        <slot name="functions"></slot>
      </div>
      <slot></slot>
      <div class="footer-wrapper">
        <slot name="footer" id="footer"></slot>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-popover';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      target: {
        type: String,
        value: '',
        notify: true,
        reflectToAttribute: true,
        observer: 'targetChanged'
      },
      visible: {
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
      subMenu: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      position: {
        type: String,
        value: 'top',
        reflectToAttribute: true,
        notify: true
      },
      popoverPosition: {
        type: JSON,
        value: {
          top: 0,
          right: 0
        }
      }
    }
  }
  ready() {
    super.ready();
    let targetEl;
    targetEl = document.getElementById(this.target);
    if (targetEl) {
      this.popoverPosition = targetEl.getBoundingClientRect().top;
      setInterval(this.changeScroll.bind(this), 1000);
    }

    let footerNodes;
    footerNodes = this.$.footer.assignedNodes({ flatten: true }).length;
    if (footerNodes === 0) {
      this.shadowRoot.querySelector('.footer-wrapper').style.display = 'none';
    }
  }
  connectedCallback() {
    super.connectedCallback();
    let self;
    self = this;
    this.onkeyup = function (e) {
      if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 27) {
        if (self.visible) {
          self._hide();
        }
      }
    }
  }

  targetChanged() {
    let _this, targetEl;
    _this = this;
    targetEl = document.getElementById(this.target);
    if (targetEl && this.subMenu === false) {
      targetEl.addEventListener('click', function () {
        if (_this.visible) {
          _this._hide();
        } else {
          _this._show();
        }
      });
    }
    if (targetEl && this.subMenu === true) {
      targetEl.addEventListener('mouseover', function () {
        _this._show();
        _this.addEventListener('mouseover', function () {
          _this._show();
        });
        _this.addEventListener('mouseleave', function () {
          _this._hide();
        });
      });
      targetEl.addEventListener('mouseleave', function () {
        _this._hide();
      });
    }

    // add listener on the popover for hiding
    if (this.sticky === false) {
      document.addEventListener('click', function (e) {
        if (_this.visible && e.target.id !== _this.target) {
          _this._hide();
        }
      });
    }
  }

  _show() {
    this.visible = true;
    if (this.target) {
      let targetEl, parentRect, targetRect, thisRect, horizontalCenterOffset, verticalCenterOffset, targetLeft, targetTop;
      targetEl = document.getElementById(this.target);
      parentRect = this.offsetParent.getBoundingClientRect();
      targetRect = targetEl.getBoundingClientRect();
      thisRect = this.getBoundingClientRect();
      horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
      verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
      targetLeft = targetRect.left - parentRect.left;
      targetTop = targetRect.top - parentRect.top;
      let popoverLeft, popoverTop, offset;
      // popover offset from target element
      offset = 8;
      switch (this.position) {
        case 'top':
          popoverLeft = targetLeft + horizontalCenterOffset;
          popoverTop = targetTop - thisRect.height - offset;
          break;
        case 'top-left':
          popoverLeft = targetLeft + 2 * horizontalCenterOffset;
          popoverTop = targetTop - thisRect.height - offset;
          break;
        case 'top-right':
          popoverLeft = targetLeft;
          popoverTop = targetTop - thisRect.height - offset;
          break;
        case 'bottom':
          popoverLeft = targetLeft + horizontalCenterOffset;
          popoverTop = targetTop + targetRect.height + offset;
          break;
        case 'bottom-left':
          popoverLeft = targetLeft + 2 * horizontalCenterOffset;
          popoverTop = targetTop + targetRect.height + offset;
          break;
        case 'bottom-right':
          popoverLeft = targetLeft;
          popoverTop = targetTop + targetRect.height + offset;
          break;
        case 'left':
          popoverLeft = targetLeft - thisRect.width - offset;
          popoverTop = targetTop + verticalCenterOffset;
          break;
        case 'left-down':
          popoverLeft = targetLeft - thisRect.width - offset;
          popoverTop = targetTop + 2 * verticalCenterOffset;
          break;
        case 'left-up':
          popoverLeft = targetLeft - thisRect.width - offset;
          popoverTop = targetTop;
          break;
        case 'right':
          popoverLeft = targetLeft + targetRect.width + offset;
          popoverTop = targetTop + verticalCenterOffset;
          break;
        case 'right-down':
          popoverLeft = targetLeft + targetRect.width + offset;
          popoverTop = targetTop + 2 * verticalCenterOffset;
          break;
        case 'right-up':
          popoverLeft = targetLeft + targetRect.width + offset;
          popoverTop = targetTop;
          break;
        default:
          //do nothing
          break;
      }
      // don't let it bleed through left border
      if (popoverLeft < 16) {
        popoverLeft = 16;
      }
      // don't let it bleed through right border
      if (popoverLeft > this.offsetParent.clientWidth - this.clientWidth - 16) {
        popoverLeft = this.offsetParent.clientWidth - this.clientWidth - 16;
      }
      // don't let it bleed through bottom border
      if (popoverTop > this.offsetParent.clientHeight - this.clientHeight - 16) {
        popoverTop = this.offsetParent.clientHeight - this.clientHeight - 16;
      }
      // don't let it bleed through top border
      if (popoverTop < 16) {
        popoverTop = 16;
      }
      this.style.left = popoverLeft + 'px';
      this.style.top = popoverTop + 'px';
    }
  }
  _hide() {
    this.visible = false;
  }

 changeScroll() {
    let _this;
    _this = this;
    if (_this.target) {
      let targetEl;
      targetEl = document.getElementById(_this.target);
      if (targetEl !== null && _this.popoverPosition !== targetEl.getBoundingClientRect().top) {
        _this._hide();
        _this.popoverPosition = targetEl.getBoundingClientRect().top;
      }
    }
  }
}
window.customElements.define(SHPopover.is, SHPopover);
